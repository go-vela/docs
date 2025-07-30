---
title: "Add"
linkTitle: "Add"
description: >
  Learn how to create a deployment.
---

## Endpoint

```
POST  /api/v1/deployments/:org/:repo
```

## Parameters

The following parameters are used to configure the endpoint:

| Name   | Description          |
| ------ | -------------------- |
| `org`  | name of organization |
| `repo` | name of repository   |

## Permissions

User must have `admin` access to the repository in the SCM.

## Responses

| Status Code | Description                                         |
| ----------- | --------------------------------------------------- |
| `200`       | indicates the request has succeeded                 |
| `401`       | indicates the user does not have proper permissions |

## Sample

:::warning
This section assumes you already know how to authenticate to the API.

To authenticate to the API, please review the [authentication documentation](/docs/reference/api/authentication.md).
:::

#### File

```json
{
  "ref": "main",
  "target": "production"
}
```

#### Request

```sh
curl \
  -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d "@data.json" \
  "http://127.0.0.1:8080/api/v1/deployments/github/octocat"
```

#### Response

```json
{
    "id": 466,
    "number": 877720,
    "repo": {
        "id": 293,
        "owner": {
            "id": 126,
            "name": "github",
            "active": true
        },
        "org": "github",
        "name": "octocat",
        "full_name": "github/octocat",
        "link": "https://github.com/github/octocat",
        "clone": "https://github.com/github/octocat.git",
        "branch": "main",
        "topics": [],
        "build_limit": 10,
        "timeout": 30,
        "counter": 2162,
        "visibility": "public",
        "private": false,
        "trusted": false,
        "active": true,
        "allow_events": {
            "push": {
                "branch": true,
                "tag": true,
                "delete_branch": false,
                "delete_tag": false
            },
            "pull_request": {
                "opened": true,
                "edited": true,
                "synchronize": true,
                "reopened": true,
                "labeled": true,
                "unlabeled": true
            },
            "deployment": {
                "created": true
            },
            "comment": {
                "created": true,
                "edited": true
            },
            "schedule": {
                "run": true
            }
        },
        "pipeline_type": "go",
        "previous_name": "",
        "approve_build": "fork-always",
        "approval_timeout": 7,
        "install_id": 0
    },
    "url": "https://api.github.com/repos/github/octocat/deployments/877720",
    "commit": "ae28c6ac990bc249041a07b31dfcdaf96e1338dd",
    "ref": "deploy-config-test",
    "task": "deploy:vela",
    "target": "prod",
    "description": "Deployment request from Vela",
    "payload": {
        "CLUSTER_COUNT": "50",
        "region": "us-west-1"
    },
    "created_at": 1740765107,
    "created_by": "github",
    "builds": []
}
```

#### File with Parameters

If you would like to pass parameters, which can be referenced in the pipeline as `$DEPLOYMENT_PARAMETER_<KEY>`, include them as a map inside the `payload` key.

```json
{
  "ref": "main",
  "target": "production",
  "payload": {
		"FIRST_EXAMPLE": "hello",
		"SECOND_EXAMPLE": "goodbye"
  }
}
```

#### Request with Parameters

```sh
curl \
  -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d "@data.json" \
  "http://127.0.0.1:8080/api/v1/deployments/github/octocat"
```

#### Response with Parameters

```json
{
  "id": 1,
  "repo_id": 1,
  "url": "https://api.github.com/repos/github/octocat/deployments/1",
  "user": "octocat",
  "commit": "48afb5bdc41ad69bf22588491333f7cf71135163",
  "ref": "main",
  "task": "deploy:vela",
  "target": "production",
  "description": "Deployment request from Vela",
  "payload": {
		"EXAMPLE": "hello",
		"SECOND_EXAMPLE": "goodbye"
  }
}
```
