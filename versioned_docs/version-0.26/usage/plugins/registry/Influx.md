## Description

This plugin enables you to send data to an [InfluxDB](https://www.influxdata.com/) in a pipeline.

Source Code: https://github.com/go-vela/vela-influx

Registry: https://hub.docker.com/r/target/vela-influx

## Usage

> **NOTE:**
>
> Users should refrain from using latest as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

Sample of emitting a pass/fail build metric:

```yaml
steps:
  - name: write
    image: target/vela-influx:latest
    pull: always
    parameters:
      addr: https://influx.example.com
      database: vela
      name: build_report
      fields:
        build_status: ${VELA_BUILD_STATUS}
```

Sample of emitting a pass/fail build metric with custom tags:

```diff
steps:
  - name: write
    image: target/vela-influx:latest
    pull: always
    parameters:
      addr: https://influx.example.com
      database: vela
      name: build_report
      fields:
        build_status: ${BUILD_STATUS}
+     tags:
+       repo_name: ${VELA_REPO_FULL_NAME}
+       build_number: "${VELA_BUILD_NUMBER}"
```

## Secrets

> **NOTE:** Users should refrain from configuring sensitive information in your pipeline in plain text.

### Internal

The plugin accepts the following `parameters` for authentication:

| Parameter  | Environment Variable Configuration      |
| ---------- | --------------------------------------- |
| `password` | `PARAMETER_PASSWORD`, `INFLUX_PASSWORD` |
| `username` | `PARAMETER_USERNAME`, `INFLUX_USERNAME` |

Users can use [Vela internal secrets](https://go-vela.github.io/docs/tour/secrets/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: write
    image: target/vela-influx:latest
    pull: always
+   secrets: [ influx_username, influx_password ]
    parameters:
-     username: superSecretUsername
-     password: superSecretPassword
      addr: https://influx.example.com
      database: vela
      name: build_report
      fields:
        build_status: ${VELA_BUILD_STATUS}
```

> This example will add the secret to the `trigger_hello-world` step as environment variables:
>
> * `DOWNSTREAM_TOKEN=<value>`

### External

The plugin accepts the following files for authentication:

| Parameter  | Volume Configuration                                                |
| ---------- | ------------------------------------------------------------------- |
| `password` | `/vela/parameters/influx/password`, `/vela/secrets/influx/password` |
| `username` | `/vela/parameters/influx/username`, `/vela/secrets/influx/username` |

Users can use [Vela external secrets](https://go-vela.github.io/docs/concepts/pipeline/secrets/origin/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: write
    image: target/vela-influx:latest
    pull: always
    parameters:
-     username: superSecretUsername
-     password: superSecretPassword
      addr: https://influx.example.com
      database: vela
      name: build_report
      fields:
        build_status: ${VELA_BUILD_STATUS}
```

> This example will read the secret value in the volume stored at `/vela/secrets/`

## Parameters

> **NOTE:**
>
> The plugin supports reading all parameters via environment variables or files.
>
> Any values set from a file take precedence over values set from the environment.

The following parameters are used to configure the image:

| Name        | Description                                          | Required | Default         | Environment Variables                       |
| ----------- | ---------------------------------------------------- | -------- | --------------- | ------------------------------------------- |
| `addr`      | Influx instance to communicate with                  | `true`   | `N/A`           | `PARAMETER_ADDR`<br/>`INFLUX_ADDR`           |
| `database`  | database name on Influx instance to communicate with | `true`   | `N/A`           | `PARAMETER_DATABASE`<br/>`INFLUX_DATABASE`   |
| `fields`    | data fields to send along with the metric            | `true`   | `N/A`           | `PARAMETER_FIELDS`<br/>`INFLUX_FIELDS`       |
| `log_level` | set the log level for the plugin                     | `true`   | `info`          | `PARAMETER_LOG_LEVEL`<br/>`INFLUX_LOG_LEVEL` |
| `name`      | name of metric sent to database on Influx instance   | `true`   | `build_metrics` | `PARAMETER_NAME`<br/>`INFLUX_NAME`           |
| `password`  | password for communication with Influx               | `false`  | `N/A`           | `PARAMETER_PASSWORD`<br/>`INFLUX_PASSWORD`   |
| `tags`      | extra metadata to send along with the metric         | `false`  | `N/A`           | `PARAMETER_TAGS`<br/>`INFLUX_TAGS`           |
| `username`  | user name for communication with Influx              | `false`  | `N/A`           | `PARAMETER_USERNAME`<br/>`INFLUX_USERNAME`   |

## Template

COMING SOON!

## Troubleshooting

You can start troubleshooting this plugin by tuning the level of logs being displayed:

```diff
steps:
  - name: write
    image: target/vela-influx:latest
    pull: always
    parameters:
+     log_level: trace
      addr: https://influx.example.com
      database: vela
      name: build_report
      fields:
        build_status: ${VELA_BUILD_STATUS}
```

Below are a list of common problems and how to solve them:
