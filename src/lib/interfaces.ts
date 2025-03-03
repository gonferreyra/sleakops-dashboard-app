export interface AWSPrincingApiResponse {
  attributesList: AttributesList;
  disclaimer: string;
  formatVersion: string;
  offerCode: Code;
  products: { [key: string]: Product };
  publicationDate: Date;
  terms: Terms;
  version: string;
}

export interface AttributesList {}

export enum Code {
  AmazonRDS = 'AmazonRDS',
}

export interface Product {
  attributes: Attributes;
  productFamily?: ProductFamily;
  sku: string;
}

export interface Attributes {
  acu?: string;
  clockSpeed?: ClockSpeed;
  currentGeneration?: CurrentGeneration;
  databaseEdition?: DatabaseEdition;
  databaseEngine?: DatabaseEngine;
  dedicatedEbsThroughput?: string;
  deploymentModel?: DeploymentModel;
  deploymentOption?: DeploymentOption;
  engineCode?: string;
  engineMajorVersion?: string;
  engineMediaType?: EngineMediaType;
  enhancedNetworkingSupported?: CurrentGeneration;
  extendedSupportPricingYear?: ExtendedSupportPricingYear;
  group?: Group;
  groupDescription?: string;
  instanceFamily?: InstanceFamily;
  instanceType?: string;
  instanceTypeFamily?: InstanceTypeFamily;
  licenseModel?: LicenseModel;
  limitlesspreview?: CurrentGeneration;
  location: Location;
  locationType: LocationType;
  maxVolumeSize?: MaxVolumeSize;
  memory?: Memory;
  minVolumeSize?: MinVolumeSize;
  networkPerformance?: NetworkPerformance;
  normalizationSizeFactor?: string;
  operation: Operation;
  physicalProcessor?: PhysicalProcessor;
  pricingUnit?: Unit;
  processorArchitecture?: ProcessorArchitecture;
  processorFeatures?: ProcessorFeatures;
  regionCode: RegionCode;
  servicecode: Code;
  servicename: Servicename;
  storage?: Storage;
  storageMedia?: StorageMedia;
  usagetype: string;
  vcpu?: string;
  volumeName?: VolumeName;
  volumeType?: VolumeType;
}

export enum ClockSpeed {
  The23GHz = '2.3 GHz',
  The24GHz = '2.4 GHz',
  The25GHz = '2.5 GHz',
  UpTo30GHz = 'Up to 3.0 GHz',
  UpTo31GHz = 'Up to 3.1 GHz',
  UpTo33GHz = 'Up to 3.3 GHz',
}

export enum CurrentGeneration {
  No = 'No',
  Yes = 'Yes',
}

export enum DatabaseEdition {
  Advanced = 'Advanced',
  Any = 'Any',
  Developer = 'Developer',
  Enterprise = 'Enterprise',
  EnterpriseBYOM = 'Enterprise-BYOM',
  Express = 'Express',
  Standard = 'Standard',
  StandardBYOM = 'Standard-BYOM',
  StandardOne = 'Standard One',
  StandardTwo = 'Standard Two',
  Web = 'Web',
}

export enum DatabaseEngine {
  Any = 'Any',
  AuroraMySQL = 'Aurora MySQL',
  AuroraPostgreSQL = 'Aurora PostgreSQL',
  Db2 = 'Db2',
  MariaDB = 'MariaDB',
  MySQL = 'MySQL',
  MySQLOnPremiseForOutpost = 'MySQL (on-premise for Outpost)',
  Oracle = 'Oracle',
  PostgreSQL = 'PostgreSQL',
  PostgreSQLOnPremiseForOutpost = 'PostgreSQL (on-premise for Outpost)',
  SQLServer = 'SQL Server',
  SQLServerOnPremiseForOutpost = 'SQL Server (on-premise for Outpost)',
}

export enum DeploymentModel {
  Custom = 'Custom',
}

export enum DeploymentOption {
  MultiAZ = 'Multi-AZ',
  MultiAZReadableStandbys = 'Multi-AZ (readable standbys)',
  MultiAZSQLServerMirror = 'Multi-AZ (SQL Server Mirror)',
  SingleAZ = 'Single-AZ',
  SingleAZOracleRAC = 'Single-AZ (Oracle RAC)',
}

export enum EngineMediaType {
  AWSProvided = 'AWS-provided',
  CustomerProvided = 'Customer-provided',
}

export enum ExtendedSupportPricingYear {
  Year1Year2 = 'Year 1, Year 2',
  Year3 = 'Year 3',
}

export enum Group {
  APIRequest = 'API Request',
  AuroraBacktrack = 'Aurora Backtrack',
  AuroraGlobalDatabase = 'Aurora Global Database',
  AuroraIOOperation = 'Aurora I/O Operation',
  ProvisionedGB = 'Provisioned GB',
  RDSCDCDataTransfer = 'RDS CDC Data Transfer',
  RDSIOOperation = 'RDS I/O Operation',
  RDSPiops = 'RDS-PIOPS',
  RDSSnapshotExport = 'RDS Snapshot Export',
  RDSThroughput = 'RDS-Throughput',
}

export enum InstanceFamily {
  ComputeOptimized = 'Compute optimized',
  GeneralPurpose = 'General purpose',
  MemoryOptimized = 'Memory optimized',
  MicroInstances = 'Micro instances',
  T3 = 'T3',
  T4G = 'T4G',
}

export enum InstanceTypeFamily {
  C6Gd = 'C6gd',
  M1 = 'M1',
  M2 = 'M2',
  M3 = 'M3',
  M4 = 'M4',
  M5 = 'M5',
  M5D = 'M5d',
  M6G = 'M6G',
  M6Gd = 'M6GD',
  M6I = 'M6i',
  M6ID = 'M6id',
  M6Idn = 'M6IDN',
  M6In = 'M6IN',
  M7G = 'M7G',
  M7I = 'M7i',
  M8G = 'M8G',
  ProvisionedAMR = 'ProvisionedAMR',
  ProvisionedFMR = 'ProvisionedFMR',
  R3 = 'R3',
  R4 = 'R4',
  R5 = 'R5',
  R5B = 'R5b',
  R5D = 'R5d',
  R6G = 'R6G',
  R6Gd = 'R6GD',
  R6I = 'R6i',
  R6ID = 'R6id',
  R6Idn = 'R6IDN',
  R6In = 'R6IN',
  R7G = 'R7G',
  R7I = 'R7i',
  R8G = 'R8G',
  ServerlessAMR = 'ServerlessAMR',
  ServerlessFMR = 'ServerlessFMR',
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4G = 'T4G',
  X1 = 'X1',
  X1E = 'X1e',
  X2G = 'X2G',
  X2Idn = 'x2idn',
  X2Iedn = 'x2iedn',
  X2Iezn = 'x2iezn',
  Z1D = 'Z1D',
}

export enum LicenseModel {
  BringYourOwnLicense = 'Bring your own license',
  LicenseIncluded = 'License included',
  Marketplace = 'Marketplace',
  Na = 'NA',
  NoLicenseRequired = 'No license required',
}

export enum Location {
  USEastNVirginia = 'US East (N. Virginia)',
}

export enum LocationType {
  AWSOutposts = 'AWS Outposts',
  AWSRegion = 'AWS Region',
}

export enum MaxVolumeSize {
  The128TB = '128 TB',
  The16TB = '16 TB',
  The3TB = '3 TB',
  The64TB = '64 TB',
}

export enum Memory {
  The0613GiB = '0.613 GiB',
  The1024GiB = '1024 GiB',
  The122GiB = '122 GiB',
  The128GiB = '128 GiB',
  The1525GiB = '15.25 GiB',
  The1536GiB = '1536 GiB',
  The15GiB = '15 GiB',
  The160GiB = '160 GiB',
  The16GiB = '16 GiB',
  The171GiB = '17.1 GiB',
  The17GiB = '1.7 GiB',
  The192GiB = '192 GiB',
  The1952GiB = '1952 GiB',
  The1GiB = '1 GiB',
  The2048GiB = '2048 GiB',
  The244GiB = '244 GiB',
  The256GiB = '256 GiB',
  The2GiB = '2 GiB',
  The305GiB = '30.5 GiB',
  The3072GiB = '3072 GiB',
  The30GiB = '30 GiB',
  The32GiB = '32 GiB',
  The342GiB = '34.2 GiB',
  The375GiB = '3.75 GiB',
  The384GiB = '384 GiB',
  The3904GiB = '3904 GiB',
  The4096GiB = '4096 GiB',
  The488GiB = '488 GiB',
  The4GiB = '4 GiB',
  The512GiB = '512 GiB',
  The61GiB = '61 GiB',
  The64GiB = '64 GiB',
  The684GiB = '68.4 GiB',
  The75GiB = '7.5 GiB',
  The768GiB = '768 GiB',
  The8GiB = '8 GiB',
  The96GiB = '96 GiB',
  The976GiB = '976 GiB',
}

export enum MinVolumeSize {
  The100GB = '100 GB',
  The10GB = '10 GB',
  The5GB = '5 GB',
}

export enum NetworkPerformance {
  High = 'High',
  Low = 'Low',
  LowToModerate = 'Low to Moderate',
  Moderate = 'Moderate',
  The10000Mbps = '10,000 Mbps',
  The100Gbps = '100 Gbps',
  The10Gbps = '10 Gbps',
  The10Gigabit = '10 Gigabit',
  The125Gbps = '12.5 Gbps',
  The12Gbps = '12 Gbps',
  The12Gigabit = '12 gigabit',
  The150Gbps = '150 Gbps',
  The15Gigabit = '15 Gigabit',
  The1875Gbps = '18.75 Gbps',
  The200Gbps = '200 Gbps',
  The20Gbps = '20 Gbps',
  The20Gigabit = '20 Gigabit',
  The225Gigabit = '22.5 Gigabit',
  The25000Mbps = '25,000 Mbps',
  The25Gbps = '25 Gbps',
  The25Gigabit = '25 Gigabit',
  The30Gigabit = '30 Gigabit',
  The375Gbps = '37.5 Gbps',
  The40Gigabit = '40 Gigabit',
  The50Gbps = '50 Gbps',
  The50Gigabit = '50 Gigabit',
  The75Gbps = '75 Gbps',
  UpTo10000Mbps = 'Up to 10,000 Mbps',
  UpTo10Gbps = 'Up to 10 Gbps',
  UpTo10Gigabit = 'Up to 10 Gigabit',
  UpTo125Gbps = 'Up to 12.5 Gbps',
  UpTo125Gigabit = 'Up to 12.5 Gigabit',
  UpTo15Gigabit = 'Up to 15 Gigabit',
  UpTo25Gbps = 'Up to 25 Gbps',
  UpTo30Gbps = 'Up to 30 Gbps',
  UpTo40Gbps = 'Up to 40 Gbps',
  UpTo50Gbps = 'Up to 50 Gbps',
  UpTo5Gigabit = 'Up to 5 Gigabit',
  VeryLow = 'Very Low',
}

export enum Operation {
  CreateDBInstance = 'CreateDBInstance',
  CreateDBInstance0002 = 'CreateDBInstance:0002',
  CreateDBInstance0003 = 'CreateDBInstance:0003',
  CreateDBInstance0004 = 'CreateDBInstance:0004',
  CreateDBInstance0005 = 'CreateDBInstance:0005',
  CreateDBInstance0006 = 'CreateDBInstance:0006',
  CreateDBInstance0008 = 'CreateDBInstance:0008',
  CreateDBInstance0009 = 'CreateDBInstance:0009',
  CreateDBInstance0010 = 'CreateDBInstance:0010',
  CreateDBInstance0011 = 'CreateDBInstance:0011',
  CreateDBInstance0012 = 'CreateDBInstance:0012',
  CreateDBInstance0014 = 'CreateDBInstance:0014',
  CreateDBInstance0015 = 'CreateDBInstance:0015',
  CreateDBInstance0016 = 'CreateDBInstance:0016',
  CreateDBInstance0018 = 'CreateDBInstance:0018',
  CreateDBInstance0019 = 'CreateDBInstance:0019',
  CreateDBInstance0020 = 'CreateDBInstance:0020',
  CreateDBInstance0021 = 'CreateDBInstance:0021',
  CreateDBInstance0028 = 'CreateDBInstance:0028',
  CreateDBInstance0029 = 'CreateDBInstance:0029',
  CreateDBInstance0034 = 'CreateDBInstance:0034',
  CreateDBInstance0035 = 'CreateDBInstance:0035',
  CreateDBInstance0210 = 'CreateDBInstance:0210',
  CreateDBInstance0220 = 'CreateDBInstance:0220',
  CreateDBInstance0230 = 'CreateDBInstance:0230',
  CreateDBInstance0231 = 'CreateDBInstance:0231',
  CreateDBInstance0232 = 'CreateDBInstance:0232',
  CreateDBInstance0401 = 'CreateDBInstance:0401',
  CreateDBInstance0402 = 'CreateDBInstance:0402',
  CreateDBInstance0403 = 'CreateDBInstance:0403',
  CreateDBInstance0405 = 'CreateDBInstance:0405',
  CreateDBInstance0406 = 'CreateDBInstance:0406',
  CreateDBInstance0407 = 'CreateDBInstance:0407',
  CreateDBInstance0410 = 'CreateDBInstance:0410',
  CreateDBInstance0411 = 'CreateDBInstance:0411',
  CreateDBInstance0420 = 'CreateDBInstance:0420',
  CreateDBProxy0002 = 'CreateDBProxy:0002',
  CreateDBProxy0014 = 'CreateDBProxy:0014',
  CreateDBProxy0016 = 'CreateDBProxy:0016',
  CreateDBProxy0018 = 'CreateDBProxy:0018',
  CreateDBProxy0021 = 'CreateDBProxy:0021',
  Empty = '',
}

export enum PhysicalProcessor {
  AWSGraviton2 = 'AWS Graviton2',
  AWSGraviton3 = 'AWS Graviton3',
  AWSGraviton4 = 'AWS Graviton4',
  IntelSkylakeE52686V525GHz = 'Intel Skylake E5 2686 v5 (2.5 GHz)',
  IntelXeon8375 = 'Intel Xeon 8375',
  IntelXeonE52670V2IvyBridge = 'Intel Xeon E5-2670 v2 (Ivy Bridge)',
  IntelXeonE52670V2IvyBridgeSandyBridge = 'Intel Xeon E5-2670 v2 (Ivy Bridge/Sandy Bridge)',
  IntelXeonE52676V3Haswell = 'Intel Xeon E5-2676 v3 (Haswell)',
  IntelXeonE52686V4Broadwell = 'Intel Xeon E5-2686 v4 (Broadwell)',
  IntelXeonE78880V3 = 'Intel Xeon E7-8880 v3',
  IntelXeonFamily = 'Intel Xeon Family',
  IntelXeonPlatinum8000Series = 'Intel Xeon Platinum 8000 series',
  IntelXeonPlatinum8151 = 'Intel Xeon Platinum 8151',
  IntelXeonPlatinum8175 = 'Intel Xeon Platinum 8175',
  IntelXeonScalableCascadeLake = 'Intel Xeon Scalable Cascade Lake',
  IntelXeonScalableIceLake = 'Intel Xeon Scalable Ice Lake',
  IntelXeonScalableSapphireRapids8488C = 'Intel Xeon Scalable (Sapphire Rapids 8488C)',
  Variable = 'Variable',
}

export enum Unit {
  ACUHour = 'ACU-hour',
  ACUHr = 'ACU-Hr',
  ACUMonths = 'ACU-Months',
  APICalls = 'API Calls',
  CRHr = 'CR-Hr',
  GB = 'GB',
  GBMo = 'GB-Mo',
  Hrs = 'Hrs',
  IOPSMo = 'IOPS-Mo',
  IOS = 'IOs',
  MBPSMo = 'MBPS-Mo',
  Quantity = 'Quantity',
  VCPUHour = 'vCPU-hour',
  VCPUHours = 'vCPU-Hours',
  VCPUMonths = 'vCPU-Months',
}

export enum ProcessorArchitecture {
  The32BitOr64Bit = '32-bit or 64-bit',
  The64Bit = '64-bit',
  X86 = 'x86',
}

export enum ProcessorFeatures {
  IntelAVXIntelAVX2IntelAVX512IntelTurbo = 'Intel AVX, Intel AVX2, Intel AVX512, Intel Turbo',
  IntelAVXIntelAVX2IntelTurbo = 'Intel AVX, Intel AVX2, Intel Turbo',
  IntelAVXIntelTurbo = 'Intel AVX; Intel Turbo',
  ProcessorFeaturesIntelAVXIntelAVX2IntelTurbo = 'Intel AVX; Intel AVX2; Intel Turbo',
}

export enum RegionCode {
  UsEast1 = 'us-east-1',
}

export enum Servicename {
  AmazonRelationalDatabaseService = 'Amazon Relational Database Service',
}

export enum Storage {
  AuroraIOOptimizationMode = 'Aurora IO Optimization Mode',
  EBSOnly = 'EBS Only',
  The1X118NVMeSSD = '1 x 118 NVMe SSD',
  The1X120SSD = '1 x 120 SSD',
  The1X150NVMeSSD = '1 x 150 NVMe SSD',
  The1X160 = '1 x 160',
  The1X160SSD = '1 x 160 SSD',
  The1X1900NVMeSSD = '1 x 1900 NVMe SSD',
  The1X1920SSD = '1 x 1920 SSD',
  The1X237NVMeSSD = '1 x 237 NVMe SSD',
  The1X240SSD = '1 x 240 SSD',
  The1X300NVMeSSD = '1 x 300 NVMe SSD',
  The1X320SSD = '1 x 320 SSD',
  The1X32SSD = '1 x 32 SSD',
  The1X410 = '1 x 410',
  The1X420 = '1 x 420',
  The1X450NVMeSSD = '1 x 450 NVMe SSD',
  The1X474NVMeSSD = '1 x 474 NVMe SSD',
  The1X475NVMeSSD = '1 x 475 NVMe SSD',
  The1X480SSD = '1 x 480 SSD',
  The1X4SSD = '1 x 4 SSD',
  The1X59NVMeSSD = '1 x 59 NVMe SSD',
  The1X75NVMeSSD = '1 x 75 NVMe SSD',
  The1X80SSD = '1 x 80 SSD',
  The1X850 = '1 x 850',
  The1X900NVMeSSD = '1 x 900 NVMe SSD',
  The1X950NVMeSSD = '1 x 950 NVMe SSD',
  The1X960SSD = '1 x 960 SSD',
  The2X1425NVMeSSD = '2 x 1425 NVMe SSD',
  The2X1900NVMeSSD = '2 x 1900 NVMe SSD',
  The2X1920SSD = '2 x 1920 SSD',
  The2X300NVMeSSD = '2 x 300 NVMe SSD',
  The2X320SSD = '2 x 320 SSD',
  The2X40SSD = '2 x 40 SSD',
  The2X420 = '2 x 420',
  The2X600NVMeSSD = '2 x 600 NVMe SSD',
  The2X80SSD = '2 x 80 SSD',
  The2X840 = '2 x 840',
  The2X900NVMeSSD = '2 x 900 NVMe SSD',
  The4X1425NVMeSSD = '4 x 1425 NVMe SSD',
  The4X1900NVMeSSD = '4 x 1900 NVMe SSD',
  The4X420 = '4 x 420',
  The4X600NVMeSSD = '4 x 600 NVMe SSD',
  The4X900NVMeSSD = '4 x 900 NVMe SSD',
}

export enum StorageMedia {
  AmazonS3 = 'AmazonS3',
  Magnetic = 'Magnetic',
  SSD = 'SSD',
}

export enum VolumeName {
  Gp2 = 'gp2',
  Gp3 = 'gp3',
  Io1 = 'io1',
  Io2 = 'io2',
}

export enum VolumeType {
  GeneralPurpose = 'General Purpose',
  GeneralPurposeAurora = 'General Purpose-Aurora',
  GeneralPurposeGP3 = 'General Purpose-GP3',
  GeneralPurposeSSD = 'General Purpose (SSD)',
  IOOptimizedAurora = 'IO Optimized-Aurora',
  Magnetic = 'Magnetic',
  ProvisionedIOPS = 'Provisioned IOPS',
  ProvisionedIOPSIO2 = 'Provisioned IOPS-IO2',
  ProvisionedIOPSSSD = 'Provisioned IOPS (SSD)',
}

export enum ProductFamily {
  AuroraGlobalDatabase = 'Aurora Global Database',
  CPUCredits = 'CPU Credits',
  DatabaseInstance = 'Database Instance',
  DatabaseStorage = 'Database Storage',
  Limitless = 'Limitless',
  PerformanceInsights = 'Performance Insights',
  ProvisionedIOPS = 'Provisioned IOPS',
  ProvisionedThroughput = 'Provisioned Throughput',
  RDSProxy = 'RDSProxy',
  Serverless = 'Serverless',
  ServerlessV2 = 'ServerlessV2',
  StorageSnapshot = 'Storage Snapshot',
  SystemOperation = 'System Operation',
}

export interface Terms {
  OnDemand: { [key: string]: { [key: string]: OnDemand } };
  Reserved: { [key: string]: { [key: string]: Reserved } };
}

export interface OnDemand {
  effectiveDate: Date;
  offerTermCode: OnDemandOfferTermCode;
  priceDimensions: { [key: string]: PriceDimension };
  sku: string;
  termAttributes: AttributesList;
}

export enum OnDemandOfferTermCode {
  Jrtckxetxf = 'JRTCKXETXF',
}

export interface PriceDimension {
  appliesTo: any[];
  beginRange?: string;
  description: string;
  endRange?: string;
  pricePerUnit: PricePerUnit;
  rateCode: string;
  unit: Unit;
}

export interface PricePerUnit {
  USD: string;
}

export interface Reserved {
  effectiveDate: Date;
  offerTermCode: ReservedOfferTermCode;
  priceDimensions: { [key: string]: PriceDimension };
  sku: string;
  termAttributes: TermAttributes;
}

export enum ReservedOfferTermCode {
  Hu7G6Ketjz = 'HU7G6KETJZ',
  Nq3Qzpmqv9 = 'NQ3QZPMQV9',
  The38Npmptw36 = '38NPMPTW36',
  The4Na7Y494T4 = '4NA7Y494T4',
  The6Qcmyabx3D = '6QCMYABX3D',
}

export interface TermAttributes {
  LeaseContractLength: LeaseContractLength;
  OfferingClass: OfferingClass;
  PurchaseOption: PurchaseOption;
}

export enum LeaseContractLength {
  The1Yr = '1yr',
  The3Yr = '3yr',
}

export enum OfferingClass {
  Standard = 'standard',
}

export enum PurchaseOption {
  AllUpfront = 'All Upfront',
  NoUpfront = 'No Upfront',
  PartialUpfront = 'Partial Upfront',
}
