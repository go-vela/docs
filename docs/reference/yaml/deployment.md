---
title: "Deployment"
linkTitle: "Deployment"
weight: 2
description: >
  YAML keys for deployment configuration block
---

The deployment key can be used to provide guardrails and custom form fields for deployments in Vela.

By default, this key is not set.

## Keys

| Key             | Required | Type                     | Description                                                                                                     |
| --------------- | -------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `template`      | N        | struct                   | Like `template` key for [steps](/docs/reference/yaml/steps.md#the-template-key): used to pull in deploy config  |
| `targets`       | N        | []string                 | Allowed targets for a deployment                                                                                |
| `parameters`    | N        | map[string]struct{}      | Expected parameters for a deployment                                                                            |

### Usage

#### The `template:` key

The following keys can be used to configure a template injection:

| Name   | Description                                          |
|--------| ---------------------------------------------------- |
| `name` | Name of template to inject for the deployment config |
| `vars` | Variables injected into the template                 |

```yaml
---
deployment:
  template:
    # Name of template to inject as the deployment configuration. The name must map
    # to an existing template in the parent "template" key.
    name: example
```

```yaml
---
deployment:
  template:
    name: example
    # Variables injected into the template. Variables can be any
    # primitive or complex YAML types but the corresponding template
    # needs to understand how those templates are to be used.
    vars:
      require_targets: false
      include_cluster_parameter: true
```

#### The `targets:` key

```yaml
---
deployment:
  # Allowed targets for a deployment. If a user attempts to trigger
  # a deployment targeting another value, it will fail.
  targets: [dev, stage, prod]
```

#### The `parameters` key

| Key           | Type     | Description                                                 |
| ------------- | -------- | ----------------------------------------------------------- |
| `description` | string   | Description of the parameter (will appear in UI)            |
| `type`        | string   | Parameter primitive type                                    |
| `required`    | bool     | Whether or not the parameter must be supplied to deployment |
| `options`     | []string | Allowed parameter values                                    |
| `min`         | integer  | Parameter minimum value (used for integer type)             |
| `max`         | integer  | Parameter maximum value (used for integer type)             |


```yaml
---
# deployment config using all keys available
deployment:
  targets: [ dev, stage, prod ]
  parameters:
    region:
      # type: defaults to string
      description: region to deploy to
      required: true
      options: [ us-west, us-east, us-north, us-south ]
    count:
      description: number of clusters to deploy
      type: int # can be int, integer, or number
      required: false # Vela step has a default
      min: 1
      max: 10
    run_tests:
      description: run tests prior to deployment
      type: bool # can be bool, boolean
```

```yaml
---
templates:
  - name: deploy
    source: vela-templates/deploy.yml
    type: file

# deployment config being pulled in from a template
deployment:
  template:
    name: deploy
```

Deployment configurations will generate form validation in the UI when users are on the `Add Deployment` page. Any deployments that violate the configuration will be blocked.