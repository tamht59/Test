FROM node:8.15.0

ENV APP_ROOT /srv

WORKDIR ${APP_ROOT}

ADD . ${APP_ROOT}
RUN yarn install && yarn run build

EXPOSE 3000

ENTRYPOINT HOST=0.0.0.0 yarn start
