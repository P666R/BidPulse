# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy prisma directory
COPY prisma ./prisma/

# Stage 2: Create the development image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install development dependencies
RUN npm install

# Copy only necessary files from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Start the application with migration
CMD ["npm", "run", "dev:migrate"]
