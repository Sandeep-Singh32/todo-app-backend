# Use the official Node.js image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the backend port
EXPOSE 3005

# Run the application
CMD ["node", "dist/main"]