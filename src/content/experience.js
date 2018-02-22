const experience = {
  title: 'Experience',
  icon: null,
  description: null,
  list: [
    {
      title: 'Cloud Software Engineer',
      subtitle: 'Cahootsy',
      date: 'July 2017 - Present',
      tags: [
        'lambda',
        'sqs',
        's3',
        'ecs',
        'nodejs',
        'elasticsearch',
        'nlp'
      ],
      description: [
        'Streamlined and replaced existing serial error prone five days long process by 90% through development of cloud native horizontally scalable system in NodeJS on AWS Lambda',
        'Created multiple event driven AWS Lambda in conjunction with AWS ES, SQS, Docker ECS to provide fault tolerance, scalability and high availability of whole system',
        'Used API.AI for NLP datasets to generate optimal targeted campaigns to reduce costs'
      ]
    },
    {
      title: 'Software Developer',
      subtitle: 'Citi',
      tags: [
        'java',
        'spring',
        'low-latency',
        'docker',
        'nodejs',
        'kubernetes',
      ],
      description: [
        'Consolidated streaming of pricing data to thousands of downstream systems by developing a real-time low latency asynchronous graph based distributed system in Java Spring that aggregates data from dozens of micro-services based on async events',
        'Implemented generic functional test generator for Cucumber BDD of strategic logic that reduced testing and development time for global team',
        'Developed Dockerized NodeJS application to improve development standards across company. Used Kubernetes to manage containers which scaled based on number of builds triggered company wide to handle load of parsing and placing data into Elasticsearch'
      ],
      subtitleLink: 'http://citi.com',
      subtitleDetail: ' - Rates Pricing E-Trading Technology',
      date: 'September 2016 - July 2017'
    },
    {
      title: 'Software Engineer',
      subtitle: 'Citi',
      tags: [
        'java',
        'spring',
        'low-latency',
        'angularjs',
        'nodejs'
      ],
      description: [
        'Did fundamental architectural change to major project by replacing duplicate JSP pages with modular AngularJS & Mocha and flexible observer, decorator, adapter based Java server',
        'Played key role in developing and deploying new critical business product which required me to produce in fast development cycles followed by multiple daily iterations with client Director for feedback and iterate on Java, JavaScript, HTML5 and CSS3 designs',
        'Established new standards on departmental level by developing Java & JavaScript services that I linked to all existing projects as dependency from common Futures repository',
        'Converted all Java/JS codebase to Unix cloud by refactoring to microservice paradigm'
      ],
      subtitleLink: 'http://citi.com',
      subtitleDetail: ' - Futures E-Trading Technology',
      date: 'September 2015 - September 2016'
    },
    {
      title: 'Software Engineer',
      subtitle: 'Nomura',
      tags: [
        'java',
        'spring'
      ],
      description: [
        'Reduced team load by 95% on tasks through automating processes via Python and Java',
        'Designed proof of concept with agile user stories and class diagrams for company asset lifecycle management tool through global stakeholder meetings and agile iterations which got interest, involvement and approval of ED’s and CTO'
      ],
      subtitleLink: 'http://nomura.com',
      subtitleDetail: ' - Web Services Technologies',
      date: 'June 2013 - June 2014'
    }
  ]
};

export default experience;
