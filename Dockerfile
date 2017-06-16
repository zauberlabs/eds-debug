FROM node:6.11.0

RUN npm i --loglevel warn -g yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY yarn.lock package.json /usr/src/app/
RUN yarn

COPY . /usr/src/app

EXPOSE 5000

CMD ["node", "index.js"]
