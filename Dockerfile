FROM node:18.16.0

EXPOSE 80

WORKDIR /app

COPY package.json /app

ENV NODE_ENV=production
ENV PORT=80

RUN npm install

COPY . /app

RUN ["npm", "run", "build"]

CMD ["npm", "start"]