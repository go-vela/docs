## Description

This plugin enables you generate a static website using [Hugo](https://gohugo.io/) in a pipeline.

Source Code: https://github.com/go-vela/vela-hugo

Registry: https://hub.docker.com/r/target/vela-hugo

## Usage

> **NOTE:**
>
> Users should refrain from using latest as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

Sample of building a site:

```yaml
steps:
  - name: hugo
    image: target/vela-hugo:latest
    pull: always
    parameters:
      theme_name: hugo-theme-learn
```

Sample of building a site using the `docsy` theme:

```diff
steps:
  - name: hugo
    image: target/vela-hugo:latest
    pull: always
    parameters:
-     theme_name: hugo-theme-learn
+     theme_name: docsy
```

Sample of building a site using a custom version of Hugo:

```diff
steps:
  - name: hugo
    image: target/vela-hugo:latest
    pull: always
    parameters:
      theme_name: hugo-theme-learn
+     version: 0.101.0
```

Sample of building a site using the extended `hugo` binary:

> **NOTE:** Some themes may require the extended binary for additional functionality.

```diff
steps:
  - name: hugo
    image: target/vela-hugo:latest
    pull: always
    parameters:
      theme_name: hugo-theme-learn
+     extended: true
```

Sample of using an environment to build the site differently depending on configuration:

> **NOTE:** Please see [Hugo documentation](https://gohugo.io/getting-started/configuration/) for how to configure this properly.

```diff
steps:
  - name: hugo
    image: target/vela-hugo:latest
    pull: always
    parameters:
      theme_name: hugo-theme-learn
+     environment: dev
```

Sample of using multiple themes via configuration file:

> **NOTE:** Please see [Hugo documentation](https://gohugo.io/hugo-modules/theme-components/#readout) for how to configure this properly.

```yaml
steps:
  - name: hugo
    image: target/vela-hugo:latest
    pull: always
    parameters:
      config_file: config.toml
```

## Parameters

> **NOTE:**
>
> The plugin supports reading all parameters via environment variables or files.
>
> Any values set from a file take precedence over values set from the environment.

The following parameters are used to configure the image:

| Name                | Description                                                               | Required | Default   | Environment Variables                                     |
| ------------------- | ------------------------------------------------------------------------- | -------- | --------- | --------------------------------------------------------- |
| `base_url`          | hostname (and path) to the root, e.g. http://spf13.com/                   | `false`  | `N/A`     | `PARAMETER_BASE_URL`<br/>`HUGO_BASE_URL`                   |
| `cache_directory`   | filesystem path to cache directory                                        | `false`  | `N/A`     | `PARAMETER_CACHE_DIRECTORY`<br/>`HUGO_CACHE_DIRECTORY`     |
| `content_directory` | filesystem path to content directory                                      | `false`  | `N/A`     | `PARAMETER_CONTENT_DIRECTORY`<br/>`HUGO_CONTENT_DIRECTORY` |
| `config_directory`  | filesystem path to config directory                                       | `false`  | `config`  | `PARAMETER_CONFIG_DIRECTORY`<br/>`HUGO_CONFIG_DIRECTORY`   |
| `config_file`       | config file to use from config directory (supports: `json`,`toml`,`yaml`) | `false`  | `N/A`     | `PARAMETER_CONFIG_FILE`<br/>`HUGO_CONFIG_FILE`             |
| `draft`             | include content marked as draft                                           | `false`  | `false`   | `PARAMETER_DRAFT`<br/>`HUGO_DRAFT`                         |
| `environment`       | target build environment, located in the config directory                 | `false`  | `N/A`     | `PARAMETER_ENVIRONMENT`<br/>`HUGO_ENVIRONMENT`             |
| `expired`           | include expired content                                                   | `false`  | `false`   | `PARAMETER_EXPIRED`<br/>`HUGO_EXPIRED`                     |
| `extended`          | whether to use the extended hugo binary                                   | `false`  | `false`   | `PARAMETER_EXTENDED`<br/>`HUGO_EXTENDED`                   |
| `future`            | include content with publish date in the future                           | `false`  | `false`   | `PARAMETER_FUTURE`<br/>`HUGO_FUTURE`                       |
| `layout_directory`  | filesystem path to layout directory                                       | `false`  | `N/A`     | `PARAMETER_LAYOUT_DIRECTORY`<br/>`HUGO_LAYOUT_DIRECTORY`   |
| `log_level`         | set the log level for the plugin                                          | `true`   | `info`    | `PARAMETER_LOG_LEVEL`<br/>`HUGO_LOG_LEVEL`                 |
| `output_directory`  | filesystem path to write files to                                         | `false`  | `N/A`     | `PARAMETER_OUTPUT_DIRECTORY`<br/>`HUGO_OUTPUT_DIRECTORY`   |
| `source_directory`  | filesystem path to read files relative from                               | `false`  | `N/A`     | `PARAMETER_SOURCE_DIRECTORY`<br/>`HUGO_SOURCE_DIRECTORY`   |
| `theme_name`        | theme to use from theme directory                                         | `false`  | `N/A`     | `PARAMETER_THEME_NAME`<br/>`HUGO_THEME_NAME`               |
| `theme_directory`   | filesystem path to themes directory                                       | `false`  | `themes`  | `PARAMETER_THEME_DIRECTORY`<br/>`HUGO_THEME_DIRECTORY`     |
| `version`           | the version of hugo the plugin should use                                 | `false`  | `0.101.0` | `PARAMETER_VERSION`<br/>`HUGO_VERSION`                     |

## Template

COMING SOON!

## Troubleshooting

You can start troubleshooting this plugin by tuning the level of logs being displayed:

```diff
steps:
  - name: hugo
    image: target/vela-hugo:latest
    pull: always
    parameters:
+     log_level: trace
      theme_name: hugo-theme-learn
```

Below are a list of common problems and how to solve them:
