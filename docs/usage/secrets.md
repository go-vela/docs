---
title: "Secrets"
linkTitle: "Secrets"
description: >
  Learn about internal Vela secrets.
---

This page will primarily focus on `internal secrets`. If you would like to learn more about `external secrets`, check out the [external secrets examples page](/docs/usage/examples/secrets_external.md). For a broader view of secrets and how to use `internal` or `external` secrets in your pipeline, check out the [secrets tour page](docs/usage/tour/secrets.md).

:::warning
Internal secrets do NOT have the `pull_request` event enabled by default. This is intentional to help mitigate exposure via a pull request against the repo. You can override this behavior, at your own risk, for each secret.
:::

## Internal Secrets

Internal secrets are generally managed via the UI or the [CLI](/docs/reference/cli/secret/secret.md). They can also be managed via the [API](/docs/reference/api/secret/secret.md).

A full pipeline example is available [here](/docs/usage/examples/secrets_internal.md)

_Example pipeline YAML block for internal secrets_

```yaml
secrets:
  - name: foo1
    key: github/ocotocat/foo
    engine: native
    type: repo
```

### Name

The name of your secret.

### Key

The key is auto-generated based on the other secret components, following this convention (see [Type](/usage/secrets/#type)).

* Repository: `<org>/<repo>/<name>`
* Organization: `<org>/<name>`
* Shared: `<org>/<team>/<name>`

### Engine

The native secret engine is designed to store secrets in the database. This component exists for configuration future-proofing; allowing easier expansion for additional options in the future.

### Type

There are three types of internal secrets, with equivalent example paths for the UI:

* Repository - `https://vela.example.com/-/secrets/native/repo/<org>/<repo>`
* Organization - `https://vela.example.com/-/secrets/native/org/<org>`
* Shared - `https://vela.example.com/-/secrets/native/shared/<org>/<team>`

#### Repository

Repository secrets are scoped to only a single repository. In order to create/modify these secrets you must be a repository admin within the source code manager.

_Example YAML block for repository secret type_

```yaml
secrets:
  - name: foo1
    key: github/ocotocat/foo1
    engine: native
    type: repo
```

#### Organization

Organization secrets are scoped to any repository in the organization. In order to create/modify these secrets you must be an organization admin within the source code manager.

_Example YAML block for organization secret type_

```yaml
secrets:
  - name: foo
    key: github/foo
    engine: native
    type: org
```

#### Shared

Shared secrets are scoped to any repository in the source code manager (SCM). Shared secrets are unique in the case they require a team to exist in your SCM org. In order to create/modify these secrets you must be a member of the SCM team.

_Example YAML block for shared secret type_

```yaml
secrets:
  - name: foo
    key: github/ocotokitties/foo
    engine: native
    type: shared
```

#### Allowlists

Both shared and org secrets can have repository allowlists. These can be configured in the UI and CLI. These allowlists will scope access to specific repositories.

### Protecting Secrets

Learn the best practices for keeping your Vela secrets safe.

#### Log Exposure

Vela implements a masking routine that obfuscates any printing of an internal secret value in step/service logs. For example:

```yaml
secrets:
  - name: foo1
    key: github/ocotocat/foo
    engine: native
    type: repo

steps:
  - name: example
    image: alpine
    secrets: foo1
    commands:
      - echo $FOO1  # will print ***
```

:::warning
The masking routine simply looks for logs that exactly match the content of a step secret. It is important to consider this as protection against accidental logging and an opportunity for more verbose logging, NOT protection against bad actors. Those protections are described below.
:::

#### Pull Request Event + Build Approval

Secrets by default do not have the `pull request` event enabled, as this event can be triggered by users without `write` access to the repository. Therefore, if users do require secrets for `pull request` events, it is best practice to adopt a [build approval policy](/usage/repo_settings/#outside-contributor-permissions), which will allow repository admins to validate the safety of the pipeline.

#### Other Secret Settings

Defaults for various secret types

| Setting              | Repo                   | Org                    | Shared                 |
|--------------------- |----------------------- |----------------------- |----------------------- |
| `Allow Command`      | Yes                    | Yes                    | No                     |
| `Allow Substitution` | Yes                    | Yes                    | No                     |
| `Images`             | Any                    | Any                    | Any                    |
| `Allow Events`       | Push, Tag, Deployment  | Push, Tag, Deployment  | Push, Tag, Deployment  |

**Allow Command**:

This setting prevents secrets from being injected into the container environment whenever a `commands` block or custom `entrypoint` is specified. For example:

```yaml
secrets:
  - name: no_commands # 'allow command' set to false
    key: vela/no_commands
    type: org
    engine: native
  
  - name: yes_commands # 'allow command' set to true
    key: vela/yes_commands
    type: org
    engine: native
    
steps:
  - name: print secret mask
    image: alpine:latest
    secrets: [ no_commands, yes_commands ]
    commands:
      - echo $NO_COMMANDS # will print nothing (not injected)
      - echo $YES_COMMANDS # will print secret mask ***
```

**Allow Substitution**:

This setting prevents secrets from being substituted in the pipeline configuration by referencing its key in `${KEY}` format. This setting, in tandem with disallowing commands, prevents users from attempting to bypass Vela's secret masking in logs. Example:

```yaml
secrets:
  - name: no_substitution # 'allow substitution' set to false
    key: vela/no_substitution
    type: org
    engine: native
  
  - name: yes_substitution # 'allow substitution' set to true
    key: vela/yes_substitution
    type: org
    engine: native
    
steps:
  - name: docker build
    image: target/vela-kaniko
    secrets: [ no_substitution, yes_substitution ]
    parameters:
      build_args:
        - FOO=${NO_SUBSTITUTION}  # FOO will be empty
        - BAR=${YES_SUBSTITUTION} # BAR will be the value of YES_SUBSTITUTION

  - name: command substitution
    image: alpine
    secrets: [ no_substitution, yes_substitution ]
    commands:
      # As a caveat to this setting, both the following commands will in fact pull in the secret values.
      # This is because Vela converts all commands to a shell script, and these ${KEY} substitutions are
      # actually shell environment substitutions rather than Vela runtime substitutions.
      - wget --header="X-Auth-Token: ${NO_SUBSTITUTION}" https://www.example.com
      - wget --header="X-Auth-Token: ${YES_SUBSTITUTION}" https://www.example.com
```

:::note
If you have a secret which a plugin expects as a specific environment variable, you can leverage `target` rather than substitution:

```diff
steps:
  - name: custom plugin
    image: docker.company.com/my-org/my-plugin
    secrets:
-      - github_token
+      - source: github_token
+        target: PARAMETER_API_TOKEN
    parameters:
-      api_token: ${GITHUB_TOKEN}
```

This is a much safer practice.
:::

**Images**:

You can further protect a secret by limiting its usage to certain images. This ensures that every time a secret is injected into a container environment, it will be used in an expected way.

You can specify tag-specific images or base images.

```yaml
secrets:
  - name: any_image # `images` set to "any"
    key: vela/any_image
    type: org
    engine: native
  
  - name: kaniko_only # `images` set to "target/vela-kaniko"
    key: vela/kaniko_only
    type: org
    engine: native
    
steps:
  - name: docker build
    image: target/vela-kaniko
    secrets:
      - source: any_image
        target: KANIKO_USERNAME  # injected as KANIKO_USERNAME
      - source: kaniko_only
        target: KANIKO_PASSWORD  # injected as KANIKO_PASSWORD
    parameters:
      registry: docker.company.com
      repo: docker.company.com/some/repo
      tags:
        - ${VELA_BUILD_COMMIT:0:8}

  - name: alpine use
    image: alpine:latest
    secrets: [ any_image, kaniko_only ]
    commands:
      - echo $ANY_IMAGE    # will print ***, signaling its injection to the environment
      - echo $KANIKO_ONLY  # will print nothing, not injected
```

**Allow Events**:

Secrets can be restricted to only be injected into container environments on certain webhook events. This can be useful to limiting potential exposure opportunities and only using a secret when necessary.

:::note
To update any of these settings, you can edit the secret in the UI.

You may also use the [CLI](/docs/reference/cli/secret/secret.md) or [API](/docs/reference/api/secret/secret.md)
:::
