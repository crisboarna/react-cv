import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import {
  Handler,
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse,
} from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';

const PARAM_URL = 'CV_URL';
const fileName = 'Boarna Cristian CV.pdf';

export const handler: Handler<
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse
> = async (event): Promise<CloudFormationCustomResourceResponse> => {
  console.log(event);
  const isLocal = process.env['CLOUD_DEPLOYED'] !== 'true';

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

    browser = await puppeteer.launch({
      args: [...chromium.args, '--font-render-hinting=none'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      ignoreHTTPSErrors: true,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(`${url}?buttons=false`, {
      waitUntil: 'networkidle0',
    });
    await page.addStyleTag({ content: '#body-wrapper {padding: 0}' });
    const pdf = await page.pdf({
      format: 'a4',
      printBackground: true,
    });
    console.log('Extracted pdf');

    if (isLocal) {
      console.log('Saving pdf locally');

      fs.writeFileSync(`/tmp/output/${fileName}`, pdf, 'binary');

      console.log('Saved pdf locally!');
    } else {
      console.log('Saving pdf on S3');

      const s3Client = new S3Client();
      const cmd = new PutObjectCommand({
        Bucket: new URL(url).hostname,
        Key: fileName,
        Body: pdf,
        StorageClass: 'INTELLIGENT_TIERING',
      });
      console.log('Saving pdf on S3', cmd);
      await s3Client.send(cmd);
    }
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
