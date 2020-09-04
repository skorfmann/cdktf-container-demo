const regions: AwsRegion[] = [
  {
    name: "N. Virginia",
    fullName: "US East (N. Virginia)",
    code: "us-east-1",
    public: true,
    localZone: false,
    zones: [
      "us-east-1a",
      "us-east-1b",
      "us-east-1c",
      "us-east-1d",
      "us-east-1e",
      "us-east-1f",
    ],
  },
  {
    name: "Ohio",
    fullName: "US East (Ohio)",
    code: "us-east-2",
    public: true,
    localZone: false,
    zones: ["us-east-2a", "us-east-2b", "us-east-2c"],
  },
  {
    name: "N. California",
    fullName: "US West (N. California)",
    code: "us-west-1",
    public: true,
    localZone: false,
    zoneLimit: 2,
    zones: ["us-west-1a", "us-west-1b", "us-west-1c"],
  },
  {
    name: "Oregon",
    fullName: "US West (Oregon)",
    code: "us-west-2",
    public: true,
    localZone: false,
    zones: ["us-west-2a", "us-west-2b", "us-west-2c", "us-west-2d"],
  },
  {
    name: "GovCloud West",
    fullName: "AWS GovCloud (US)",
    code: "us-gov-west-1",
    public: false,
    localZone: false,
    zones: ["us-gov-west-1a", "us-gov-west-1b", "us-gov-west-1c"],
  },
  {
    name: "GovCloud East",
    fullName: "AWS GovCloud (US-East)",
    code: "us-gov-east-1",
    public: false,
    localZone: false,
    zones: ["us-gov-east-1a", "us-gov-east-1b", "us-gov-east-1c"],
  },
  {
    name: "Canada",
    fullName: "Canada (Central)",
    code: "ca-central-1",
    public: true,
    localZone: false,
    zones: ["ca-central-1a", "ca-central-1b", "ca-central-1c"],
  },
  {
    name: "Stockholm",
    fullName: "EU (Stockholm)",
    code: "eu-north-1",
    public: true,
    localZone: false,
    zones: ["eu-north-1a", "eu-north-1b", "eu-north-1c"],
  },
  {
    name: "Ireland",
    fullName: "EU (Ireland)",
    code: "eu-west-1",
    public: true,
    localZone: false,
    zones: ["eu-west-1a", "eu-west-1b", "eu-west-1c"],
  },
  {
    name: "London",
    fullName: "EU (London)",
    code: "eu-west-2",
    public: true,
    localZone: false,
    zones: ["eu-west-2a", "eu-west-2b", "eu-west-2c"],
  },
  {
    name: "Paris",
    fullName: "EU (Paris)",
    code: "eu-west-3",
    public: true,
    localZone: false,
    zones: ["eu-west-3a", "eu-west-3b", "eu-west-3c"],
  },
  {
    name: "Frankfurt",
    fullName: "EU (Frankfurt)",
    code: "eu-central-1",
    public: true,
    localZone: false,
    zones: ["eu-central-1a", "eu-central-1b", "eu-central-1c"],
  },
  {
    name: "Milan",
    fullName: "EU (Milan)",
    code: "eu-south-1",
    public: true,
    localZone: false,
    zones: ["eu-south-1a", "eu-south-1b", "eu-south-1c"],
  },
  {
    name: "Cape Town",
    fullName: "Africa (Cape Town)",
    code: "af-south-1",
    public: true,
    localZone: false,
    zones: ["af-south-1a", "af-south-1b", "af-south-1c"],
  },
  {
    name: "Tokyo",
    fullName: "Asia Pacific (Tokyo)",
    code: "ap-northeast-1",
    public: true,
    localZone: false,
    zoneLimit: 3,
    zones: [
      "ap-northeast-1a",
      "ap-northeast-1b",
      "ap-northeast-1c",
      "ap-northeast-1d",
    ],
  },
  {
    name: "Seoul",
    fullName: "Asia Pacific (Seoul)",
    code: "ap-northeast-2",
    public: true,
    localZone: false,
    zones: ["ap-northeast-2a", "ap-northeast-2b", "ap-northeast-2c"],
  },
  {
    name: "Osaka",
    fullName: "Asia Pacific (Osaka-Local)",
    code: "ap-northeast-3",
    public: false,
    localZone: false,
    zones: ["ap-northeast-3a"],
  },
  {
    name: "Singapore",
    fullName: "Asia Pacific (Singapore)",
    code: "ap-southeast-1",
    public: true,
    localZone: false,
    zones: ["ap-southeast-1a", "ap-southeast-1b", "ap-southeast-1c"],
  },
  {
    name: "Sydney",
    fullName: "Asia Pacific (Sydney)",
    code: "ap-southeast-2",
    public: true,
    localZone: false,
    zones: ["ap-southeast-2a", "ap-southeast-2b", "ap-southeast-2c"],
  },
  {
    name: "Hong Kong",
    fullName: "Asia Pacific (Hong Kong)",
    code: "ap-east-1",
    public: true,
    localZone: false,
    zones: ["ap-east-1a", "ap-east-1b", "ap-east-1c"],
  },
  {
    name: "Mumbai",
    fullName: "Asia Pacific (Mumbai)",
    code: "ap-south-1",
    public: true,
    localZone: false,
    zones: ["ap-south-1a", "ap-south-1b", "ap-south-1c"],
  },
  {
    name: "Sao Paulo",
    fullName: "South America (Sao Paulo)",
    code: "sa-east-1",
    public: true,
    localZone: false,
    zoneLimit: 2,
    zones: ["sa-east-1a", "sa-east-1b", "sa-east-1c"],
  },
  {
    name: "Bahrain",
    fullName: "Middle East (Bahrain)",
    code: "me-south-1",
    public: true,
    localZone: false,
    zones: ["me-south-1a", "me-south-1b", "me-south-1c"],
  },
  {
    name: "Beijing",
    fullName: "China (Beijing)",
    code: "cn-north-1",
    public: false,
    localZone: false,
    zones: ["cn-north-1a", "cn-north-1b"],
  },
  {
    name: "Ningxia",
    fullName: "China (Ningxia)",
    code: "cn-northwest-1",
    public: false,
    localZone: false,
    zones: ["cn-northwest-1a", "cn-northwest-1b", "cn-northwest-1c"],
  },
  {
    name: "Los Angeles",
    fullName: "US West (Los Angeles)",
    code: "us-west-2-lax",
    public: true,
    localZone: true,
    zones: ["us-west-2-lax-1a", "us-west-2-lax-1b"],
  },
];

export interface AwsRegion {
  readonly name: string;
  readonly fullName: string;
  readonly code: string;
  readonly public: boolean;
  readonly localZone: boolean;
  readonly zones: string[];
  readonly zoneLimit?: number;
}

export class AwsRegions {
  public static get northVirgina(): AwsRegion {
    return regions[0];
  }

  public static get ohio(): AwsRegion {
    return regions[1];
  }

  public static get northCalifornia(): AwsRegion {
    return regions[2];
  }

  public static get oregon(): AwsRegion {
    return regions[3];
  }

  public static get govCloudWest(): AwsRegion {
    return regions[4];
  }

  public static get govCloudEast(): AwsRegion {
    return regions[5];
  }

  public static get canada(): AwsRegion {
    return regions[6];
  }

  public static get stockholm(): AwsRegion {
    return regions[7];
  }

  public static get ireland(): AwsRegion {
    return regions[8];
  }

  public static get london(): AwsRegion {
    return regions[9];
  }

  public static get paris(): AwsRegion {
    return regions[10];
  }

  public static get frankfurt(): AwsRegion {
    return regions[11];
  }

  public static get milan(): AwsRegion {
    return regions[12];
  }

  public static get capeTown(): AwsRegion {
    return regions[13];
  }

  public static get tokyo(): AwsRegion {
    return regions[14];
  }

  public static get seoul(): AwsRegion {
    return regions[15];
  }

  public static get osaka(): AwsRegion {
    return regions[16];
  }

  public static get singapore(): AwsRegion {
    return regions[17];
  }

  public static get sydney(): AwsRegion {
    return regions[18];
  }

  public static get hongKong(): AwsRegion {
    return regions[19];
  }

  public static get mumbai(): AwsRegion {
    return regions[20];
  }

  public static get saoPaulo(): AwsRegion {
    return regions[21];
  }

  public static get bahrain(): AwsRegion {
    return regions[22];
  }

  public static get beijing(): AwsRegion {
    return regions[23];
  }

  public static get ningxia(): AwsRegion {
    return regions[24];
  }

  public static get losAngeles(): AwsRegion {
    return regions[25];
  }
}
