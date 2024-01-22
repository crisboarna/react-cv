import { CategoryProps } from '../app/components/cv/category';

const experience: CategoryProps = {
  title: 'Experience',
  icon: 'suitcase',
  description: '',
  list: [
    {
      title: 'Senior Software Engineer',
      subtitle: 'E.ON - via Arnia',
      subtitleLink: 'https://www.eon.com/',
      date: 'July 2023 - Present',
      tags: ["python","java","docker","kubernetes","azure"],
      description: [
        "Achieved a dramatic 100% reduction in trading platform order execution time from 30 seconds to 5 microseconds through cunning rewrite of the order execution algorithm.",
        "Standardized order routing algorithm config through trader friendly rule generation UI that reduced by 90% the time to market for new trading strategies with no code changes required.",
        "Reduced by 80% onboarding time and increased developer velocity by Dockerizing a Python & Java monorepo in devcontainers.",
      ]
    },
    {
      title: 'Senior Software Engineer',
      subtitle: 'Apsis.ai (Arnia)',
      subtitleLink: 'https://apsis.ai',
      date: 'February 2023 - July 2023',
      tags: [
        'python',
        'ai',
        'inference',
        'machine learning',
        'kubernetes',
        'aws',
        'eks',
      ],
      description: [
        "Led the optimization of an AI inference pipeline for an AI platform. Worked on a custom K8s operator to manage GPU RAM allocation for fleet of artificial neural network (ANN) workers.",
        "57% reduction in E2E latency by optimizing architecture & code of the AI pipeline workflow.",
        "Improved by 95% the pod scale out time via pre-warming of K8s PVC with model metadata.",
        'Reduced by 94% the CI duration by optimizing the AI image & re-architecting CI/CD pipeline.'
      ],
    },
    {
      title: 'Senior Research Engineer',
      subtitle: 'LG Electronics - via Arnia',
      subtitleLink: 'https://www.lg.com',
      date: 'February 2022 - February 2023',
      tags: [
        'c++',
        'webrtc',
        'python',
        'cmake',
        'docker',
        'electron',
      ],
      description: [
        'Created cross-platform native conferencing application in C++ with focus on WebRTC network stack and UNIX socket cross-module communication.',
        'Reduced UNIX TCP sockets network chatter by 55% as tracked by cAdvisor.',
      ],
    },
    {
      title: 'Team Lead',
      subtitle: 'ValueDynamx - via Arnia',
      subtitleLink: 'https://www.collinsongroup.com/',
      tags: [
        'typescript',
        'kubernetes',
        'kafka',
        'reactjs',
        'redis',
        'glue',
        'hadoop'
      ],
      description: [
        "Led team of 4 in planning, architecting & delivering a serverless redemption platform with B2B & B2C API's on Lambda. Delivered on-time with CMS backed white-label ReactJS web.",
        'Successfully liased with down-stream systems in integrating a new proxy wrapper to break up a Java monolith. Used Kafka, Docker & TS. Added CI that enabled daily release cadence.',
        'Designed and implemented plugin based API Gateway internal service. This new integration with downstream vendors reduced  cross-team load by 17%.',
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
        'Created magic link sign in/up system rolled out across all company sites increasing customer sign-up completion journey by 32%.',
        'Setup event-driven ETL pipeline over of TB of customer S3 data lake in PySpark Hadoop. New real-time BI increased customer engagement by 11% through targeted offers.',
        'Cut down pharmacists load by 27% via new ReactJS & Go self-service portal for customers.',
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
        'Led team of 3 to create cluster based blockchain ledger platform. Developed on NodeJS, Kotlin & ReactJS running on ECS with self-checkout customer node expansion via Terraform.',
        'Led & delivered serverless platform digitizing manual tasks of foundation with 50+ clients.',
        'Managed & developed Workplace NLP bot as L1 support used by 250+ employees. Added ReactJS HR dashboard for human chat escalation, nominations & meeting room bookings.',
      ],
    },
    {
      title: 'Software Engineer',
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
        'Reduced by 90% a 5 days faulty process via an event driven ETL for targeted ad campaigns.',
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
        "Consolidated streaming of real-time pricing data to 100's of downstream systems via a low latency asynchronous graph based distributed aggregation system in Java Spring.",
        'Reduced by 65% testing time of strategic logic by creating generic Cucumber test generator.',
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
        'Successfully did fundamental architectural change to major project by replacing duplicate JSP pages with modular Angular web and observer, decorator, adapter based Java backend.',
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
        'Reduced team load by 95% on majority of daily tasks via Python and Java automation.',
      ],
    },
  ],
};

export default experience;
