---
title: "Plugins"
linkTitle: "Plugins"
weight: 5
description: >
  Learn about plugin.
---

A plugin is a Docker container that is designed to perform a set of pre-defined actions.

These actions can be for any number of general tasks, deploying code, publishing artifacts and more.

Anyone can create a plugin and use it in their pipeline.

The registry of existing plugins can be found on this site in the [plugins](/docs/plugins/registry/) tab.

Within the parameters block, keys are injected as upper case environment variables with the pattern of `PARAMETER_<YAML_KEY>`.

**Expand your knowledge with an example!**

* [Working with Plugins](/docs/usage/plugin/)

<!-- section break -->

```yaml
steps:

  - name: publish hello world
    image: target/vela-kaniko
    # Environment variables injected:
    # PARAMETER_REGISTRY=index.docker.io
    # PARAMETER_REPO=index.docker.io/go-vela/hello-world
    # PARAMETER_USERNAME=moby
    # PARAMETER_PASSWORD=mypassword
    # PARAMETER_TAGS=latest,v1.0.0
    parameters:
      registry: index.docker.io
      repo: index.docker.io/go-vela/hello-world
      username: moby
      password: mypassword
      tags:
        - latest
        - v1.0.0
```

<!-- section break -->

**Key references:**

[`name:`](/docs/reference/yaml/steps/#the-name-key), [`image:`](/docs/reference/yaml/steps/#the-image-key), [`parameters:`](/docs/reference/yaml/steps/#the-parameters-key),

