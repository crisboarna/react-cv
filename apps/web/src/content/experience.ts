import { CategoryProps } from '../app/components/cv/category';

const experience: CategoryProps = {
  title: 'Experience',
  icon: 'suitcase',
  description: '',
  list: [
    {
      title: 'Team Lead',
      subtitle: 'Collinson Group - via Arnia',
      subtitleLink: 'https://www.collinsongroup.com/',
      tags: [
        'glue',
        'kafka',
        'redis',
        'hadoop',
        'step functions',
        'kubernetes',
        's3',
        'reactjs',
      ],
      description: [
        "Led team of 4 in planning, architecting & delivering a serverless redemption platform with B2B & B2C API's on Lambda. Delivered on-time with  CMS backed white-label ReactJS web",
        'Successfully  liased with multiple down-stream systems in integrating new proxy  wrapper breaking up Java monolith. Did this using Kafka, Docker, Typescript which allowed me also to create CI/CD that enabled daily releases from old quaterly release cadence',
        'Designed and implemented plugin based API gateway used across department. This new integration with downstream vendors reduced  cross-team load by 17%',
      ],
    },
    {
      title: 'Senior Software Engineer',
      subtitle: 'Well Pharmacy - via Arnia',
      subtitleLink: 'https://www.well.co.uk/',
      tags: [
        'go',
        'lambda',
        'dynamodb',
        'hadoop',
        'step functions',
        's3',
        'reactjs',
        'cognito',
      ],
      description: [
        'Created magic link sign in/up system rolled out across all company sites increasing customer sign-up completion journey by 32%',
        'Setup event-driven ETL pipeline over of TB of customer S3 data lake in PySpark Hadoop. New real-time BI increased customer engagement by 11% through targeted offers',
        'Cut down pharmacists load by 27% via new ReactJS & Go self-service portal for customers',
      ],
    },
    {
      title: 'Senior Software Engineer',
      subtitle: 'E.ON - via Arnia',
      subtitleLink: 'https://www.eon.com/',
      date: 'March 2020 - February 2021',
      tags: ['Kubernetes', 'Azure', 'AKS', 'Functions', 'Cosmos', 'NodeJS'],
      description: [
        'Reduced MTTR by 33% by adding monitoring of AKS & Azure Functions via ELK on AKS',
      ],
    },
    {
      title: 'Senior Software Engineer',
      subtitle: 'Collinson Group - via Arnia',
      subtitleLink: 'https://www.collinsongroup.com/',
      date: 'March 2018 - February 2020',
      tags: [
        'Lambda',
        'ECS',
        'EC2',
        'RDS',
        'DynamoDB',
        'NodeJS',
        'Kotlin',
        'Terraform',
      ],
      description: [
        'Led team of 3 to create cluster based blockchain ledger platform. Developed on NodeJS, Kotlin & ReactJS running on ECS with self-checkout customer node expansion via Terraform',
        'Delivered on time serverless platform digitizing manual tasks of foundation with 50+ clients. Bore responsibility for entire project from requirements, wireframes to coding',
        'Managed & developed Workplace NLP bot as L1 support used by 250+ employees. Added ReactJS HR dashboard for human chat escalation, nominations & meeting room bookings',
      ],
    },
    {
      title: 'Cloud Software Engineer',
      subtitle: 'Cahootsy',
      date: 'July 2017 - March 2018',
      tags: [
        'lambda',
        'ecs',
        'sqs',
        's3',
        'nodejs',
        'elasticsearch',
        'etl',
        'nlp',
      ],
      description: [
        'Reduced by 90% existing 5 days serial error prone process via an event driven fault tolerant ETL. NLP datasets used to generate optimal targeted campaigns to reduce costs',
      ],
    },
    {
      title: 'Software Developer',
      subtitle: 'Citi',
      subtitleLink: 'https://citi.com',
      subtitleDetail: ' - Rates Pricing E-Trading',
      date: 'September 2016 - July 2017',
      tags: ['java', 'spring', 'low-latency', 'docker', 'nodejs', 'kubernetes'],
      description: [
        "Consolidated streaming of real-time pricing data to 100's of downstream systems via a low latency asynchronous graph based distributed aggregation system in Java Spring",
        'Reduced by 65% testing time of strategic logic by creating generic Cucumber test generator',
        'Set code quality standards via Kubernetes based ETL job on top of code build data in ELK',
      ],
    },
    {
      title: 'Software Engineer',
      subtitle: 'Citi',
      subtitleLink: 'https://citi.com',
      subtitleDetail: ' - Futures E-Trading',
      date: 'September 2015 - September 2016',
      tags: ['java', 'spring', 'low-latency', 'angularjs', 'nodejs'],
      description: [
        'Successfully did fundamental architectural change to major project by replacing duplicate JSP pages with modular Angular web and observer, decorator, adapter based Java backend',
        'Cut by 70% code duplication via a common shared library as measured in SonarQube',
      ],
    },
    {
      title: 'Software Engineer',
      subtitle: 'Nomura',
      subtitleLink: 'http://nomura.com',
      subtitleDetail: ' - Web Services Technologies',
      date: 'June 2013 - June 2014',
      tags: ['java', 'python3', 'spring'],
      description: [
        'Reduced team load by 95% on majority of daily tasks via Python and Java automation',
      ],
    },
  ],
};

export default experience;
