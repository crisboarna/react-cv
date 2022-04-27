import { CloudFormationCustomResourceResponse } from 'aws-lambda';

describe('exporter', () => {
  let handler;
  const EVENT_LOGICAL_ID = 'LOGICAL_ID';
  const EVENT_REQUEST_ID = 'REQUEST_ID';
  const EVENT_STACK_ID = 'STACK_ID';
  const ENV_CV_URL = 'CV_URL';
  const event: any = {
    LogicalResourceId: EVENT_LOGICAL_ID,
    RequestId: EVENT_REQUEST_ID,
    StackId: EVENT_STACK_ID,
  };
  const context: any = {};
  const callback = jest.fn();
  const putObjectMock = jest.fn();
  const putObjectPromiseMock = jest.fn();
  const puppeteerLaunchMock = jest.fn();
  const browserCloseMock = jest.fn();
  const newPageMock = jest.fn();
  puppeteerLaunchMock.mockResolvedValue({
    newPage: newPageMock,
    close: browserCloseMock,
  });

  beforeEach(() => {
    jest.mock('chrome-aws-lambda', () => ({
      args: [],
      puppeteer: { launch: puppeteerLaunchMock },
    }));

    jest.mock('aws-sdk', () => ({
      S3: jest.fn(() => ({
        putObject: putObjectMock,
      })),
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
    expect(putObjectPromiseMock).toHaveBeenCalledTimes(0);

    delete process.env.CV_URL;
  });

  it('returns ok', async () => {
    expect.assertions(7);

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

    process.env = { ...process.env, CV_URL: ENV_CV_URL };
    newPageMock.mockResolvedValue({
      goto: goToMock,
      addStyleTag: addStyleTagMock,
      pdf: pdfMock,
    });
    goToMock.mockResolvedValue({});
    addStyleTagMock.mockResolvedValue({});
    pdfMock.mockResolvedValue(pdfReturn);
    putObjectMock.mockImplementation(() => ({
      promise: () => Promise.resolve(),
    }));
    putObjectPromiseMock.mockResolvedValue({});
    browserCloseMock.mockResolvedValue({});

    //when
    await expect(handler(event, context, callback)).resolves.toEqual(
      expectedResponse
    );

    //then
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
    expect(putObjectMock).toHaveBeenCalledWith({
      Bucket: ENV_CV_URL,
      Key: 'Cristian Boarna CV.pdf',
      Body: pdfReturn,
      StorageClass: 'INTELLIGENT_TIERING',
    });
    expect(browserCloseMock).toHaveBeenCalled();

    delete process.env.CV_URL;
  });
});
