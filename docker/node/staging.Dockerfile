# base image
FROM node:current-alpine

# Set working directory
WORKDIR /var/www/frontend

# Use pnpm for faster npm install
RUN npm install --global pnpm

ENV PATH /var/www/frontend/node_modules/.bin:$PATH

COPY ./src/frontend/package.json /var/www/frontend
COPY ./src/frontend/package-lock.json /var/www/frontend

# Install dependencies
RUN echo -e 'auto-install-peers=true' > .npmrc
RUN pnpm install

COPY ./src/frontend/ /var/www/frontend
