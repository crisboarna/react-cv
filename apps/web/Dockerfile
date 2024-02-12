FROM public.ecr.aws/docker/library/node:20.9-alpine3.17

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

EXPOSE 4200

ENTRYPOINT ["/usr/app/node_modules/.bin/nx", "serve", "web"]
