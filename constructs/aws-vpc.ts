import { Construct } from "constructs";
import { Vpc, InternetGateway, Subnet, RouteTable, Route, RouteTableAssociation } from "@cdktf/provider-aws";
import { AwsRegion } from "./aws-regions";
import { CIDRBlock } from "@eryldor/cidr";

export interface AwsVpcConfig {
  readonly region: AwsRegion;
  readonly cidrBlock: string;
}

export class AwsVpc extends Construct {
  public readonly publicSubnets: Subnet[];
  public readonly privateSubnets: Subnet[];
  public readonly resource: Vpc;

  constructor(scope: Construct, name: string, config: AwsVpcConfig) {
    super(scope, name);

    const cidr = CIDRBlock.fromString(config.cidrBlock);
    const [publicSubnetBlock, privateSubnetBlock] = cidr.split(2);
    const publicSubnets = publicSubnetBlock.split(3);
    const privateSubnets = privateSubnetBlock.split(3);

    const vpcMain = new Vpc(this, "main", {
      cidrBlock: config.cidrBlock,
      tags: {
        Name: name,
      }
    });

    this.resource = vpcMain;

    const gateway = new InternetGateway(this, "igw", {
      vpcId: vpcMain.id,
    });

    const routeTable = new RouteTable(this, 'public-routes', {
      vpcId: vpcMain.id!
    })

    new Route(this, 'public-route', {
      routeTableId: routeTable.id!,
      destinationCidrBlock: '0.0.0.0/0',
      gatewayId: gateway.id!
    })

    this.publicSubnets = config.region.zones.map(
      (zone: string, index: number) => {
        const subnet = new Subnet(this, `public-${zone}`, {
          vpcId: vpcMain.id!,
          cidrBlock: publicSubnets[index].toString(),
          availabilityZone: zone,
          tags: {
            Name: `${name}-public-${zone}`,
          },
        })

        new RouteTableAssociation(this, `public-route-association-${zone}`, {
          subnetId: subnet.id!,
          routeTableId: routeTable.id!
        })

        return subnet
      }
    );

    this.privateSubnets = config.region.zones.map(
      (zone: string, index: number) =>
        new Subnet(this, `private-${zone}`, {
          vpcId: vpcMain.id!,
          cidrBlock: privateSubnets[index].toString(),
          availabilityZone: zone,
          tags: {
            Name: `${name}-public-${zone}`,
          },
        })
    );
  }
}
