import { Construct } from "constructs";
import { TerraformOutput } from 'cdktf';
import { EcrRepository, DataAwsEcrImage } from "@cdktf/provider-aws";
import * as Null from "@cdktf/provider-null";
import * as hashdirectory from 'hashdirectory';
import { AwsRegion } from "./aws-regions";
import { IPrincipal } from '.'

export interface AwsEcrAssetConfig {
  path: string;
  name: string;
  region: AwsRegion
}

export class AwsEcrAsset extends Construct {
  public readonly image: string;
  public readonly repository: EcrRepository;
  public readonly imageDigest?: string;

  constructor(scope: Construct, name: string, config: AwsEcrAssetConfig) {
    super(scope, name);

    const { path, region } = config
    const compatibleName = config.name.toLowerCase();

    this.repository = new EcrRepository(this, 'dockerAsset', {
      name: compatibleName,
    });

    const buildAndPush = new Null.Resource(this, 'buildAndPush', {
      dependsOn: [this.repository],
      triggers: {
        folderhash: hashdirectory.sync(path),
      },
    });

    const data = new DataAwsEcrImage(this, 'image', {
      repositoryName: this.repository.name,
      imageTag: 'latest',
      dependsOn: [buildAndPush]
    })

    const imageName = this.repository.repositoryUrl;
    // needs AWS CLI v2 - Should add a check for presence or provide Docker container for building
    const command = `
      aws ecr get-login-password --region ${region.code} |
      docker login --username AWS --password-stdin ${imageName} &&
      cd ${path} && docker build -t ${imageName} . &&
      docker push ${imageName}
    `;
    buildAndPush.addOverride('provisioner.local-exec.command', command);

    new TerraformOutput(this, 'ecr', {
      value: this.repository.repositoryUrl
    })

    this.image = this.repository.repositoryUrl
    this.imageDigest = data.imageDigest
  }

  public grantPull(principal: IPrincipal) {
    const actions = [
      'ecr:BatchCheckLayerAvailability',
      'ecr:GetDownloadUrlForLayer',
      'ecr:BatchGetImage'
    ]
    principal.grant('ecr-pull', actions, this.repository.arn)
    principal.grant('ecr-login', ['ecr:GetAuthorizationToken'])
  }
}
