# Use a Node.js LTS version as a base image
FROM node:20-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on. Cloud Run sets the PORT env variable (usually 8080).
EXPOSE 8080

# The command to run the application
CMD ["npm", "run", "serve:ssr:my-m3-app"]
