## Description

This plugin enables the ability to manage artifacts in [npm](https://www.npmjs.org/) in a Vela pipeline.

Source Code: https://github.com/go-vela/vela-npm

Registry: https://hub.docker.com/r/target/vela-npm

## Usage

> **NOTE:**
>
> Users should refrain from using latest as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

Sample of publishing package:

```yaml
steps:
  - name: npm_publish
    image: target/vela-npm:latest
    pull: not_present
    secrets: [ npm_password ]
    parameters:
      username: npmUsername
      registry: https://registry.npmjs.org
```

Sample of publishing if registry does not support `npm ping`:

> **NOTE:**
>
> Recommended if you are deploying to a registry inside ***Artifactory***

```diff
steps:
  - name: npm_publish
    image: target/vela-npm:latest
    pull: not_present
    secrets: [ npm_password ]
    parameters:
      username: npmUsername
      registry: https://registry.npmjs.org
+     skip_ping: true
```

Sample of pretending to publish package:

```diff
steps:
  - name: npm_publish
    image: target/vela-npm:latest
    pull: not_present
    secrets: [ npm_password ]
    parameters:
      username: npmUsername
      registry: https://registry.npmjs.org
+     dry_run: true
```

Sample of first time publishing package:

```diff
steps:
  - name: npm_publish
    image: target/vela-npm:latest
    pull: not_present
    secrets: [ npm_password ]
    parameters:
      username: npmUsername
      registry: https://registry.npmjs.org
+     first_publish: true
```

Sample of publishing with additional dist-tag:

> **NOTE:**
>
> Tags are used as an alias and cannot be valid semver

```diff
steps:
  - name: npm_publish
    image: target/vela-npm:latest
    pull: not_present
    secrets: [ npm_password ]
    parameters:
      username: npmUsername
      registry: https://registry.npmjs.org
+     tag: beta
```

Higher level of tolerance for npm audit:

```diff
steps:
  - name: npm_publish
    image: target/vela-npm:latest
    pull: not_present
    secrets: [ npm_password ]
    parameters:
      username: npmUsername
      registry: https://registry.npmjs.org
+     audit_level: critical
```

## Secrets

> **NOTE:**
>
> Users should refrain from configuring sensitive information in their pipeline in plain text.

### Internal

The plugin accepts the following `parameters` for authentication:

| Parameter  | Environment Variable Configuration    |
| ---------- | ------------------------------------- |
| `password` | `NPM_PASSWORD`, `PARAMETER_PASSWORD`  |
| `username` | `NPM_USERNAME`, `PARAMETER_USERNAME`  |
| `registry` | `NPM_REGISTRY`, `PARAMETER_REGISTRY`  |
| `email`    | `NPM_EMAIL`, `PARAMETER_EMAIL`        |

Users can use [Vela internal secrets](https://go-vela.github.io/docs/tour/secrets/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: npm_publish
    image: target/vela-npm:latest
    pull: not_present
    secrets: [ npm_password ]
    parameters:
      username: npmUsername
      registry: https://registry.npmjs.org
-     password: superSecretPassword
```


> This example will add the `secrets` to the `npm_publish` step as environment variables:
> - `NPM_PASSWORD`=value

### External


The plugin accepts the following files for authentication:

| Parameter  | Volume Configuration                                          |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `password` | `/vela/parameters/npm/password`, `/vela/secrets/npm/password`, `/vela/secrets/managed-auth/password` |
| `username` | `/vela/parameters/npm/username`, `/vela/secrets/npm/username`, `/vela/secrets/managed-auth/username` |
| `registry` | `/vela/parameters/npm/registry`, `/vela/secrets/npm/registry`                                        |
| `email`    | `/vela/parameters/npm/email`, `/vela/secrets/npm/email`                                              |

Users can use [Vela external secrets](https://go-vela.github.io/docs/concepts/pipeline/secrets/origin/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: npm_publish
    image: target/vela-npm:latest
    pull: not_present
    parameters:
      registry: https://registry.npmjs.org
-     username: npmUsername
-     password: superSecretPassword
```

## Parameters

The following parameters are used to configure the image:

| Name            | Description                                                                                                        | Required | Default                      | Environment Variables                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------- | ---------------------------------------- |
| `username`      | username for communication with npm                                                                                | `true`   | `N/A`                        | `PARAMETER_USERNAME`<br/>`NPM_USERNAME`   |
| `password`      | password for communication with npm                                                                                | `false`  | `N/A`                        | `PARAMETER_PASSWORD`<br/>`NPM_PASSWORD`   |
| `email`         | email for communication with npm                                                                                   | `false`  | `N/A`                        | `PARAMETER_EMAIL`<br/>`NPM_EMAIL`         |
| `token`         | auth token for communication with npm                                                                              | `false`  | `N/A`                        | `PARAMETER_TOKEN`<br/>`TOKEN`             |
| `registry`      | npm instance to communicate with                                                                                   | `false`  | `https://registry.npmjs.org` | `PARAMETER_REGISTRY`<br/>`NPM_REGISTRY`   |
| `audit_level`   | level at which the audit check should fail (valid options: `low`, `moderate`, `high`, `critical`, `none` to skip)  | `false`  | `none`                       | `PARAMETER_AUDIT_LEVEL`<br/>`AUDIT_LEVEL` |
| `strict_ssl`    | whether or not to do SSL key validation during communication                                                       | `false`  | `true`                       | `PARAMETER_STRICT_SSL`<br/>`STRICT_SSL`   |
| `always_auth`   | force npm to always require authentication                                                                         | `false`  | `false`                      | `PARAMETER_ALWAYS_AUTH`<br/>`ALWAYS_AUTH` |
| `skip_ping`     | whether or not to skip `npm ping` authentication command                                                           | `false`  | `false`                      | `PARAMETER_SKIP_PING`<br/>`SKIP_PING`     |
| `dry_run`       | enables pretending to perform the action                                                                           | `false`  | `false`                      | `PARAMETER_DRY_RUN`<br/>`DRY_RUN`         |
| `tag`           | publish package with given alias tag                                                                               | `false`  | `latest`                     | `PARAMETER_TAG`<br/>`TAG`                 |
| `log_level`     | set the log level for the plugin (valid options: `info`, `debug`, `trace`)                                         | `true`   | `info`                       | `PARAMETER_LOG_LEVEL`<br/>`LOG_LEVEL`     |
| `workspaces`    | publish all workspaces                                                                                             | `false`  | `false`                      | `PARAMETER_WORKSPACES`<br/>`WORKSPACES`   |
| `workspace`     | publish a specific workspace by specifying the workspace name or relative path                                     | `false`  | `N/A`                        | `PARAMETER_WORKSPACE`<br/>`WORKSPACE`     |
| `access`        | Tells the registry whether this package should be published as public or restricted. Only applies to scoped packages, which default to restricted  | `false` | `restricted` | `PARAMETER_ACCESS`<br/>`ACCESS`   |

## package.json
This is your module's manifest.  There are a few important keys that need to be set in order to publish your module

* **name** - your package name that will be checked against in the registry
* **version** - your package version that will be used to publish, it must be valid semver and unique to the registry
* **private** - this needs to be set to `false` even if you are publishing it internally.
* **publishConfig** - this should be configured to your registry location and registry parameter should match this value

For example values, see npm's [documentation](https://docs.npmjs.com/files/package.json)

## Template

COMING SOON!

## Troubleshooting

Here are the available log levels to assist in troubleshooting:
trace, debug, info, warn, error, fatal, panic
