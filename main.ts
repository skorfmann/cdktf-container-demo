import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider, EcsCluster  } from '@cdktf/provider-aws'
import { AwsEcrAsset, AwsVpc, AwsRegions, AwsEcsFargateService } from './constructs'
import * as path from 'path';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const region = AwsRegions.frankfurt

    new AwsProvider(this, 'default', {
      region: region.code
    })

    const vpc = new AwsVpc(this, 'app-network', {
      region,
      cidrBlock: "10.200.0.0/16"
    })

    const ecrAsset =new AwsEcrAsset(this, 'app-image', {
      region,
      name: 'cdktf-demo',
      path: path.join(__dirname, 'app')
    })

    const cluster = new EcsCluster(this, 'main', {
      name: 'cdktf-demo'
    })

    new AwsEcsFargateService(this, 'app-service', {
      serviceName: 'cdktf-demo',
      ecrAsset,
      cluster,
      region,
      vpc
    })
  }
}

const app = new App();
new MyStack(app, 'container-demo');
app.synth();
