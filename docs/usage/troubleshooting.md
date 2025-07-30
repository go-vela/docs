---
title: "Troubleshooting"
---

## Why is my build not displaying?

This behavior can occur for several reasons that may or may not be visually apparent.

The first step to troubleshooting this issue requires viewing the webhook deliveries for the repository.

This can be accomplished by using one of the following methods:

* **UI** - Navigate to the `https://vela.example.com/<org>/<repo>/hooks` page for the repository
* **CLI** - Run [the `vela get hooks --org <org> --repo <repo>` command for the repository](/docs/reference/cli/hook/get.md)

After finding the information for the webhook, please use the list below which includes details on how to resolve the issue.

### Missing Webhook Signature

![Missing Signature](/img/troubleshooting/missing_signature.png)

This behavior indicates the signature, used to verify authenticity of the webhook, for the repository has been removed.

To resolve the issue, the repository will need to be repaired which will recreate the webhook with a valid signature.

This can be accomplished by using one of the following methods:

* **UI** - Click the `Repair` button on the `https://vela.example.com/<org>/<repo>/settings` page for the repository
* **CLI** - Run [the `vela repair repo --org <org> --repo <repo>` command for the repository](/docs/reference/cli/repo/repair.md)

:::tip
An access level of `admin` is required in order to repair a repository.
:::

### Payload Signature Check Failed

![Payload Signature Check Failed](/img/troubleshooting/payload_signature_check_failed.png)

This behavior indicates the signature, used to verify authenticity of the webhook, for the repository has been corrupted.

To resolve the issue, the repository will need to be repaired which will recreate the webhook with a valid signature.

This can be accomplished by using one of the following methods:

* **UI** - Click the `Repair` button on the `https://vela.example.com/<org>/<repo>/settings` page for the repository
* **CLI** - Run [the `vela repair repo --org <org> --repo <repo>` command for the repository](/docs/reference/cli/repo/repair.md)

:::tip
An access level of `admin` is required in order to repair a repository.
:::

### Repo Exceeded Build Limit

![Repo Exceeded Build Limit](/img/troubleshooting/repo_exceeded_build_limit.png)

This behavior indicates the number of `pending` or `running` builds for the repository exceeded the concurrent build limit.

To resolve the issue, find a build with a `pending` or `running` status and cancel it (or wait for it to complete).

This can be accomplished by using one of the following methods:

* **UI** - Click the `Cancel Build` button on the `https://vela.example.com/<org>/<repo>/<build>` page for the repository
* **CLI** - Run [the `vela cancel build --org <org> --repo <repo> --build <build>` command for the repository](/docs/reference/cli/build/cancel.md)

:::tip
An alternative solution is to increase the build limit for the repository.

This can be accomplished by using one of the following methods:

* **UI** - Update the `Build Limit` field on the `https://vela.example.com/<org>/<repo>/settings` page for the repository
* **CLI** - Run [the `vela update repo --org <org> --repo <repo> --build.limit <limit>` command for the repository](/docs/reference/cli/repo/update.md)
:::

### Unable To Unmarshal YAML

![Unable To Unmarshal YAML](/img/troubleshooting/unable_to_unmarshal_yaml.png)

This behavior indicates the pipeline can't be compiled because it includes invalid syntax.

To resolve the issue, identify the incorrect syntax in the pipeline and update it with proper value(s).

This can be accomplished by using the [`vela validate pipeline` CLI command](/docs/reference/cli/pipeline/validate.md) in the directory where the pipeline is located.

### Your Account Was Suspended

![Your Account Was Suspended](/img/troubleshooting/your_account_was_suspended.png)

This behavior indicates the user who originally enabled the repository had their account suspended in the SCM.

To resolve the issue, the repository owner will need to be changed to an unsuspended user in the SCM.

This can be accomplished by using one of the following methods:

* **UI** - Click the `Chown` button on the `https://vela.example.com/<org>/<repo>/settings` page for the repository
* **CLI** - Run [the `vela chown repo --org <org> --repo <repo>` command for the repository](/docs/reference/cli/repo/chown.md)

:::tip
An access level of `admin` is required in order to change ownership of a repository.
:::

## Why is my build not running?

This behavior can occur for several reasons that may or may not be visually apparent.

The first step to troubleshooting this issue requires viewing the build object for the repository.

This can be accomplished by using one of the following methods:

* **UI** - Navigate to the `https://vela.example.com/<org>/<repo>` page for the repository
* **CLI** - Run [the `vela get builds --org <org> --repo <repo>` command for the repository](/docs/reference/cli/build/get.md)

After finding the information for the build, please use the list below which includes details on how to resolve the issue.

### Build Is Pending

![Build Is Pending](/img/troubleshooting/build_is_pending.png)

This behavior indicates the number of `running` builds for the system is greater than the number of [workers](/docs/installation/worker/worker.md) available.

Unfortunately, the only way to resolve the issue is to wait until a worker becomes available to run your build.

### Queue length exceeds configured limit, please wait for the queue to decrease in size before retrying

This error is given in response to a build restart request of a `pending` build whenever the queue is larger than the configured limit by the platform admins.

This is a measure to prevent queue bloat from builds that are already in the queue.

### Context Deadline Exceeded

![Context Deadline Exceeded](/img/troubleshooting/context_deadline_exceeded.png)

This behavior indicates the amount of time the build was `running` exceeded the timeout for the repository.

To resolve the issue, optimize the pipeline to improve the performance and decrease the runtime for builds.

This can be accomplished by using one of the following methods:

* Update the pipeline [to use rulesets](docs/usage/tour/rulesets.md) which will limit the number of [steps](docs/usage/tour/step.md) ran in the build
* Update the pipeline [to use stages](docs/usage/tour/stages.md) which will enable running [steps](docs/usage/tour/step.md) concurrently

:::tip
An alternative solution is to increase the build timeout for the repository.

This can be accomplished by using one of the following methods:

* **UI** - Update the `Build Timeout` field on the `https://vela.example.com/<org>/<repo>/settings` page for the repository
* **CLI** - Run [the `vela update repo --org <org> --repo <repo> --timeout <timeout>` command for the repository](/docs/reference/cli/repo/update.md)
:::

### Invalid Reference Format

![Invalid Reference Format](/img/troubleshooting/invalid_reference_format.png)

This behavior indicates [the `image` key](docs/usage/tour/image.md) provided for a step in the pipeline is invalid.

To resolve the issue, identify the step with the incorrect `image` and update it with a proper value.

This can be accomplished by using the [`docker pull` CLI command](https://docs.docker.com/engine/reference/commandline/pull/) with the value for the `image` as the first argument.

### Invalid Secret Path

![Invalid Secret Path](/img/troubleshooting/invalid_secret_path.png)

This behavior indicates [the `key` property](/reference/yaml/secrets/#the-key-key) provided for a secret in the pipeline is invalid.

To resolve the issue, explicitly define the secret depending on the type as outlined in the [secret usage docs](/docs/usage/secrets.md) with all of the expected fields.

If you are using a secret that only defines `name` as the property and are receiving this error, you will need add the missing properties as this way of referencing a secret was deprecated in an older version of Vela.

For example:

```yaml
secrets:
  - name: foo
```

and even

```yaml
secrets:
  - name: foo
    key: foo
    engine: native
    type: repo
```

would need to be changed to:

```diff
secrets:
  - name: foo
+   key: <org>/<repo>/foo
+   engine: native
+   type: repo
```

:::tip
Make sure to replace `<org>` and `<repo>` for the `key` property with the appropriate values from your source code provider.

If you're using GitHub and using the secret for a pipeline at `https://github.com/octocat/hello`, your `org` would be `octocat` and `repo` would be `hello`.
:::

### Repo is not trusted

![Untrusted Repo](/img/troubleshooting/untrusted_repo.png)

This behavior indicates [the `vela_executor_enforce_trusted_repos` flag](/reference/installation/worker/#vela_executor_enforce_trusted_repos) has been set by the Vela platform administrators, which allows only certain repositories to run privileged images.

To resolve the issue, identify the step attempting to run a privileged image and consider a workaround. Otherwise, work with your Vela platform administrators to add your repository to the allowlist.

## `v0.26` YAML Migration

With the release of `v0.26`, Vela transitioned away from [buildkite/yaml](https://github.com/buildkite/yaml) to the official [go-yaml/yaml](https://github.com/go-yaml/yaml) for parsing pipelines and templates.

As a result, there are a few common parsing issues that have been compiled together here:

### Issue 1: `unable to unmarshal into StringSliceMap`

This error indicates that Vela is failing to unmarshal the `environment` key in one or many steps in your pipeline.

This can be caused in two different ways.

**Cause 1: inline Go "clobbering" pre-defined YAML environment key**

```yaml
environment:
  STATE: California
  CITY: San Francisco
  NEIGHBORHOOD: Embarcadero
  {{ if <something> }}
  NEIGHBORHOOD: Mission
  {{ end }}
```

Because `NEIGHBORHOOD` was already declared _outside_ the inline Go logic, it will cause issues with the YAML parser. Instead of re-assigning the environment key, users should declare the key solely within the inline Go:

**Solution**
```yaml
environment:
  STATE: California
  CITY: San Francisco
  {{ if <something> }}
  NEIGHBORHOOD: Mission
  {{ else }}
  NEIGHBORHOOD: Embarcadero
  {{ end }}
```

Now the `NEIGHBORHOOD` key is not being re-assigned. It is being declared via Go logic.

**Cause 2: multiple `<<` keys within the environment map (will be addressed as a warning in v0.26.2)**

```yaml
base_env: &base_env
  CLUSTER: my_cluster
  REGION: us-west

release_env: &release_env
  ENV: prod

steps:
  - name: release step
    image: my_image
    environment:
      REPO: ${VELA_REPO_FULL_NAME}
      <<: *base_env
      <<: *release_env
    commands:
      - ./do_release.sh
```

The above environment merge will throw an error because the `<<` key is repeated, which violates the unique key constraint in standard YAML maps. To remediate, simply declare all your alias YAML nodes in a sequence.

**Solution**
```yaml
base_env: &base_env
  CLUSTER: my_cluster
  REGION: us-west

release_env: &release_env
  ENV: prod

steps:
  - name: release step
    image: my_image
    environment:
      REPO: ${VELA_REPO_FULL_NAME}
      <<:
        - *base_env
        - *release_env
    commands:
      - ./do_release.sh
```

### Issue 2: missing `parameters` or `environment`  pairs when using YAML anchors

This issue occurs when users have declared an anchor which contains some base set of `parameters` or `environment` pairs and attempts to add them to step configurations which have _their own_ `parameters` or `environment` pairs. Below is an example.

```yaml
plugin_base: &plugin_base
  image: my-neat-plugin:v1.2.3
  pull: always
  secrets: [ plugin_token ]
  parameters:
    log_level: debug
    repo: ${VELA_REPO_FULL_NAME}

steps:
  - name: plugin-west
    <<: *plugin_base
    parameters:
      region: central
      data_center: west

  - name: plugin-east
    <<: *plugin_base
    parameters:
      region: central
      data_center: east
```

Due to the fact that `parameters` is a declared key in the `plugin_base` anchor _and_ in the steps `plugin-west` + `plugin-east`, the YAML parser will only accept the `parameters` declared in the steps. This is the [YAML standard](https://yaml.org/type/merge.html), which unfortunately was not followed by our previous parser.

To solve this issue, users should plan on merging `parameters` and `environment` maps with separate map anchors that avoid collisions.

**Solution**
```yaml
plugin_base: &plugin_base
  image: my-neat-plugin:v1.2.3
  pull: always
  secrets: [ plugin_token ]

plugin_base_params: &plugin_base_params
  log_level: debug
  repo: ${VELA_REPO_FULL_NAME}

steps:
  - name: plugin-west
    <<: *plugin_base
    parameters:
      <<: *plugin_base_params
      region: central
      data_center: west

  - name: plugin-east
    <<: *plugin_base
    parameters:
      <<: *plugin_base_params
      region: central
      data_center: east
```

Now when Vela compiles the pipeline, the `parameters` blocks for each step will include the `log_level` and `repo` pairs from the base anchor.