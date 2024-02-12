FROM public.ecr.aws/lambda/nodejs:20.2024.01.24.17-x86_64

RUN mkdir -p /tmp/output \
    && npm install puppeteer-core@21.7.0 @sparticuz/chromium@119.0.2

COPY dist/apps/exporter ${LAMBDA_TASK_ROOT}

CMD ["main.handler"]
