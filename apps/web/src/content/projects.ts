import { CategoryProps } from '../app/components/cv/category';

const projects: CategoryProps = {
  title: 'Projects',
  icon: 'archive',
  description: '',
  list: [
    {
      title: 'InnerI',
      subtitle: 'Mobile App',
      tags: ['flutter', 'dart', 'firebase', 'firestore', 'cloud functions'],
      description: [
        'Flutter cross-platform iOS, Android & Web app written in Flutter for users mental health',
        'Leveraging Firebase Firestore for storage and Cloud Functions for serverless backend',
      ],
    },
    {
      title: 'Kortexo',
      subtitle: 'App',
      tags: [
        'typescript',
        'lambda',
        'api gateway',
        'ecs',
        'cognito',
        'cloudfront',
        's3',
        'flutter',
      ],
      description: [
        'Full stack platform to represent linked data with an oriented graph of any chosen subject matter for research & revision via browser or native mobile applications in Flutter',
        'Messenger, Slack integration for reminders & mobile Flutter app for testing of knowledge',
        'Horizontally scalable through combined usage of AWS ECS, Lambda for micro-services leveraging Cognito, Cloudwatch, DynamoDB, SQS, CloudFront, S3',
        'PWA done in ReactJS for admins and Flutter Web for users leveraging Firebase',
      ],
    },
    {
      title: 'Google Flutter',
      subtitle: 'Open Source Contributor',
      tags: ['flutter', 'dart', 'doctor'],
      description: [
        'Added improvements to Flutter project platform engine and `flutter doctor` tool',
      ],
    },
    {
      title: 'Kubernetes',
      subtitle: 'Open Source Contributor',
      tags: ['kubernetes', 'go', 'networking', 'cli'],
      description: [
        'Contributor across Kubernetes Open Source Project networking and cli SIGs',
      ],
    },
    {
      title: 'Crypto Tracker',
      subtitle: 'Mobile App',
      tags: ['flutter', 'reactnative', 'redux', 'thunk'],
      description: [
        'Created Flutter/ReactNative application for checking of all crypto coins with notifications',
      ],
    },
    {
      title: 'National Geographic Messenger Chat Bot',
      subtitle: 'Messenger Bot',
      tags: ['typescript', 'lambda', 'api gateway', 'nlp', 'route53'],
      description: [
        'NodeJS AWS Lambda chat bot with NLP processing and extraction of user intent',
      ],
    },
    {
      title: 'Augmented Reality Terminal',
      subtitle: 'Desktop App',
      tags: ['c++', 'opencv', 'computer vision', 'sockets', 'collision'],
      description: [
        'Created software framework with OpenCV and C++ to provide advanced HCI by using hand gestures manipulating digital artifacts with web camera and computer vision algorithms',
        'Implemented 3D environment through Irrlicht and C++ with networking and physics for engaging collaboration between multiple remote users in a synchronized environment',
      ],
    },
  ],
};

export default projects;
