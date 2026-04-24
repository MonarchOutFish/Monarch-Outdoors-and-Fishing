FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (compiles Vite frontend)
RUN npm run build

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8080

# Expose the Cloud Run port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
