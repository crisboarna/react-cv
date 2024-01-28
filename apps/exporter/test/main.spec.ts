import { CloudFormationCustomResourceResponse } from 'aws-lambda';
import chromium from '@sparticuz/chromium';

describe('exporter', () => {
  let handler;
  const EVENT_LOGICAL_ID = 'LOGICAL_ID';
  const EVENT_REQUEST_ID = 'REQUEST_ID';
  const EVENT_STACK_ID = 'STACK_ID';
  const ENV_CV_URL = 'https://cv.url';
  const PUPPETEER_DEFAULT_ARGS = 'PUPPETEER_DEFAULT_ARGS';
  const event: unknown = {
    LogicalResourceId: EVENT_LOGICAL_ID,
    RequestId: EVENT_REQUEST_ID,
    StackId: EVENT_STACK_ID,
  };
  const context: unknown = {};
  const callback = jest.fn();
  const sendMock = jest.fn();
  const putCommandMock = jest.fn();
  const puppeteerLaunchMock = jest.fn();
  const browserCloseMock = jest.fn();
  const puppeteerDefaultArgsMock = jest.fn();
  const newPageMock = jest.fn();
  const writeFileSyncMock = jest.fn();

  beforeEach(() => {
    puppeteerLaunchMock.mockResolvedValue({
      newPage: newPageMock,
      close: browserCloseMock,
    });
    puppeteerDefaultArgsMock.mockReturnValue([PUPPETEER_DEFAULT_ARGS]);
    jest.mock('puppeteer-core', () => ({
      launch: puppeteerLaunchMock,
      defaultArgs: puppeteerDefaultArgsMock,
    }));

    jest.mock('@aws-sdk/client-s3', () => ({
      S3Client: jest.fn().mockImplementation(() => ({
        send: sendMock,
      })),
      PutObjectCommand: putCommandMock,
    }));
    jest.mock('fs', () => ({
      writeFileSync: writeFileSyncMock,
    }));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    handler = require('../src/main').handler;
  });

  afterEach(async () => jest.resetAllMocks());

  it('no CV_URL', async () => {
    expect.assertions(1);
    const expectedResponse: CloudFormationCustomResourceResponse = {
      LogicalResourceId: EVENT_LOGICAL_ID,
      PhysicalResourceId: undefined,
      RequestId: EVENT_REQUEST_ID,
      StackId: EVENT_STACK_ID,
      Status: 'FAILED',
      Reason: "Missing 'CV_URL' environment variable.",
    };

    delete process.env.CV_URL;
    delete process.env.CLOUD_DEPLOYED;

    await expect(handler(event, context, callback)).resolves.toEqual(
      expectedResponse
    );
  });

  it('error thrown during pdf generation', async () => {
    expect.assertions(3);

    //given
    const ERROR = 'ERROR';
    const expectedResponse: CloudFormationCustomResourceResponse = {
      LogicalResourceId: EVENT_LOGICAL_ID,
      PhysicalResourceId: ENV_CV_URL,
      RequestId: EVENT_REQUEST_ID,
      StackId: EVENT_STACK_ID,
      Status: 'FAILED',
      Reason: ERROR,
    };

    process.env = { ...process.env, CV_URL: ENV_CV_URL };
    newPageMock.mockRejectedValueOnce(new Error(ERROR));

    //when
    await expect(handler(event, context, callback)).resolves.toEqual(
      expectedResponse
    );

    //then
    expect(browserCloseMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(0);

    delete process.env.CV_URL;
    delete process.env.CLOUD_DEPLOYED;
  });

  it('returns ok given deployed', async () => {
    expect.assertions(7);

    const goToMock = jest.fn();
    const addStyleTagMock = jest.fn();
    const pdfMock = jest.fn();
    const pdfReturn = 'PDF_RETURN';
    const mockCommandReturn = 'PUT_COMMAND_RETURN';

    process.env = {
      ...process.env,
      CV_URL: ENV_CV_URL,
      CLOUD_DEPLOYED: 'true',
    };

    newPageMock.mockResolvedValue({
      goto: goToMock,
      addStyleTag: addStyleTagMock,
      pdf: pdfMock,
    });

    goToMock.mockResolvedValue({});
    addStyleTagMock.mockResolvedValue({});
    pdfMock.mockResolvedValue(pdfReturn);
    putCommandMock.mockReturnValue(mockCommandReturn);
    browserCloseMock.mockResolvedValue({});
    sendMock.mockResolvedValue({});

    //when
    await handler(event, context, callback);

    //then
    // expect(puppeteerLaunchMock).toHaveBeenCalledTimes(1);
    expect(puppeteerLaunchMock).toHaveBeenCalledWith({
      args: [...chromium.args, '--font-render-hinting=none'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      ignoreHTTPSErrors: true,
      headless: chromium.headless,
    });
    expect(goToMock).toHaveBeenCalledTimes(1);
    expect(goToMock).toHaveBeenCalledWith(`${ENV_CV_URL}?buttons=false`, {
      waitUntil: 'networkidle0',
    });
    expect(addStyleTagMock).toHaveBeenCalledWith({
      content: '#body-wrapper {padding: 0}',
    });
    expect(pdfMock).toHaveBeenCalledWith({
      format: 'a4',
      printBackground: true,
    });
    expect(putCommandMock).toHaveBeenCalledWith({
      Bucket: ENV_CV_URL.split('://')[1],
      Key: 'Boarna Cristian CV.pdf',
      Body: pdfReturn,
      StorageClass: 'INTELLIGENT_TIERING',
    });
    expect(browserCloseMock).toHaveBeenCalled();

    delete process.env.CV_URL;
  });

  it('returns ok given not deployed', async () => {
    expect.assertions(10);

    const goToMock = jest.fn();
    const addStyleTagMock = jest.fn();
    const pdfMock = jest.fn();
    const pdfReturn = 'PDF_RETURN';

    //given
    const expectedResponse: CloudFormationCustomResourceResponse = {
      LogicalResourceId: EVENT_LOGICAL_ID,
      PhysicalResourceId: ENV_CV_URL,
      RequestId: EVENT_REQUEST_ID,
      StackId: EVENT_STACK_ID,
      Status: 'SUCCESS',
      Reason: '',
    };

    process.env = {
      ...process.env,
      CV_URL: ENV_CV_URL,
      CLOUD_DEPLOYED: 'false',
    };

    newPageMock.mockResolvedValue({
      goto: goToMock,
      addStyleTag: addStyleTagMock,
      pdf: pdfMock,
    });
    goToMock.mockResolvedValue({});
    addStyleTagMock.mockResolvedValue({});
    pdfMock.mockResolvedValue(pdfReturn);
    browserCloseMock.mockResolvedValue({});
    writeFileSyncMock.mockReturnValue({});

    //when
    await expect(handler(event, context, callback)).resolves.toEqual(
      expectedResponse
    );

    //then
    expect(puppeteerLaunchMock).toHaveBeenCalledTimes(1);
    expect(puppeteerLaunchMock).toHaveBeenCalledWith({
      args: [...chromium.args, '--font-render-hinting=none'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      ignoreHTTPSErrors: true,
      headless: chromium.headless,
    });
    expect(goToMock).toHaveBeenCalledTimes(1);
    expect(goToMock).toHaveBeenCalledWith(`${ENV_CV_URL}?buttons=false`, {
      waitUntil: 'networkidle0',
    });
    expect(addStyleTagMock).toHaveBeenCalledWith({
      content: '#body-wrapper {padding: 0}',
    });
    expect(pdfMock).toHaveBeenCalledWith({
      format: 'a4',
      printBackground: true,
    });
    expect(putCommandMock).toHaveBeenCalledTimes(0);
    expect(sendMock).toHaveBeenCalledTimes(0);
    expect(browserCloseMock).toHaveBeenCalled();

    delete process.env.CV_URL;
    delete process.env.CLOUD_DEPLOYED;
  });
});
