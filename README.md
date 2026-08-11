# Flightline Central Server
This repository contains the source code for the software that powers the backend of the central server.

## Installation & Setup
### Prerequisites
- MySQL >=8.0.28
- Node >=24.7
- npm >=11.5.1

### Step 1
Clone the repository
```
git clone https://github.com/supraaxdd/flightline-central-server.git
```

Change to the project directory
```
cd flightline-central-server
```

Checkout to the dev branch for the most recent in development build
```
git checkout dev
```

### Step 2
Prepare a `.env` file in the root directory of the project. Copy the `.env.example` and rename it to `.env`.

It will show the following:

```
PORT=
HOST=
DB_USER=
PASSWORD=
DATABASE=
```

Populate the fields with the following information:
- `PORT`: the port on which the server is to be listening on. By default it is 3000.
- `HOST`: the host on which the MySQL server resides.
- `DB_USER`: the username of the database user.
- `PASSWORD`: the password for the database user.
- `DATABASE`: the database to connect to.

### Step 3
Install all the dependencies using
```
npm ci
```

### Step 4
Run the server using
```
npm start
```

## Documentation

- [API Endpoints & Errors](docs/ENDPOINTS.md) — route reference with success and error responses

## Contributors
- supraaxdd
- Blinkzy
- Lapis

