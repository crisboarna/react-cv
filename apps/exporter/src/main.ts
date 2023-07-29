import chromium from 'chrome-aws-lambda';
import {
  Handler,
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse,
} from 'aws-lambda';
import { S3 } from 'aws-sdk';
// import * as fs from "fs";

const PARAM_URL = 'CV_URL';
// process.env[PARAM_URL]='localhost:4200';

export const handler: Handler<
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse
> = async (event): Promise<CloudFormationCustomResourceResponse> => {
  console.log(event);
  const response: CloudFormationCustomResourceResponse = {
    Status: 'SUCCESS',
    Reason: '',
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: process.env[PARAM_URL],
    RequestId: event.RequestId,
    StackId: event.StackId,
  };

  if (!process.env[PARAM_URL]) {
    const message = `Missing '${PARAM_URL}' environment variable.`;
    console.error(message);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.Status = 'FAILED';
    response.Reason = message;
    return response;
  }

  const url = process.env[PARAM_URL];

  let browser = null;

  try {
    console.log(`Processing ${url}`);
    const s3Client = new S3();

    const executablePath = await chromium.executablePath;
    browser = await chromium.puppeteer.launch({
      executablePath,
      args: [...chromium.args, '--font-render-hinting=none'],
      defaultViewport: chromium.defaultViewport,
      ignoreHTTPSErrors: true,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(`https://${url}?buttons=false`, {
      waitUntil: 'networkidle0',
    });
    await page.addStyleTag({ content: '#body-wrapper {padding: 0}' });
    const pdf = await page.pdf({
      format: 'a4',
      printBackground: true,
    });
    console.log('Extracted pdf');

    // fs.writeFileSync("test.pdf",pdf, 'binary');
    await s3Client
      .putObject({
        Bucket: url,
        Key: 'Cristian Boarna CV.pdf',
        Body: pdf,
        StorageClass: 'INTELLIGENT_TIERING',
      })
      .promise();
    console.log('Saved pdf on S3');
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.Status = 'FAILED';
    response.Reason = error.message;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  console.log(`Done`, response);
  return response;
};
