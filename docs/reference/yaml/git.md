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
    repositories:
      - alpha/beta
      - gamma/delta
    permissions:
      checks: write
      contents: write
```

:::note
This token will only be generated if the repository owner also has access to the repositories listed.
:::