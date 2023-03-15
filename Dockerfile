# Build the client app
FROM node:14-alpine AS client

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Build the server app
FROM node:14-alpine AS server

WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Copy the client build into the server app
COPY --from=client /app/client/dist ./public

# Expose the server port and run the app
EXPOSE 3000
CMD [ "npm", "start" ]
