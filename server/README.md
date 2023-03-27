<p align="center" style="color: #343a40">
  <h1 align="center">Kfone MERN Sample - Server</h1>
</p>
<p align="center" style="font-size: 1.2rem;">The Node.js server for the Kfone MERN sample..</p>

## 👀 Live Deployment

A live preview of this demo is available at [https://kfone-api.vercel.app](https://kfone-api.vercel.app/).

## 🚀 Getting Started

1. Clone the repository.

```bash
git clone https://github.com/jeradrutnam/mern-kfone.git
```

2. Navigate to the `server` directory.

```bash
cd mern-kfone/server
```

3. Install the dependencies.

```bash
npm install
```

4. Create a `.env.local` file based on the `.env.example` file.

```bash
cp .env.example .env.local
```

5. Update the values in the `.env` file based on your requirements.

```bash
# The port number that the server will listen to.
# Change this to the desired port number that the server should listen to.
PORT=3002

# MongoDB connection URL for the application to use
MONGODB_URI=<add-mongodb-connection-url-here>

# The base URL for the Asgardeo organization's API
# E.g., https://api.asgardeo.io/t/your-org
ASGARDEO_BASE_URL=<add-asgardeo-org-base-url-her>

# The base URLs of clients that are allowed to access the API.
# Separate by commas if there's more than one.
# E.g., http://localhost:3000,http://localhost:3001
CLIENT_BASE_URL=<add-client-app-base-url-here>

# The client ID for the Asgardeo OIDC app
CLIENT_ID=<add-asgardeo-oidc-app-client-id-here>

# The client secret for the Asgardeo OIDC app
CLIENT_SECRET=<add-asgardeo-oidc-app-client-secret-here>
```

5. Start the development server.

```bash
npm start
```

This will start the app on [http://localhost:3000](http://localhost:3000).

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](../../CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](../../LICENSE), You may not use this file except in compliance with the License.
