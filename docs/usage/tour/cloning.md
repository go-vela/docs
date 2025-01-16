---
title: "Cloning"
linkTitle: "Cloning"
weight: 6
description: >
  Learn about cloning.
---

Vela will clone your repository automatically before executing the pipeline.

Vela injects the clone credentials that are the oauth2 token associated with the repository to authenticate.

However, sometimes you may need to customize, override or disable the default clone behavior.

**Expand your knowledge with an example!**

* [Understanding the workspace](/docs/usage/workspace/)

<!-- section break -->

```yaml
# Below is displaying the default behavior that occurs in a pipeline. 
metadata:
  clone: true

steps:
  # Since the default behavior is to clone, we can instantly access
  # files in our repository.
  - name: view pipeline file
    image: alpine
    commands:
      - cat .vela.yml
```

```yaml
# Below is displaying how to turn off the clone behavior.
metadata:
  clone: false

steps:
  # Now that the clone is turned off; you can use any Docker
  # image with git installed to manually clone the repo
  # with any clone specific settings for the repository.
  - name: clone
    image: target/vela-git
    parameters:
      path: hello-world
      ref: refs/heads/main
      remote: https://github.com/octocat/hello-world.git
      sha: 7fd1a60b01f91b314f59955a4e4d4e80d8edf11d

```

<!-- section break -->

**Key references:**

[`clone:`](/docs/reference/yaml/metadata/#the-clone-key), [`name:`](/docs/reference/yaml/steps/#the-name-key), [`image:`](/docs/reference/yaml/steps/#the-image-key), [`parameters:`](/docs/reference/yaml/steps/#the-parameters-key),

