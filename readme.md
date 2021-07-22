# Payload + NextJS Server-Rendered TypeScript Boilerplate

This repo contains a boilerplate that'll get you going on a Payload install combined with a NextJS frontend.

## Installation

1. Create `.env` file with following keys :-
    ```
    PORT=3000
    PAYLOAD_SECRET_KEY=PAYLOAD_SECRET_KEY
    MONGO_URL=YOUR_MONGO_URI
    NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
    PAYLOAD_PUBLIC_SERVER_URL="http://localhost:3000"
    CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
    CLOUDINARY_KEY=YOUR_PUBLIC_KEY
    CLOUDINARY_SECRET=YOUR_SECRET
    ```


1. Run `yarn` or `npm install`
1. Go to [http://localhost:3000/admin](http://localhost:3000/admin) to create your first user

## Building and serving in Production

This repo contains everything you need to both build your project for production purposes as well as serve it after it's been built.

To build, run yarn build or npm run build.
To serve, run yarn serve or npm run serve.

