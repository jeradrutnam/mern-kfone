<p align="center" style="color: #343a40">
  <h1 align="center">Kfone MERN Sample</h1>
</p>
<p align="center" style="font-size: 1.2rem;">Asgardeo - Kfone MERN sample.</p>

### Apps & Services

- `apps`
  - `client`: The client application for the Kfone MERN sample. [https://kfone.vercel.app](https://kfone.vercel.app/)
  - `admin`: The admin application for the Kfone MERN sample.
    [https://kfone-admin.vercel.app](https://kfone-admin.vercel.app/)
- `server`: The Node.js server for the Kfone MERN sample. [https://kfone-api.vercel.app](https://kfone-api.vercel.app/)

## 🚀 Getting Started

1. Clone the repository.

```bash
git clone https://github.com/jeradrutnam/mern-kfone.git
```

2. Install the dependencies.

```bash
npm install
```

3. Build the repository.

```bash
npm run build
```

## Overview

There are 3 standalone applications.

1. Kfone Client 

This is the web application which customers of Kfone would use to access their services.

Located at `apps/client`.

This is developed with ReactJS.

2. Kfone Admin

This is the web application which employees of Kfone would use to access management application. Customers do not have access to this application. Different employees can perform various administratice tasks such as adding products/services, adding promotions, managing customers etc. based on their user group.

Located at `apps/admin`.

This is developed with ReactJS.

3. Kfone API

This is the backend application from which the APIs to manage the resources are hosted. There are APIs related to devices, services, promotions and users. Connected to a MongoDB database at the data layer.

Located at `server`.

This is developed with NodeJS and Express VPN.

---


## Project Structure

```bash
.
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── apps
│   ├── admin
│   │   ├── README.md
│   │   ├── node_modules
│   │   ├── package.json
│   │   ├── public
│   │   ├── src
│   │   └── test-configs
│   └── client
│       ├── README.md
│       ├── node_modules
│       ├── package.json
│       ├── public
│       ├── src
│       └── test-configs
├── node_modules
├── package-lock.json
├── package.json
├── resources
├── server
│   ├── Dockerfile
│   ├── README.md
│   ├── node_modules
│   ├── package.json
│   ├── src
│   │   ├── controllers
│   │   ├── index.js
│   │   ├── middlewares
│   │   ├── models
│   │   └── routes
│   └── vercel.json
└── turbo.json
```

## Contributing

Want to report a bug, contribute some code, or improve the documentation?

Excellent! Read up on our [guidelines for contributing](./CONTRIBUTING.md) to get started.

## License

Licenses this source under the Apache License, Version 2.0 [LICENSE](./LICENSE), You may not use this file except in
compliance with the License.
