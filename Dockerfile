# Build the server app
FROM node:14-alpine AS server

WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Expose the server port and run the app
EXPOSE 3000
CMD [ "npm", "start" ]
