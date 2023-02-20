FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm i -f
COPY . .
EXPOSE 3000
CMD ["npm", "start"]