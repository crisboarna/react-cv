import { CloudFormationCustomResourceResponse } from 'aws-lambda';

describe('exporter', () => {
  let handler;
  const EVENT_LOGICAL_ID = 'LOGICAL_ID';
  const EVENT_REQUEST_ID = 'REQUEST_ID';
  const EVENT_STACK_ID = 'STACK_ID';
  const ENV_CV_URL = 'CV_URL';
  const CHROMIUM_MOCK_RESOLVED_PATH = 'CHROMIUM_MOCK_RESOLVED_PATH';
  const CHROMIUM_HEADLESS = false;
  const CHROMIUM_ARGS = 'CHROMIUM_ARGS';
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
  const chromiumExecutablePathMock = jest.fn();
  const newPageMock = jest.fn();
  puppeteerLaunchMock.mockResolvedValue({
    newPage: newPageMock,
    close: browserCloseMock,
  });
  chromiumExecutablePathMock.mockResolvedValue(CHROMIUM_MOCK_RESOLVED_PATH);
  puppeteerDefaultArgsMock.mockReturnValue(PUPPETEER_DEFAULT_ARGS);

  beforeEach(() => {
    jest.mock('puppeteer-core', () => ({
      launch: puppeteerLaunchMock,
      defaultArgs: puppeteerDefaultArgsMock,
    }));

    jest.mock('@sparticuz/chromium', () => ({
      args: CHROMIUM_ARGS,
      headless: CHROMIUM_HEADLESS,
      defaultViewport: 'DEFAULT_VIEW_PORT',
      executablePath: chromiumExecutablePathMock,
    }));

    jest.mock('@aws-sdk/client-s3', () => ({
      S3Client: jest.fn(() => ({
        send: sendMock,
      })),
      PutObjectCommand: putCommandMock,
    }));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    handler = require('../src/main').handler;
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

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
  });

  it('returns ok given deployed', async () => {
    expect.assertions(11);

    const goToMock = jest.fn();
    const addStyleTagMock = jest.fn();
    const pdfMock = jest.fn();
    const pdfReturn = 'PDF_RETURN';
    const mockCommandReturn = 'PUT_COMMAND_RETURN';

    //given
    const expectedResponse: CloudFormationCustomResourceResponse = {
      LogicalResourceId: EVENT_LOGICAL_ID,
      PhysicalResourceId: ENV_CV_URL,
      RequestId: EVENT_REQUEST_ID,
      StackId: EVENT_STACK_ID,
      Status: 'SUCCESS',
      Reason: '',
    };

    process.env = { ...process.env, CV_URL: ENV_CV_URL };
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

    //when
    await expect(handler(event, context, callback)).resolves.toEqual(
      expectedResponse
    );

    //then
    expect(puppeteerLaunchMock).toHaveBeenCalledTimes(1);
    expect(puppeteerLaunchMock).toHaveBeenCalledWith({
      args: CHROMIUM_ARGS,
      defaultViewport: 'DEFAULT_VIEW_PORT',
      executablePath: CHROMIUM_MOCK_RESOLVED_PATH,
      headless: CHROMIUM_HEADLESS,
      ignoreHTTPSErrors: true,
    });
    expect(goToMock).toHaveBeenCalledTimes(1);
    expect(goToMock).toHaveBeenCalledWith(
      `https://${ENV_CV_URL}?buttons=false`,
      { waitUntil: 'networkidle0' }
    );
    expect(addStyleTagMock).toHaveBeenCalledWith({
      content: '#body-wrapper {padding: 0}',
    });
    expect(pdfMock).toHaveBeenCalledWith({
      format: 'a4',
      printBackground: true,
    });
    expect(putCommandMock).toHaveBeenCalledWith({
      Bucket: ENV_CV_URL,
      Key: 'Cristian Boarna CV.pdf',
      Body: pdfReturn,
      StorageClass: 'INTELLIGENT_TIERING',
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({});
    expect(browserCloseMock).toHaveBeenCalled();

    delete process.env.CV_URL;
  });

  it('returns ok given not deployed', async () => {
    expect.assertions(11);

    const goToMock = jest.fn();
    const addStyleTagMock = jest.fn();
    const pdfMock = jest.fn();
    const pdfReturn = 'PDF_RETURN';
    const mockCommandReturn = 'PUT_COMMAND_RETURN';

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
    putCommandMock.mockReturnValue(mockCommandReturn);
    browserCloseMock.mockResolvedValue({});

    //when
    await expect(handler(event, context, callback)).resolves.toEqual(
      expectedResponse
    );

    //then
    expect(puppeteerLaunchMock).toHaveBeenCalledTimes(1);
    expect(puppeteerLaunchMock).toHaveBeenCalledWith({
      args: PUPPETEER_DEFAULT_ARGS,
      defaultViewport: 'DEFAULT_VIEW_PORT',
      executablePath:
        '/tmp/localChromium/chromium/mac_arm-1250092/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
      headless: CHROMIUM_HEADLESS,
      ignoreHTTPSErrors: true,
    });
    expect(goToMock).toHaveBeenCalledTimes(1);
    expect(goToMock).toHaveBeenCalledWith(
      `https://${ENV_CV_URL}?buttons=false`,
      { waitUntil: 'networkidle0' }
    );
    expect(addStyleTagMock).toHaveBeenCalledWith({
      content: '#body-wrapper {padding: 0}',
    });
    expect(pdfMock).toHaveBeenCalledWith({
      format: 'a4',
      printBackground: true,
    });
    expect(putCommandMock).toHaveBeenCalledWith({
      Bucket: ENV_CV_URL,
      Key: 'Cristian Boarna CV.pdf',
      Body: pdfReturn,
      StorageClass: 'INTELLIGENT_TIERING',
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({});
    expect(browserCloseMock).toHaveBeenCalled();

    delete process.env.CV_URL;
  });
});
