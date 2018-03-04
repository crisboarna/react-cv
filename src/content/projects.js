/* eslint max-len: "off" */

const projects = {
  title: 'Projects',
  icon: 'archive',
  description: null,
  list: [
    {
      title: 'National Geographic Alexa Skill Chat Bot',
      subtitle: 'Amazon Alexa Skill Store',
      tags: [
        'nodejs',
        'lambda',
        's3',
        'dynamodb',
      ],
      description: [
        'NodeJS AWS Lambda conversational bot with latency based routing via AWS Route53',
        'Extracts and stores daily payloads on S3 with metadata on DynamoDB due to Alexa HTTPS endpoint limitation',
        'Stores interaction data for conversational linking between sessions on DynamoDB',
      ],
    },
    {
      title: 'National Geographic Messenger Chat Bot',
      subtitle: 'http://m.me/natgeobot',
      subtitleLink: 'http://m.me/natgeobot',
      tags: [
        'nodejs',
        'lambda',
        'api gateway',
        'api.ai',
        'nlp',
      ],
      description: [
        'Used API.AI for NLP processing and extraction of user intent',
        'Stores interaction data for conversational linking between sessions on MongoDB',
        'NodeJS AWS Lambda chat bot with latency based routing via AWS Route53',
      ],
    },
    {
      title: 'Crypto Tracker',
      tags: [
        'reactnative',
        'redux',
        'thunk',
      ],
      description: [
        'Created ReactNative application for checking of all crypto coins with notifications',
      ],
    },
    {
      title: 'ReactJS Skillbars & ReactJS Scroll-Element',
      subtitle: 'https://www.npmjs.com/package/react-skillbars',
      subtitleLink: 'https://www.npmjs.com/package/react-skillbars',
      tags: [
        'reactjs',
        'es7',
      ],
      description: [
        'Developed and published on NPM ReactJS components for skill-bars and scroll navigation',
        'TDD approach resulting in 100% test coverage and hundreds of downloads of modules',
        'Wrote adhering to ES7 specification in order to familiarize myself with standard',
      ],
    },
    {
      title: 'Synapse Enhancer',
      subtitle: 'WIP',
      tags: [
        'nodejs',
        'lambda',
        'api gateway',
        'ecs',
        'aws neptune',
        'reactnative',
      ],
      description: [
        'Creating full stack application to represent linked data with an oriented graph of any chosen subject matter for research & revision via browser or native applications in ReactNative',
        'Horizontally scalable through combined usage of AWS ECS Docker for website and AWS Lambda for service workers',
        'Storing structured data with newly announced AWS Neptune graph database',
        'Progressive Web App website being done in ReactJS',
      ],
    },
    {
      title: 'Augmented Reality Terminal',
      subtitle: 'University of Manchester',
      subtitleLink: 'http://www.cs.manchester.ac.uk/',
      tags: [
        'c++',
        'opencv',
        'computer vision',
        'sockets',
        'collision',
      ],
      description: [
        'Created software framework with OpenCV and C++ to provide advanced HCI by using hand gestures to manipulate digital artifacts with web camera and computer vision algorithmic techniques',
        'Implemented 3D environment through Irrlicht and C++ with networking and physics for engaging collaboration between multiple remote users in a synchronized environment',
        'Developed in agile manner with the use of personal Jira instance for issues and stories',
      ],
    },
  ],
};

export default projects;
