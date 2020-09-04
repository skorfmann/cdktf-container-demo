import { Construct } from "constructs";
import { EcsCluster, EcsTaskDefinition, EcsService, SecurityGroup } from "@cdktf/provider-aws";
import { AwsRegion } from "./aws-regions";
import { AwsEcrAsset, AwsVpc, AwsIamRole } from "./";

export interface AwsEcsFargateServiceConfig {
  cluster: EcsCluster;
  ecrAsset: AwsEcrAsset;
  region: AwsRegion
  serviceName: string;
  vpc: AwsVpc;
}

export class AwsEcsFargateService extends Construct {
  constructor(scope: Construct, name: string, config: AwsEcsFargateServiceConfig) {
    super(scope, name);

    const { ecrAsset, serviceName, cluster, vpc } = config

    const taskRole = new AwsIamRole(this, 'task-role')
    const taskExecutionRole = new AwsIamRole(this, 'task-execution-role')

    ecrAsset.grantPull(taskExecutionRole)
    taskExecutionRole.grant('logs', ["logs:CreateLogStream", "logs:PutLogEvents"])

    const fullImage = `${ecrAsset.image}@${ecrAsset.imageDigest}`

    const taskDefinition = new EcsTaskDefinition(this, 'task-definition', {
      networkMode: "awsvpc",
      requiresCompatibilities: ["FARGATE"],
      cpu: `256`,
      memory: `512`,
      executionRoleArn: taskExecutionRole.resource.arn,
      taskRoleArn: taskRole.resource.arn,
      containerDefinitions: JSON.stringify([{
        name: 'app',
        image: fullImage,
        essential: true,
        portMappings: [{
          protocol: 'tcp',
          containerPort: 80,
          hostPort: 80
        }]
      }]),
      family: name
    })


    const securityGroup = new SecurityGroup(this, 'service-security-group', {
      namePrefix: 'cdktf-demo',
      vpcId: vpc.resource.id!,
      ingress: [{
        protocol: 'tcp',
        fromPort: 80,
        toPort: 80,
        cidrBlocks: ['0.0.0.0/0'],
        ipv6CidrBlocks: ["::/0"]
      }],
      egress: [{
        protocol: '-1',
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ['0.0.0.0/0'],
        ipv6CidrBlocks: ["::/0"]
      }]
    })

    // workaround for https://github.com/hashicorp/terraform-cdk/issues/234
    securityGroup.addOverride("ingress.0", {
      description: null,
      prefix_list_ids: null,
      security_groups: null,
      self: null
    })

    securityGroup.addOverride("egress.0", {
      description: null,
      prefix_list_ids: null,
      security_groups: null,
      self: null
    })

    new EcsService(this, 'service', {
      name: serviceName,
      cluster: cluster.arn,
      taskDefinition: taskDefinition.arn,
      desiredCount: 1,
      launchType: 'FARGATE',
      schedulingStrategy: 'REPLICA',
      networkConfiguration: [{
        securityGroups: [securityGroup.id!],
        subnets: vpc.publicSubnets.map(subnet => subnet.id!),
        assignPublicIp: true
      }]
    })
  }
}
