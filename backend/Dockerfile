# Use an official Node.js image for the backend
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Start the Node.js application
CMD ["node", "index.js"]