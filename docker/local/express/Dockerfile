ARG NODE_VERSION=18-alpine

FROM node:${NODE_VERSION}

LABEL name="bidding-platform"
LABEL license="MIT"
LABEL description="Node.js real-time bidding platform"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY package*.json ./

RUN npm install

COPY . ${APP_HOME}

RUN npm install -g prisma \
    && npx prisma generate \
    && mkdir -p ${APP_HOME}/logs

CMD ["npm", "run", "dev"]
