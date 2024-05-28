ARG NODE_VERSION=18-alpine

FROM node:${NODE_VERSION}

LABEL name="bidding-platform"
LABEL license="MIT"
LABEL description="Node.js real-time bidding platform"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

RUN addgroup --system bidding \
    && adduser --system --ingroup bidding bidding

COPY package*.json ./

RUN npm install

COPY --chown=bidding:bidding . ${APP_HOME}

RUN chown bidding:bidding ${APP_HOME}

USER bidding

CMD ["npm", "run", "dev"]
