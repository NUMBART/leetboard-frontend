# module install
FROM node:16-alpine as module-install-stage
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm i -f --production

# build
FROM node:16-alpine as build-stage
COPY --from=module-install-stage /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
RUN npm run build

# serve
FROM node:16-alpine
COPY --from=build-stage /app/build/ /app/build
RUN npm i -g serve
EXPOSE 3000
# start app
CMD serve -s /app/build -l 3000