# NestJS Test App

## Requirements

The initial quote must be obtained from the Binance exchange API.

```
https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker
```

After obtaining the price, it is necessary to apply a 0.01% service commission to the bid and ask, and calculate the mid price. These values should be returned by the microservice via an HTTP request.

The price needs to be updated every 10 seconds.

The update frequency, service commission, and HTTP port should be configurable through environment variables. The project should include a Dockerfile to run the application.

## Usage

```sh
$ cp .env.example .env
$ docker compose up -d --build
```

> Swagger is available for this app at `/api`
