---
title: "Services"
linkTitle: "Services"
weight: 5
description: >
  YAML keys for services block
---

The `services` key is intended to be used to run applications alongside the pipeline.

```yaml
---
# This document is displaying all the required keys
# to run a postgres database for the duration of a pipeline.
services: 
  - name: postgres
    image: postgres:latest
```

## Keys

| Key           | Required | Type            | Description                                                     |
|---------------|----------|-----------------|-----------------------------------------------------------------|
| `name`        | Y        | string          | Unique identifier for the container in the pipeline             |
| `image`       | Y        | string          | Docker image used to create an ephemeral container              |
| `pull`        | N        | string          | Declaration to configure if and when the Docker image is pulled |
| `environment` | N        | map || []string | Variables to inject into the container environment              |
| `entrypoint`  | N        | []string        | Commands to execute inside the container                        |
| `ports`       | N        | string          | List of ports to map for the container in the pipeline          |
| `ulimits`     | N        | []string        | Set the user limits for the container                           |
| `user`        | N        | string          | Set the user for the container. |

### Usage

#### The `name:` key

```yaml
---
services: 
    # Unique identifier for the container in the pipeline.
  - name: postgres
```

#### The `image:` key

```yaml
---
services: 
    # Docker image used to create ephemeral container.
  - image: postgres:latest
```

#### The `pull:` key

```yaml
---
services: 
    # Declaration to configure if and when the Docker image is pulled.
    # By default, the compiler will inject pull but accepts the 
    # following values: always, never, no_present, on_start, 
  - pull: always
```

#### The `environment:` key

```yaml
---
services: 
    # Variables to injected into the container environment
    # using a map style syntax.
  - environment:
      DB_NAME: vela
```

```yaml
---
services: 
    # Variables to injected into the container environment
    # using an array style syntax.
  - environment:
      - DB_NAME=vela
```

#### The `entrypoint:` key

```yaml
---
services: 
    # Commands to execute inside the container.
  - entrypoint:
      - some/path/sql-init.sql
      - /some/binary/postgres
```

#### The `ports:` key

```yaml
---
services: 
    # List of ports to map for the container in the pipeline.
  - ports: 
      - "8080:5432"
```

#### The `ulimits:` key

```yaml
---
services:
    # Set the user limits for the container.
  - ulimits:
      - name: foo
        soft: 1024
      - name: bar
        soft: 1024
        hard: 2048
```

#### The `user:` key

```yaml
---
services:
    # Run the container with the foo user.
  - user: foo
```
