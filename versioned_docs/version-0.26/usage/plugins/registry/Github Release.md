## Description

This plugin enables the ability to manage GitHub releases [GitHub CLI](https://cli.github.com/manual/) in a Vela pipeline.

Source Code: https://github.com/go-vela/vela-github-release

Registry: https://hub.docker.com/r/target/vela-github-release

## Usage

> **NOTE:**
>
> Users should refrain from using **latest** as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

Sample of creating a GitHub release:

```yaml
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: create
      files: [ gh/common, gh/dev/deploy.yml ]
      tag: v0.1.0
```

Sample of creating a GitHub release, attaching all `.pdf` files in the current directory:

```yaml
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: create
      files: [ "*.pdf" ]
      tag: v0.1.0
```

> [!IMPORTANT]
> This uses [Go's implementation of glob patterns](https://pkg.go.dev/path/filepath#Match)

Sample of deleting release files:

```yaml
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: delete
      tag: v0.1.0
```

Sample of downloading assets from a release in a project:

```yaml
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: download
      tag: v0.1.0
```

Sample of listing releases in a repository:

```yaml
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: list
```

Sample of uploading assets to a gh release:

```yaml
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: upload
      files: [ changelog.md ]
      tag: v0.1.0
```

Sample of uploading assets using glob pattern to a gh release:

```yaml
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: upload
      files: [ "*.pdf" ]
      tag: v0.1.0
```

> [!IMPORTANT]
> This uses [Go's implementation of glob patterns](https://pkg.go.dev/path/filepath#Match)

Sample of viewing information about a gh release:

```yaml
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: view
      tag: v0.1.0
```

## Secrets

> **NOTE:** Users should refrain from configuring sensitive information in your pipeline in plain text.

### Internal

The plugin accepts the following `parameters` for authentication:

| Parameter | Environment Variable Configuration                             |
| ----------| -------------------------------------------------------------- |
| `token`   | `PARAMETER_TOKEN`, `CONFIG_TOKEN`, `GH_TOKEN`, `GITHUB_TOKEN`  |

Users can use [Vela internal secrets](https://go-vela.github.io/docs/concepts/pipeline/secrets/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
+   secrets: [github_token]
    parameters:
      action: create
      files: [ gh/common, gh/dev/deploy.yml ]
```

> This example will add the secrets to the `gh` step as environment variables:
>
> * `GITHUB_TOKEN=<value>`

### External

The plugin accepts the following files for authentication:

| Parameter  | Volume Configuration                                                                        |
| ---------- | ------------------------------------------------------------------------------------------- |
| `token`    | `/vela/parameters/github-release/config/token`, `/vela/secrets/github-release/config/token` |

Users can use [Vela external secrets](https://go-vela.github.io/docs/concepts/pipeline/secrets/origin/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: gh
    image: target/vela-github-release:latest
    pull: always
+   secrets: [github_token]
    parameters:
      config:
-       github_token: somepersonalaccesstoken
```

> This example will read the secret value in the volume stored at `/vela/secrets/`

## Parameters

> **NOTE:**
>
> The plugin supports reading all parameters via environment variables or files.
>
> VELA environments can be found at [VELA Environments](https://go-vela.github.io/docs/reference/environment/)
>
> Any values set from a file take precedence over values set from the environment.

The following parameters are used to configure the image:

| Name        | Description                                      | Required | Default      | Environment Variables                                                   |
| ----------- | ------------------------------------------------ | -------- | ------------ | ----------------------------------------------------------------------- |
| `action`    | action to perform against gh                     | `true`   | `N/A`        | `PARAMETER_ACTION`<br/>`CONFIG_ACTION`                                   |
| `hostname`  | hostname to set for GitHub instance              | `true`   | `github.com` | `PARAMETER_HOSTNAME`<br/>`GH_HOST`<br/>`GITHUB_HOST`                      |
| `token`     | token to set to authenticate to GitHub instance  | `true`   | `N/A`        | `PARAMETER_TOKEN`<br/>`CONFIG_TOKEN`<br/>`GH_TOKEN`<br/>`GITHUB_TOKEN`     |
| `log_level` | set the log level for the plugin                 | `true`   | `info`       | `PARAMETER_LOG_LEVEL`<br/>`VELA_LOG_LEVEL`<br/>`GITHUB_RELEASE_LOG_LEVEL` |
| `version`   | version of the `gh` CLI to install               | `false`  | `v2.14.4`     | `PARAMETER_VERSION`<br/>`VELA_GH_VERSION`<br/>`GH_VERSION`                |

#### Create

The following parameters are used to configure the `create` action:

| Name         | Description                                          | Required | Default | Environment Variables                          |
| ------------ | ---------------------------------------------------- | -------- | ------- | ---------------------------------------------- |
| `draft`      | save the release as a draft instead of publishing it | `false`  | `false` | `PARAMETER_DRAFT`<br/>`CREATE_DRAFT`            |
| `notes`      | create release notes                                 | `false`  | `N/A`   | `PARAMETER_NOTES`<br/>`CREATE_NOTES`            |
| `notes_file` | read release notes from file                         | `false`  | `N/A`   | `PARAMETER_NOTES_FILE`<br/>`CREATE_NOTES_FILE`  |
| `files`      | file(s) name used to create                          | `false`  | `N/A`   | `PARAMETER_FILES`<br/>`GITHUB_RELEASE_FILES`    |
| `prerelease` | mark the release as a prerelease                     | `false`  | `false` | `PARAMETER_PRERELEASE`<br/>`CREATE_PRERELEASE`  |
| `tag`        | github tag name to create                            | `true`   | `N/A`   | `PARAMETER_TAG`<br/>`GITHUB_RELEASE_TAG`        |
| `target`     | target branch or commit SHA                          | `true`   | `main`  | `PARAMETER_TARGET`<br/>`CREATE_TARGET`          |
| `title`      | Release title                                        | `false`  | `N/A`   | `PARAMETER_TITLE`<br/>`CREATE_TITLE`            |

#### Delete

The following parameters are used to configure the `delete` action:

| Name      | Description                            | Required | Default | Environment Variables                     |
| --------- | -------------------------------------- | -------- | ------- | ----------------------------------------- |
| `yes`     | skip the delete confirmation prompt    | `false`  | `false` | `PARAMETER_YES`<br/>`DELETE_YES`           |
| `tag`     | github tag name to delete              | `true`   | `N/A`   | `PARAMETER_TAG`<br/>`GITHUB_RELEASE_TAG`   |

#### Download

The following parameters are used to configure the `download` action:

| Name        | Description                                   | Required | Default | Environment Variables                         |
| ----------- | --------------------------------------------- | -------- | ------- | --------------------------------------------- |
| `directory` | the directory to download files               | `true`   | `"."`   | `PARAMETER_DIR`<br/>`DOWNLOAD_DIR`             |
| `patterns`  | download only assets that match glob patterns | `false`  | `N/A`   | `PARAMETER_PATTERNS`<br/>`DOWNLOAD_PATTERNS`   |
| `tag`       | github tag name to download                   | `true`   | `N/A`   | `PARAMETER_TAG`<br/>`GITHUB_RELEASE_TAG`       |

#### List

The following parameters are used to configure the `list` action:

| Name       | Description                                      | Required | Default | Environment Variables                         |
| ---------- | ------------------------------------------------ | -------- | ------- | --------------------------------------------- |
| `limit` | maximum number of items to fetch for list action  | `true`   | `30` | `PARAMETER_LIMIT`<br/>`LIST_LIMIT` |

#### Upload

The following parameters are used to configure the `upload` action:

| Name      | Description                                 | Required | Default | Environment Variables                         |
| --------- | ------------------------------------------- | -------- | ------- | --------------------------------------------- |
| `clobber` | overwrite existing assets of the same name  | `false`  | `false` | `PARAMETER_CLOBBER`<br/>`UPLOAD_CLOBBER`       |
| `files`   | file(s) name used to upload                 | `true`   | `N/A`   | `PARAMETER_FILES`<br/>`GITHUB_RELEASE_FILES`   |
| `tag`     | github tag name to upload                   | `true`   | `N/A`   | `PARAMETER_TAG`<br/>`GITHUB_RELEASE_TAG`       |

#### View

The following parameters are used to configure the `view` action:

| Name    | Description                       | Required | Default | Environment Variables                    |
| ------- | --------------------------------- | -------- | ------- | ---------------------------------------- |
| `tag`   | github tag name to view           | `true`   | `N/A`   | `PARAMETER_TAG`<br/>`GITHUB_RELEASE_TAG`  |
| `web`   | open the release in the browser   | `true`   | `false` | `PARAMETER_WEB`<br/>`VIEW_WEB`            |


## Troubleshooting

You can start troubleshooting this plugin by tuning the level of logs being displayed:

```diff
steps:
  - name: github-release
    image: target/vela-github-release:latest
    pull: always
    parameters:
      action: create
      files: [ gh/common, gh/dev/deploy.yml ]
+     log_level: trace
```
