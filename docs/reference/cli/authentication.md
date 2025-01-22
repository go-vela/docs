---
title: "Authentication"
sidebar_position: 1
---

## Overview

Authentication with the Vela CLI is the responsibility of the client initiating the request.

Each request requires a server address. You can provide this variable to the CLI in three ways:

- Configuration File
- Environment Variable
- Flag

:::tip
A configuration file is the recommended method for providing the API address to the CLI.
:::

### Configuration File

:::tip
The default path for this configuration file can be found @ `$HOME/.vela/config.yml`.
:::

Log in:

```sh
# Syntax
vela login --api.addr <vela server url>

# Example
vela login --api.addr https://vela.example.com
```

Confirm authentication via browser prompt:

```
Open https://vela.example.com in your browser and complete authentication (Press Enter to confirm):
```

Confirm to generate or update the configuration file prompt:

```
Authentication complete. Continue to save configuration (existing config will be overwritten):
```

:::tip
For more information, you can visit the [CLI config documentation](/docs//docs/reference/cli/config.md).
:::

### Environment Variables

Configure the environment with the `VELA_ADDR` environment variable:

```sh
export VELA_ADDR=https://vela.example.com
```

Log in and confirm the two prompts as stated above:

```sh
vela login
```

:::tip
It's recommended to add these to your terminal profile (`~/.bashrc` or `~/.zshrc`)
:::

### Flags

Log in and confirm the two prompts as stated above:

```sh
# Syntax
vela login --api.addr <vela server url>

# Example
vela login --api.addr https://vela.example.com
```
