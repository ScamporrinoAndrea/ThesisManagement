FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install --ignore-scripts

# Bundle app source
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]