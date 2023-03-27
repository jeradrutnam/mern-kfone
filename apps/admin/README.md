<p align="center" style="color: #343a40">
  <h1 align="center">Kfone MERN Sample - Admin</h1>
</p>
<p align="center" style="font-size: 1.2rem;">The admin application for the Kfone MERN sample.</p>

## 👀 Live Deployment

A live preview of this demo is available at [https://kfone.vercel.app](https://kfone.vercel.app/).

## 🚀 Getting Started

1. Clone the repository.

```bash
git clone https://github.com/jeradrutnam/mern-kfone.git
```

2. Navigate to the `apps/admin` example.

```bash
cd mern-kfone/apps/admin
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
# The port number on which the client application will run
PORT=3000

# The endpoint of the server's API that the client application will communicate with
# E.g., http://localhost:5000/posts
REACT_APP_API_ENDPOINT=<add-server-api-url>

# The client ID for the Asgardeo Single Page Application (SPA) app
REACT_APP_CLIENT_ID=<add-asgardeo-spa-app-client-id-here>

# The base URL for the client application
# E.g., http://localhost:3000
REACT_APP_CLIENT_BASE_URL=<add-client-app-base-url-here>

# The base URL for the Asgardeo organization's API
# E.g., https://api.asgardeo.io/t/your-org
REACT_APP_ASGARDEO_BASE_URL=<add-asgardeo-org-base-url-here>
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
