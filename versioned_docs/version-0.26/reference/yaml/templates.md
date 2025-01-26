---
title: "Templates"
linkTitle: "Templates"
weight: 4
description: >
  YAML keys for templates block
---

The template key is intended to be used to identify where to retrieve templates during the compiler phase of the pipeline.

```yaml
---
# This document is displaying all the required keys
# to pull a template from a remote system.
templates:
  - name: example
    source: github.com/go-vela/templates/example.yml
    type: github    
```

## Keys

| Key      | Required | Type   | Description                                           |
|----------|----------|--------|-------------------------------------------------------|
| `name`   | Y        | string | indicates a unique identifier for the template.       |
| `source` | Y        | string | indicates a path to a template in remote system.      |
| `type`   | Y        | string | indicates to the compiler which version to use.       |
| `format` | N        | string | indicates the language used within the template file. |

### Usage

:::tip
To learn how to write templates, see the [template documentation](/docs/usage/templates/templates.md)
:::

#### The `name:` key

```yaml
templates:
    # Indicates a unique identifier for the template. This identifier
    # then can be used within a step to expand the template.
  - name: example
```

#### The `source:` key

```yaml
templates:
    # Indicates a path to a template in remote system. This path
    # should always be the raw path within a repository. By default 
    # the template is pulled from the default branch on the repository.
    # It can be overwritten by adding a suffix of `@branch`, `@tag`, or
    # `@commit`.
    source: github.com/go-vela/templates/example.yml@testbranch
```

```yaml
templates:
    # As an alternative, if the template is within the same repository,
    # the source can be the path to the template in the Vela workspace.
    # This is used in conjunction with `type: file`.
    source: path/to/template.yml
```

#### The `type:` key

```yaml
templates:
    # Indicates to the compiler which version to use.
    type: github
```

```yaml
templates:
    # The 'file' type will grab a template from the repository on a commit.
    type: file
```

#### The `format:` key

```yaml
templates:
  - name: example
    source: github.com/go-vela/templates/example.yml
    type: github
    # Indicates the language used within the template file. By default
    # the template will be "go" but accepts the following values: go, golang, starlark
    format: starlark
```
