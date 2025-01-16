---
sidebar_position: 1
---

# Quickstart

## Step 1 - Enable a Repo

:::warning
You will need **Admin** access to the repo to be able to activate it in Vela. This is because you need **Admin** access to be able to add webhooks
to the repo.
:::

For this example, we'll go over using the UI to add the repo. You can always head over to the [CLI docs](/docs/reference/cli/repo/add.md) for docs on how to add a repo via CLI.

1. Log into your Vela instance.
1. Click "Add Repositories".
1. Select the Org from the available list.
1. Click "Add" next to the repo you would like to add.
   1. Alternatively you can "Add All" repos in an org.
   1. If your repo doesn't exist, try clicking "Refresh List" in the top right.

Your repo now has the necessary web hook to Vela.

:::info
If you're coming from another CI platform you can set a starting build number by updating the counter field on the repo via the UI, [CLI](/docs/reference/cli/repo/repo.md), or [API](/docs/reference/api/repo/repo.md).
:::

## Step 2 - Build a Pipeline

A steps pipeline is designed to run a sequential set of tasks.These pipelines do not have a minimum defined length and steps will always execute in the order defined.

In this pipeline each step is shown with the minimum required YAML keys to execute a step. Both steps are pulling a [Alpine Linux](https://alpinelinux.org/) image from [Docker Hub](https://hub.docker.com/) and executing echo statements.  

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
**See it in action with examples!**

* [Go](/docs/usage/examples/go_modules.md)
* [Rust](/docs/usage/examples/rust_cargo.md)
* [Gradle](/docs/usage/examples/java_gradle.md)
* [Maven](/docs/usage/examples/java_maven.md)
* [Node](/docs/usage/examples/node.md)

## Step 3 - Customize the Pipeline with Rulesets

The ruleset allows you to provide conditions to limit the execution of the container.

When you push your code to a source control management system a payload is sent to Vela.

Within that payload contains characteristics about what just happened. Maybe it was a push to the main branch, feature branch or tag on any specific commit.

The ruleset key gives you the ability to add conditions on the step to tell Vela when this step should be executed.

```yaml
- name: Welcome
  # This ruleset would scope the step to only executing
  # under the conditions a push to the main branch occurred
  ruleset:
    event: push
    branch: main
  image: alpine
  commands:
    - echo "Welcome to the Vela docs"
```

```yaml
- name: Welcome
  # This ruleset would scope the step to never executing
  # under the conditions a push to the main branch occurred
  ruleset:
    unless:
      event: push
      branch: main
  image: alpine
  commands:
    - echo "Welcome to the Vela docs"
```
## Step 4 - Select Your Plugins

A plugin is a Docker container that is designed to perform a set of pre-defined actions.

These actions can be for any number of general tasks, deploying code, publishing artifacts and more.

Anyone can create a plugin and use it in their pipeline.

The registry of existing plugins can be found on this site in the [plugins](docs/usage/plugins/index.md) tab.

Within the parameters block, keys are injected as upper case environment variables with the pattern of `PARAMETER_<YAML_KEY>`.

**Expand your knowledge with an example!**

* [Working with Plugins](/docs/usage/plugin.md)

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
## Step 5 - Trigger the Pipeline

If you've followed the documentation for [enabling a repo](/docs/usage/enable_repo.md) and wrote a pipeline ([here are some example pipelines](None)), all that should be left is to push your pipeline to your repo.

If a build does not trigger when your push a change to your repo, check the webhook response to see if there is an error.

:::tip
Want to run it locally? Install the CLI and "exec" the pipline from your terminal
:::

```sh
$ vela exec pipeline
...
[stage: ][step: Greeting] $ echo "Hello, World"
[stage: ][step: Greeting] Hello, World
[stage: ][step: Welcome] $ echo "Welcome to the Vela docs"
[stage: ][step: Welcome] Welcome to the Vela docs  
```
