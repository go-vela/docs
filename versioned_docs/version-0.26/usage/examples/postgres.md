---
title: "Postgres"
toc: true
weight: 1
description: >
  Example Pipeline with Postgres
---

Example [YAML](https://yaml.org/spec/) configuration for a project requiring a [Postgres](https://www.postgresql.org/) as a pipeline dependency.

## Scenario

User is looking to create a pipeline that can integrate with an ephemeral Postgres instance.

### Services

Services YAML block can be used with stages and steps pipelines. This example uses a basic steps configuration.

The following [pipeline concepts](/docs/usage/tour/tour.md) are being used in the pipeline below:

* [Services](docs/usage/tour/services.md)
  * [Image](docs/usage/tour/image.md)
* [Steps](docs/usage/tour/steps.md)
  * [Image](docs/usage/tour/image.md)
  * [Pull](docs/usage/tour/image.md)
  * [Commands](docs/usage/tour/steps.md)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```diff
version: "1"
services:
  - name: postgres
    image: postgres:latest
    pull: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: vela

steps:
  - name: check status
    image: postgres:latest
    pull: always
    environment:
      PGPASSWORD=password
    commands:
      # sleeping can help ensure the service adequate time to start
      - sleep 15
      - psql -U admin -d vela -h postgres -p 5432
```

### Detach

If you're looking for more granular start time for the container you can add a detach flag within stages and steps pipelines.

The following [pipeline concepts](/docs/usage/tour/tour.md) are being used in the pipeline below:

* [Steps](docs/usage/tour/steps.md)
  * [Image](docs/usage/tour/image.md)
  * [Pull](docs/usage/tour/image.md)
  * [Commands](docs/usage/tour/steps.md)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```diff
version: "1"

steps:
  - name: postgres
    image: postgres:latest
    pull: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: vela    
    detach: true

  - name: check status
    image: postgres:latest
    pull: always
    environment:
      PGPASSWORD=password
    commands:
      # sleeping can help ensure the service adequate time to start
      - sleep 15
      - psql -U admin -d vela -h postgres -p 5432
```
