FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    tini \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["/usr/bin/tini", "--"]

CMD ["npm", "run", "dev"]
