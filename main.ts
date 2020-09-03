import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { AwsProvider, EcrRepository, DataAwsRegion } from "@cdktf/provider-aws"
import * as Null from "@cdktf/provider-null"
import * as hashdirectory from 'hashdirectory';
import * as path from 'path';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const folder = path.join(__dirname, 'app')

    const compatibleName = name.toLowerCase();

    new AwsProvider(this, 'default', {
      region: 'eu-central-1'
    })

    const ecrRepository = new EcrRepository(this, 'dockerAsset', {
      name: compatibleName,
    });

    const buildAndPush = new Null.Resource(this, 'buildAndPush', {
      dependsOn: [ecrRepository],
      triggers: {
        folderhash: hashdirectory.sync(folder),
      },
    });

    const imageName = ecrRepository.repositoryUrl;
    // needs AWS CLI v2 - Should add a check for presence or provide Docker container for building
    const command = `
      aws ecr get-login-password --region ${new DataAwsRegion(this, 'CurrentRegion').name} |
      docker login --username AWS --password-stdin ${imageName} &&
      cd ${folder} && docker build -t ${imageName} . &&
      docker push ${imageName}
    `;
    buildAndPush.addOverride('provisioner.local-exec.command', command);

    new TerraformOutput(this, 'ecr', {
      value: ecrRepository.repositoryUrl
    })
  }
}

const app = new App();
new MyStack(app, 'container-demo');
app.synth();
