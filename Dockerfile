FROM node:10.4.1

WORKDIR /app

RUN pwd

RUN apt-get update -y \
    && apt-get install --no-install-recommends -y apt-utils \
    && apt-get install --no-install-recommends -y curl build-essential ca-certificates python

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD yarn start