export const wafRules = (projectName: string, stackEnv: string) => [
  {
    name: 'IPRateLimiting',
    priority: 0,
    action: { block: {} },
    statement: {
      rateBasedStatement: {
        limit: 100,
        aggregateKeyType: 'IP',
      },
    },
    visibilityConfig: {
      cloudWatchMetricsEnabled: true,
      metricName: `${projectName.toLowerCase()}-waf-ip-rate-${stackEnv.toLowerCase()}`,
      sampledRequestsEnabled: true,
    },
  },
  {
    name: 'AWS-AWSManagedRulesAmazonIpReputationList',
    priority: 10,
    statement: {
      managedRuleGroupStatement: {
        vendorName: 'AWS',
        name: 'AWSManagedRulesAmazonIpReputationList',
      },
    },
    overrideAction: {
      none: {},
    },
    visibilityConfig: {
      sampledRequestsEnabled: true,
      cloudWatchMetricsEnabled: true,
      metricName: 'AWSManagedRulesAmazonIpReputationList',
    },
  },
  {
    name: 'AWS-AWSManagedRulesCommonRuleSet',
    priority: 20,
    statement: {
      managedRuleGroupStatement: {
        vendorName: 'AWS',
        name: 'AWSManagedRulesCommonRuleSet',
        excludedRules: [],
      },
    },
    overrideAction: {
      none: {},
    },
    visibilityConfig: {
      sampledRequestsEnabled: true,
      cloudWatchMetricsEnabled: true,
      metricName: 'AWS-AWSManagedRulesCommonRuleSet',
    },
  },
  {
    name: 'AWSManagedRuleLinux',
    priority: 50,
    visibilityConfig: {
      sampledRequestsEnabled: true,
      cloudWatchMetricsEnabled: true,
      metricName: 'AWSManagedRuleLinux',
    },
    overrideAction: {
      none: {},
    },
    statement: {
      managedRuleGroupStatement: {
        vendorName: 'AWS',
        name: 'AWSManagedRulesLinuxRuleSet',
        excludedRules: [],
      },
    },
  },
];
