# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build TypeScript source
RUN npm run build

# Expose the API port
EXPOSE 5006

# Start the server
CMD ["node", "dist/server.js"]
