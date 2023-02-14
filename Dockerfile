FROM node:16 as builder
WORKDIR /client
COPY ./client/package*.json ./
RUN npm ci
COPY ./client ./
RUN npm run build

FROM node:16
WORKDIR /app
COPY ./server/package*.json ./
RUN npm ci
COPY ./server ./
COPY --from=builder /client/build ./
CMD ["npm","start"]