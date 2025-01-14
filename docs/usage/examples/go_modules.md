---
title: "Go (With Modules)"
toc: true
weight: 1
description: >
  Example Go (With Modules) Pipeline
---

Example [Yaml](https://yaml.org/spec/) configuration for a project building a [Go](https://golang.org/) binary with [Go modules](https://github.com/golang/go/wiki/Modules).

## Scenario

User is looking to create a pipeline that builds an artifact on any event or branch pushed to source control.

### Steps

The following [pipeline concepts](/docs/tour/) are being used in the pipeline below:

* [Steps](/docs/tour/steps/)
  * [image](/docs/tour/image/)
  * [Environment](/docs/tour/environment/)
  * [Pull](/docs/tour/image/)
  * [Commands](/docs/tour/steps/)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

steps:
  - name: install
    image: golang:latest
    pull: always
    environment:
      CGO_ENABLED: '0'
      GOOS: linux
    commands:
      - go get ./...

  - name: test
    image: golang:latest
    pull: always
    environment:
      CGO_ENABLED: '0'
      GOOS: linux
    commands:
      - go test ./...

  - name: build
    image: golang:latest
    pull: always
    environment:
      CGO_ENABLED: '0'
      GOOS: linux
    commands:
      - go build
```

### Stages

The following [pipeline concepts](/docs/tour/) are being used in the pipeline below:

* [Stages](/docs/tour/stages/)
  * [Needs](/docs/tour/stages/)
  * [Steps](/docs/tour/steps/)
    * [image](/docs/tour/image/)
    * [Environment](/docs/tour/environment/)
    * [Pull](/docs/tour/image/)
    * [Commands](/docs/tour/steps/)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

stages:
  install:
    steps:
      - name: install
        image: golang:latest
        pull: always
        environment:
          CGO_ENABLED: '0'
          GOOS: linux
        commands:
          - go get ./...

  test:
    needs: [ install ]
    steps:
      - name: test
        image: golang:latest
        pull: always
        environment:
          CGO_ENABLED: '0'
          GOOS: linux
        commands:
          - go test ./...

  build:
    needs: [ install ]
    steps:
      - name: build
        image: golang:latest
        pull: always
        environment:
          CGO_ENABLED: '0'
          GOOS: linux
        commands:
          - go build
```