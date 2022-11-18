FROM node:16-alpine
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "build/index.js"]
EXPOSE 3000