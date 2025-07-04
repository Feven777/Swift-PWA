# Step 1: Build the app
FROM node:22-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json or pnpm-lock.yaml
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's code
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Run the app
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the built output and production dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Tell Docker which port the app uses
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
