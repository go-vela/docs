---
title: "Secrets"
linkTitle: "Secrets"
weight: 8
description: >
  YAML keys for secret block
---

The secret key is intended to be used to pull secrets from the Vela server or execute plugins to write the external secrets to the build volume.

```yaml
---
# This document is displaying all the required keys
# to pull various secret types.
secrets:
  # Below is displaying the declarative secret definitions.
  - name: foo1
    key: go-vela/docs/foo1
    engine: native
    type: repo
  - name: foo2
    key: go-vela/foo2
    engine: native
    type: org
  - name: foo3
    key: go-vela/admins/foo3
    engine: native
    type: shared
  - name: vault_token
    key: go-vela/vault_token
    engine: native
    type: org

  # Below is displaying executing a secret plugin.
  - origin:
     name: External Vault Secret
     image: target/secret-vault:latest
     secrets: [ vault_token ]
     parameters:
       addr: vault.company.com
       auth_method: token
       username: vela
       token: sometoken
       items:
         - source: secret/vela
           path: user
```

## Keys

| Key      | Required | Type   | Description                                                     |
| -------- | -------- | ------ | --------------------------------------------------------------- |
| `name`   | Y        | string | Name of secret to reference in the pipeline.                    |
| `key`    | N        | string | Path to secret to fetch from storage backend.                   |
| `engine` | N        | string | Name of storage backend to fetch secret from.                   |
| `type`   | N        | string | Type of secret to fetch from storage backend.                   |
| `pull`   | N        | string | When to pull in secrets from storage backend.                   |
| `origin` | N        | struct | Declaration to pull secrets from non-internal secret providers. |

#### The `name:` key

```yaml
---
secrets:
    # Name of secret to reference in the pipeline.
  - name: postgres
```

#### The `key:` key

:::tip
The key is unique
    # to the type of secret you need to pull and follows a pattern
    # to ensure the repo has the proper authorization to use the secret.
    # Pattern by type:
    # repo    - \<org\>/\<repo\>/\<some_name\>
    # org     - \<org\>/\<some_name\>
    # shared  - \<org\>/\<team_with_org\>/\<some_name\>
:::

```yaml
---
secrets:
    # Path to secret to fetch from storage backend. Displaying a
    # repo type secret.
  - key: go-vela/docs/foo1

    # Path to secret to fetch from storage backend. Displaying a
    # org type secret.
  - key: go-vela/foo1

    # Path to secret to fetch from storage backend. Displaying a
    # shared type secret.
  - key: go-vela/admins/foo1
```

#### The `engine:` key

:::tip
To know what engines are available for your Vela installation, we recommend consulting your system administrators.
:::

```yaml
---
secrets:
    # Name of storage backend to fetch secret from, "native" signifies
    # the backend provider is the Vela database.
  - engine: native
```

#### The `type:` key

```yaml
---
secrets:
    # Type of secret to fetch from storage backend.
    # By default, Vela can pull repo but type accepts the
    # following values: repo, org, and shared
  - type: repo
```

#### The `pull:` key

```yaml
---
secrets:
    # When to pull in secrets from storage backend.
    # By default, Vela will pull at the beginning of a build but
    # accepts the following values: build_start, step_start
  - pull: step_start
```

:::warning `step_start` or lazy loading secrets
is not currently available for the [Kubernetes-based workers](/docs/installation/worker/kubernetes.md) and does not work with secrets
originating from plugins loaded via [`origin:`](/docs/reference/yaml/secrets/#the-pull-key) (see below).
:::

#### The `origin:` key

| Key           | Required | Type     | Description                                                      |
| ------------- | -------- | -------- | ---------------------------------------------------------------- |
| `name`        | Y        | string   | Unique identifier for the container in the pipeline.             |
| `image`       | Y        | []string | Docker image used to create an ephemeral container.              |
| `pull`        | N        | string   | Declaration to configure if and when the Docker image is pulled. |
| `secrets`     | N        | struct   | Sensitive variables injected into the container environment.     |
| `environment` | N        | map      |                                                                  |
| `ruleset`     | N        | struct   | Conditions to limit the execution of the container.              |
| `parameters`  | N        | map      | Extra configuration variables specific to a plugin.              |

:::tip The `pull:` option under `origin:`
allows for different values than the
[Secrets `pull:` key](/docs/reference/yaml/secrets/#the-pull-key). It mimics the
[Steps version of the `pull:` key](/docs/reference/yaml/steps/#the-pull-key).
:::

:::tip In an effort to reduce duplicate
documentation, see the comparable
[step keys documentation](/docs/reference/yaml/steps/#keys) to learn how keys
can be set and details on behavior. :::
