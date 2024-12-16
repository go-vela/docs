---
sidebar_position: 2
---

# Docker

## Prerequisites

This section provides all required dependencies to install and start the worker with Docker.

### Dependency 1: Docker

[Docker](https://docs.docker.com/) will be used for downloading the worker and managing the lifecycle of the application.

You can refer to [Docker's official documentation](https://docs.docker.com/get-docker/) on installing and configuring the service.

### Dependency 2: Redis

[Redis](https://redis.io/) will be used for storing workloads, created by the [server](/docs/installation/server/server.md), that will be run by a worker.

You can refer to [Redis's official documentation](https://redis.io/topics/quickstart/) on installing and configuring the service.

## Installation

This section provides an example of installing the worker with Docker.

This example only shows a subset of all possible configuration options.

### Step 1: Download the Image

Download the [Docker image](https://docs.docker.com/get-started/overview/#images) for the Vela worker from [DockerHub](https://hub.docker.com/).

You can use the [`docker pull` command](https://docs.docker.com/engine/reference/commandline/pull/) to download the image:

```shell
$ docker pull target/vela-worker:latest
```

:::info
The `latest` tag will ensure you install the most-recent version of the Vela worker.

To see the full list of available versions, please refer to [the official registry](https://hub.docker.com/r/target/vela-worker).
:::

### Step 2: Determine Worker Authentication and Start Worker

Currently, Vela supports two methods of maintaining authentication between the worker and the server. 

Take care to read through both options to determine which setup makes the most sense for your installation:

##### Worker-Server Trusted Symmetric Token

This authentication method involves using the same secret generated as the `VELA_SECRET` during the [server installation](/docs/installation/server/docker/#step-3-create-a-shared-secret) as the bearer token for all API requests related to check-in and build tokens from the worker to the server.

The token is non-expiring and exists within the container environment. Once the server is running, all that is necessary for a worker to connect to the server and pull builds from the queue is simply starting the worker container:

```shell
$ docker run \
  --detach=true \
  --env=VELA_QUEUE_DRIVER=redis \
  --env=VELA_SERVER_ADDR=https://vela-server.example.com \
  --env=VELA_SERVER_SECRET=<shared-secret> \
  --env=VELA_WORKER_ADDR=https://vela-worker.example.com \
  --name=worker \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  target/vela-worker:latest
```

The worker must still pass its check-in with the server in order to pull builds from the queue.

##### Worker Registration and Auth Refresh

This authentication method is the more secure of the two options. Rather than using a non-expiring token in the container environment, platform administrators can register workers using their credentials via the Vela CLI. In order to leverage this method, simply do NOT supply the [`VELA_SECRET`](/docs/installation/server/reference/#vela_secret) to the server and do NOT supply the [`VELA_SERVER_SECRET`](/docs/installation/worker/reference/#vela_server_secret) to the worker. 

To start, launch the worker container:

```shell
$ docker run \
  --detach=true \
  --env=VELA_QUEUE_DRIVER=redis \
  --env=VELA_SERVER_ADDR=https://vela-server.example.com \
  --env=VELA_WORKER_ADDR=https://vela-worker.example.com \
  --name=worker \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  target/vela-worker:latest
```

Once the worker has started, it will be in a paused state until a platform admin registers the worker:

```shell
$ vela login --api.addr https://vela-server.example.com

$ vela add worker --worker.hostname vela-worker --worker.address https://vela-worker.example.com

worker registered successfully
```

This process involves the generation of a registration token, which can only be done by platform admins. The quickly expiring registration token is then passed to the worker using an http request to the worker's `/register` endpoint. The worker exchanges this registration token with the server for an auth token. 

:::info
IMPORTANT: When using this method, ensure that the [`VELA_WORKER_AUTH_TOKEN_DURATION`](/docs/installation/server/reference/#vela_worker_auth_token_duration) configured in the server is _longer_ than the [`VELA_CHECK_IN`](/docs/installation/worker/reference/#vela_check_in) configured in the worker. This ensures that all requests made by the worker are done with a valid token, refreshed at each check-in.
:::

Once registered, the worker will continue refreshing its authentication token at the specified check in interval. Workers that lose their connection to the server for long enough for their existing auth
token to expire will need to be re-registered.

### Step 3: Verify the Worker Logs

Ensure the worker started up successfully and is running as expected by inspecting the logs.

You can use the [`docker logs` command](https://docs.docker.com/engine/reference/commandline/logs/) to verify the logs:

```shell
$ docker logs worker
```
