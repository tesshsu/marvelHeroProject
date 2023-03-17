# Build the client app
FROM node:14-alpine AS client

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Build the server app
FROM node:14-alpine AS server

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Copy the built client app to the server app
COPY --from=client /app/dist /app/public

# Expose port 3000
EXPOSE 3000

# Start the server app
CMD ["npm", "start"]
