---
title: "Git"
linkTitle: "Git"
weight: 3
description: >
  YAML keys for git block
---

The `git` key is intended to be used to add additional scope to app installation tokens.

## Keys

| Key             | Required | Type        | Description                                                       |
| --------------- | -------- | ----------- | ----------------------------------------------------------------- |
| `token`         | N        | (see below) | Token scope settings for `VELA_GIT_TOKEN` variable                |

### Usage

#### The `token` key

| Key             | Required | Type        | Description                                                       |
| --------------- | -------- | ----------- | ----------------------------------------------------------------- |
| `repositories`  | N        | slice       | Add repositories to receive permissions set for token             |
| `permissions`   | N        | map         | Define permissions for the token (checks, contents)               |

The `token` key can be used to generate an installation token so long as the repo has the Vela GitHub App installed.

```yaml
---
# This setting will generate an installation token with write contents and write checks permissions for 
# the repositories listed below as well as the repository running the build: VELA_GIT_TOKEN
git:
  token:
    # list of repository names (must be in the same organization as repository running the build)
    repositories:
      - repo_1
      - repo_2
    permissions:
      checks: write
      contents: write
```

:::note
This token will only be generated if the repository owner also has access to the repositories listed.
:::

## API Access With Installation Tokens

Starting in `v0.28`, installation tokens generated with the `git.token` block can also be used for Vela API endpoints that require repo `read` or `write` access.

This makes `VELA_GIT_TOKEN` useful for automation patterns that call Vela APIs from within a build (for example, listing build data or creating deployment-related resources).

When Vela receives an installation token for these endpoints, it validates:

* token scope (repository access)
* token permissions (for example `contents:read` vs `contents:write`)
* token validity via server-side token cache metadata

If a token does not include the required repository or permission level, the request is rejected with `401`.

:::tip
Use least privilege for the `permissions` map and only grant `write` for resources your pipeline actually needs.
:::
