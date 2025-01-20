---
title: "Internal Secrets"
toc: true
weight: 1
description: >
  Example Pipeline with internal secrets
---

Example [Yaml](https://yaml.org/spec/) configuration for a project requiring a secrets to be used within a step

## Scenario

User is looking to create a pipeline that can inject configuration that can not be placed into a Yaml file. A simple example would be producing a Docker image with username and password.

:::tip
It is assumed you have created secrets `docker_username` and `docker_password` in the web interface or [CLI](/docs/usage/tour/).
:::

:::warning
Internal secrets do NOT have the `pull_request` event enabled by default. This is intentional to help mitigate exposure via a pull request against the repo. You can override this behavior, at your own risk, for each secret.
:::

The examples show a pipeline using repo secrets. Vela contains three secret types: repo, org, and shared. Please see the [secret concepts](docs/usage/tour/secrets.md) documentation.

### Steps

The following [pipeline concepts](/docs/usage/tour/) are being used in the pipeline below:

* [Steps](docs/usage/tour/steps.md)
  * [Image](docs/usage/tour/image.md)
  * [Pull](docs/usage/tour/image.md)
  * [Secrets](docs/usage/tour/secrets.md)
  * [Parameters](docs/usage/tour/plugins.md)
* [Secrets](docs/usage/tour/secrets.md)

The following [Vela plugins](/docs/usage/tour/) are being used in the pipeline below:

* [Docker](/docs/usage/tour/)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

steps:
  - name: publish hello world
    image: target/vela-docker:latest
    pull: always
    secrets: [ docker_username, docker_password ]
    parameters:
      registry: index.docker.io
      repo: index.docker.io/vela/hello-world


secrets:
  - name: docker_username
    key: vela/hello-world/docker_username
    engine: native
    type: repo

  - name: docker_password
    key: vela/hello-world/docker_password
    engine: native
    type: repo
```

### Stages

The following [pipeline concepts](/docs/usage/tour/) are being used in the pipeline below:

* [Stages](docs/usage/tour/stages.md)
  * [Steps](docs/usage/tour/steps.md)
  * [Image](docs/usage/tour/image.md)
  * [Pull](docs/usage/tour/image.md)
  * [Secrets](docs/usage/tour/secrets.md)
  * [Parameters](docs/usage/tour/plugins.md)
* [Secrets](docs/usage/tour/secrets.md)

The following [Vela plugins](/docs/usage/tour/) are being used in the pipeline below:

* [Docker](/docs/usage/tour/)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

stages:
  docker:
    steps:
      - name: publish hello world
        image: target/vela-docker:latest
        pull: always
        secrets: [ docker_username, docker_password ]
        parameters:
          registry: index.docker.io
          repo: index.docker.io/vela/hello-world

secrets:
  - name: docker_username
    key: vela/hello-world/docker_username
    engine: native
    type: repo

  - name: docker_password
    key: vela/hello-world/docker_password
    engine: native
    type: repo
```
