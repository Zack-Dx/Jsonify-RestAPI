# Use the official Node.js image with version 18
FROM node:18

# Set the working directory to /usr/src/app in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for efficient dependency installation
COPY package*.json ./

# Install dependencies using npm ci for better reproducibility
RUN npm ci

# Copy all files from the current directory to /usr/src/app in the container
COPY . .

# Expose port 3000 to allow external access
EXPOSE 3000

# Define the command to start the service using npm start
CMD [ "npm", "run", "dev" ]
