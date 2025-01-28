---
title: "Environment"
---


To define environment variables you can add an `environment:` YAML key. Environment variables can be scoped to be global, within a stage, or within a step.

All platform variables get injected with a custom `VELA_` prefix pattern.

The global environment encompasses all stages, steps, and services within the pipeline.

Every stage's environment is isolated to each individual stage and its steps. A stage environment variable will overwrite a global environment variable of the same name.

Every step's environment is isolated to each individual step. A step environment variable will overwrite a global or stage environment variable of the same name.

Vela does import a library to provide partial string operations. You can use the functions to manipulate string values prior to substitution.

With this substitution you should be aware `${variable}` expressions are subject to pre-processing. If you want to avoid this behavior you can escape your expressions to avoid the pre-processor evaluations.

**Expand your knowledge with an example!**

* [Using the environment](/docs/usage/environment.md)

<!-- section break -->

```yaml
version: "1"

environment:
  GLOBAL_ENV: Global Environment
stages:
  hello:
    environment: 
      HELLO_MESSAGE: Hello, World!
    steps:
      - name: Vela Platform ENV
        image: alpine
        commands:
          - echo ${VELA_REPO_FULL_NAME}

      - name: Custom User ENV
        image: alpine
        commands:
          - echo ${HELLO_MESSAGE}
  goodbye:
    steps:
      - name: String Operation
        image: alpine
        environment:
          goodbye_message: Goodbye, World!
        commands:
          # This ":0:8" shorthand will cut the value of the commit
          # down to just the first 0 through 8 characters of the sha.
          - echo ${VELA_BUILD_COMMIT:0:8} 
          - echo ${goodbye_message}   
```

<!-- section break -->

**Key references:**

[`name:`](/reference/yaml/steps/#the-name-key), [`image:`](/reference/yaml/steps/#the-image-key), [`environment:`](/reference/yaml/steps/#the-environment-key), [`commands:`](/reference/yaml/steps/#the-commands-key)
