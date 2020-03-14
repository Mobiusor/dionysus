FROM node:10.16.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# add npm package
COPY package.json /usr/src/app/package.json

RUN npm i

# copy code
COPY . /usr/src/app

CMD ["./setup-production.sh"]