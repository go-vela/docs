## Description

This plugin enables you to provide a summary of a build in a pipeline.

Source Code: https://github.com/go-vela/vela-build-summary

Registry: https://hub.docker.com/r/target/vela-build-summary

## Usage

> **NOTE:**
>
> Users should refrain from using latest as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

Sample of outputting a summary for the current build:

```yaml
steps:
  - name: build-summary
    image: target/vela-build-summary:latest
    pull: always
    secrets: [ build_summary_token ]
```

Sample of outputting a summary for an existing build:

```diff
steps:
  - name: build-summary
    image: target/vela-build-summary:latest
    pull: always
    secrets: [ build_summary_token ]
    parameters:
+     number: 1
```

Sample of outputting a summary for an existing build in a different repo:

```diff
steps:
  - name: build-summary
    image: target/vela-build-summary:latest
    pull: always
    secrets: [ build_summary_token ]
    parameters:
      number: 1
+     org: octocat
+     repo: hello-world
```

## Secrets

> **NOTE:** Users should refrain from configuring sensitive information in your pipeline in plain text.

### Internal

The plugin accepts the following `parameters` for authentication:

| Parameter | Environment Variable Configuration                                    |
| --------- | --------------------------------------------------------------------- |
| `token`   | `PARAMETER_TOKEN`, `BUILD_SUMMARY_TOKEN` |

Users can use [Vela internal secrets](https://go-vela.github.io/docs/tour/secrets/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: build-summary
    image: target/vela-build-summary:latest
    pull: always
+   secrets: [ build_summary_token ]
-   parameters:
-     token: superSecretToken
```

> This example will add the secret to the `build-summary` step as an environment variable:
>
> * `BUILD_SUMMARY_TOKEN=<value>`

### External

The plugin accepts the following files for authentication:

| Parameter | Volume Configuration                                                        |
| --------- | --------------------------------------------------------------------------- |
| `token`   | `/vela/parameters/build-summary/token`, `/vela/secrets/build-summary/token` |

Users can use [Vela external secrets](https://go-vela.github.io/docs/concepts/pipeline/secrets/origin/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: build-summary
    image: target/vela-build-summary:latest
    pull: always
-   parameters:
-     token: superSecretToken
```

> This example will read the secret values in the volume stored at `/vela/secrets/`

## Parameters

> **NOTE:**
>
> The plugin supports reading all parameters via environment variables or files.
>
> Any values set from a file take precedence over values set from the environment.

The following parameters are used to configure the image:

| Name        | Description                             | Required | Default           | Environment Variables                                               |
| ----------- | --------------------------------------- | -------- | ----------------- | ------------------------------------------------------------------- |
| `log_level` | set the log level for the plugin        | `true`   | `info`            | `PARAMETER_LOG_LEVEL`<br/>`BUILD_SUMMARY_LOG_LEVEL`                  |
| `number`    | set the number for the build            | `true`   | **set by Vela**   | `PARAMETER_NUMBER`<br/>`BUILD_SUMMARY_NUMBER`<br/>`VELA_BUILD_NUMBER` |
| `org`       | set the organization name for the build | `true`   | **set by Vela**   | `PARAMETER_ORG`<br/>`BUILD_SUMMARY_ORG`<br/>`VELA_REPO_ORG`           |
| `repo`      | set the repository name for the build   | `true`   | **set by Vela**   | `PARAMETER_REPO`<br/>`BUILD_SUMMARY_REPO`<br/>`VELA_REPO_NAME`        |
| `server`    | Vela server to communicate with         | `true`   | **set by Vela**   | `PARAMETER_SERVER`<br/>`BUILD_SUMMARY_SERVER`<br/>`VELA_ADDR`         |
| `token`     | token for communication with Vela       | `true`   | **set by Vela**   | `PARAMETER_TOKEN`<br/>`BUILD_SUMMARY_TOKEN`<br/>`VELA_NETRC_PASSWORD` |
## Template

COMING SOON!

## Troubleshooting

You can start troubleshooting this plugin by tuning the level of logs being displayed:

```diff
steps:
  - name: build-summary
    image: target/vela-build-summary:latest
    pull: always
    secrets: [ build_summary_token ]
+   parameters:
+     log_level: trace
```

Below are a list of common problems and how to solve them: