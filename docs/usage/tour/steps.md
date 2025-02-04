---
title: "Steps"
linkTitle: "Steps"
weight: 9
description: >
  Learn about steps pipelines.
---

A steps pipeline is designed to run a sequential set of tasks.

These pipelines do not have a minimum defined length and steps will always execute in the order defined.

In this pipeline each step is shown with the minimum required YAML keys to execute a step.

Both steps are pulling an [Alpine Linux](https://alpinelinux.org/) image from [Docker Hub](https://hub.docker.com/) and executing echo statements.

**See it in action with examples!**

* [Go](/docs/usage/examples/go_modules.md)
* [Rust](/docs/usage/examples/rust_cargo.md)
* [Gradle](/docs/usage/examples/java_gradle.md)
* [Maven](/docs/usage/examples/java_maven.md)
* [Node](/docs/usage/examples/node.md)

<!-- section break -->

```yaml
version: "1"

# In this pipeline, commands are executed inside the container as the Entrypoint.
# If any command returns a non-zero exit code, the pipeline fails and exits.
steps:

  - name: Greeting
    image: alpine
    commands:
      - echo "Hello, World"

  - name: Welcome
    image: alpine
    commands:
      - echo "Welcome to the Vela docs"
```

```sh
$ vela exec pipeline
...
[stage: ][step: Greeting] $ echo "Hello, World"
[stage: ][step: Greeting] Hello, World
[stage: ][step: Welcome] $ echo "Welcome to the Vela docs"
[stage: ][step: Welcome] Welcome to the Vela docs  
```
<!-- section break -->

**Key references:**

[`name:`](/reference/yaml/steps/#the-name-key), [`image:`](/reference/yaml/steps/#the-image-key), [`commands:`](/reference/yaml/steps/#the-commands-key)
