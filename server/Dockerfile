FROM node:16 as builder
WORKDIR /client
COPY ../client/package*.json ./
RUN npm ci
RUN npm build

FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
COPY --from=builder /client/build ./
CMD ["npm","start"]