---
title: "External Secrets"
toc: true
weight: 1
description: >
  Example pipeline with external secrets
---

Example [Yaml](https://yaml.org/spec/) configuration for a project requiring a secrets to be used within a step

## Scenario

User is looking to create a pipeline that can integrate with a private Vault to inject secrets that can not be used with pushing a Docker image to a registry.

:::tip
It is assumed you have created secret `vault_token` in the web interface or [CLI](/docs/reference/cli/).
:::

The examples show a pipeline using repository secrets. Vela contains three secret types: repository, organization, and shared. For examples on organization and shared, please see the [secret concepts](/docs/tour/secrets/) documentation.

### Steps

The following [pipeline concepts](/docs/tour/) are being used in the pipeline below:

* [Steps](/docs/tour/steps/)
  * [Image](/docs/tour/image/)
  * [Pull](/docs/tour/image/)
  * [Secrets](/docs/tour/secrets/)
  * [Parameters](/docs/tour/plugins/)
* [Secrets](/docs/tour/secrets/)

The following [Vela plugins](/docs/tour/) are being used in the pipeline below:

* [Docker](/docs/plugins/registry/pipeline/docker/)

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
    parameters:
      registry: index.docker.io
      repo: index.docker.io/vela/hello-world


secrets:
  # Note here how this pipeline uses an internal secret vault_token
  # in the origin secret below to get additional secrets from an
  # external service.
  - name: vault_token
    key: go-vela/vault_token
    engine: native
    type: org

  - origin:
      name: private vault
      image: target/secret-vault:latest
      pull: always
      secrets: [ vault_token ]
      parameters:
        addr: vault.example.com
        auth_method: token
        username: octocat
        items:
          - source: secret/docker
            path: docker
```

### Stages

The following [pipeline concepts](/docs/tour) are being used in the pipeline below:

* [Stages](/docs/tour/stages/)
  * [Steps](/docs/tour/steps/)
  * [Image](/docs/tour/image/)
  * [Pull](/docs/tour/image/)
  * [Secrets](/docs/tour/secrets/)
  * [Parameters](/docs/tour/plugins/)
* [Secrets](/docs/tour/secrets/)

The following [Vela plugins](/docs/tour/) are being used in the pipeline below:

* [Docker](/docs/plugins/registry/pipeline/docker/)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

worker:
  runtime: docker

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
  - name: vault_token
    key: go-vela/vault_token
    engine: native
    type: org

  - origin:
      name: private vault
      image: target/secret-vault:latest
      pull: always
      secrets: [ vault_token ]
      parameters:
        addr: vault.example.com
        auth_method: token
        username: octocat
        items:
          - source: secret/docker
            path: docker
```
