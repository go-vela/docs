# Vault

## Description

This plugin enables the ability pull secrets from [Vault](https://www.vaultproject.io/) into the secret mount within a Vela pipeline.

Source Code: https://github.com/go-vela/secret-vault

Registry: https://hub.docker.com/r/target/secret-vault

## Usage

Sample of retrieving a secret using token authentication:

```yaml
secrets:
  - origin:
      name: vault
      image: target/vela/secret-vault:latest
      parameters:
        addr: vault.company.com
        token: superSecretVaultToken
        auth_method: token
        items:
          # Written to path: "/vela/secrets/docker/<key>"
          - source: secret/vela/username
            path: docker
```

Sample of retrieving a secret using ldap authentication:

```diff
secrets:
  - origin:
      name: vault
      image: target/vela/secret-vault:latest
      parameters:
        addr: vault.company.com
+       username: octocat
+       password: superSecretPassword
-       token: superSecretVaultToken
+       auth_method: ldap
        items:
          # Written to path: "/vela/secrets/docker/<key>"
          - source: secret/vela/username
            path: docker
```

Sample of reading a secret using ldap authentication with verbose logging:

```diff
secrets:
  - origin:
      name: vault
      image: target/vela/secret-vault:latest
      parameters:
        addr: vault.company.com
        username: octocat
        password: superSecretPassword
        token: superSecretVaultToken
        auth_method: ldap
+       log_level: trace        
        items:
          # Written to path: "/vela/secrets/docker/<key>"
          - source: secret/vela/username
            path: docker
```

Sample of retrieving a secret and writing it to multiple paths with a new key:
```yaml
secrets:
  - origin:
      name: vault
      image: target/vela/secret-vault:latest
      secrets:
        - source: superSecretToken
          target: vault_token
      parameters:
        addr: vault.company.com
        auth_method: token
        items:
          # assume user_A has two keys: `id` and `token`, but we want it to be `username` and `password`
          #
          # this will write to `/vela/secrets/kaniko/username` and `/vela/secrets/kaniko/password`
          # and also `/vela/secrets/artifactory/username` and `/vela/secrets/artifactory/password`
          - source: secret/vela/user_A
            path: [ kaniko, artifactory ]
            keys:
              id: username
              token: password
```

## Secrets

**NOTE: Users should refrain from configuring sensitive information in your pipeline in plain text.**

**NOTE: Secrets used within the secret plugin must exist as Vela secrets.**

You can use Vela secrets to substitute sensitive values at runtime:

```diff
secrets:
  # Repo secret created within Vela
  - name: vault_token
  
  # Example using token authentication method
  - origin:
      name: vault
      image: target/vela/secret-vault:latest
      secret: [ vault_token ]
      parameters:
        addr: vault.company.com
-       token: superSecretVaultToken
        auth_method: token
        items:
          # Written to path: "/vela/secrets/docker/<key>"
          - source: secret/vela/username
            path: docker
```

## Parameters

The following parameters are used to configure the image:

| Name          | Description                                              | Required  | Default |
| ------------- | -------------------------------------------------------- | --------- | ------- |
| `addr`        | address to the instance                                  | `true`    | `N/A`   |
| `auth_method` | authentication method for interfacing (i.e. token, ldap) | `true`    | `N/A`   |
| `log_level`   | set the log level for the plugin                         | `true`    | `info`  |
| `password`    | password for server authentication with ldap             | `false`   | `N/A`   |
| `token`       | token for server authentication                          | `false`   | `N/A`   |
| `username`    | set the log level for the plugin                         | `false`   | `N/A`   |
| `items`       | set of secrets to retrieve and write to workspace        | `true`    | `N/A`   |

### Items

| Name          | Description                                              | Required  | Default      |
| ------------- | -------------------------------------------------------- | --------- | ------------ |
| `source`      | path to secret                                           | `true`    | `N/A`        |
| `path`        | desired file path under `vela/secrets/` directory        | `true`    | `N/A`        |
| `keys`        | override Vault keys (map type)                           | `false`   | `vault key`  |

