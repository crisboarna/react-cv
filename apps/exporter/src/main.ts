import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import {
  Handler,
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse,
} from 'aws-lambda';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import * as fs from "fs";

const PARAM_URL = 'CV_URL';
// process.env[PARAM_URL]='localhost:4200';

export const handler: Handler<
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse
> = async (event): Promise<CloudFormationCustomResourceResponse> => {
  console.log(event);
  const isLocal = process.env['CLOUD_DEPLOYED'] === 'false';

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
    const s3Client = new S3Client();

    browser = await puppeteer.launch({
      args: isLocal ? puppeteer.defaultArgs() : chromium.args,
      // args: [...chromium.args, '--font-render-hinting=none'],
      defaultViewport: chromium.defaultViewport,
      executablePath: isLocal
        ? "/tmp/localChromium/chromium/mac_arm-1250092/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
        : await chromium.executablePath(),
      ignoreHTTPSErrors: true,
      headless: isLocal ? false : chromium.headless,
    });

    const page = await browser.newPage();
    // await page.goto(`http://localhost:4200?buttons=false`, {
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
    const response = await s3Client.send(new PutObjectCommand({
      Bucket: url,
      Key: 'Cristian Boarna CV.pdf',
      Body: pdf,
      StorageClass: 'INTELLIGENT_TIERING',
    }))
    console.log('Saved pdf on S3', response);
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

if (process.env['CLOUD_DEPLOYED'] === 'false') {
  console.log("Running locally");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  handler({} as never)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .then(() => {
      console.log('Done.');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
