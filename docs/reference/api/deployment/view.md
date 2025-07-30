---
title: "View"
linkTitle: "View"
description: >
  Learn how to inspect a deployment.
---

## Endpoint

```
GET  /api/v1/deployments/:org/:repo/:deployment
```

## Parameters

The following parameters are used to configure the endpoint:

| Name         | Description          |
| ------------ | -------------------- |
| `org`        | name of organization |
| `repo`       | name of repository   |
| `deployment` | number of deployment |

## Permissions

COMING SOON!

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

#### Request

```sh
curl \
  -X GET \
  -H "Authorization: Bearer <token>" \
  "http://127.0.0.1:8080/api/v1/deployments/github/octocat/1"
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
    "builds": [
        {
            "id": 73075,
            "repo": {
                "id": 293
            },
            "pipeline_id": 13485,
            "number": 2141,
            "parent": 0,
            "event": "deployment",
            "event_action": "created",
            "status": "success",
            "error": "",
            "enqueued": 1740765108,
            "created": 1740765108,
            "started": 1740765108,
            "finished": 1740765111,
            "deploy": "prod",
            "deploy_number": 877720,
            "deploy_payload": {
                "CLUSTER_COUNT": "50",
                "region": "us-west-1"
            },
            "clone": "https://github.com/github/octocat.git",
            "source": "https://api.github.com/repos/github/octocat/deployments/877720",
            "title": "deployment received from https://github.com/github/octocat",
            "message": "Deployment request from Vela",
            "commit": "ae28c6ac990bc249041a07b31dfcdaf96e1338dd",
            "sender": "github",
            "sender_scm_id": "17043",
            "fork": false,
            "author": "github",
            "email": "",
            "link": "https://vela.dev.target.com/github/octocat/2141",
            "branch": "deploy-config-test",
            "ref": "refs/heads/deploy-config-test",
            "base_ref": "",
            "head_ref": "",
            "host": "worker",
            "runtime": "docker",
            "distribution": "linux",
            "approved_at": 0,
            "approved_by": ""
        }
    ]
}
```
