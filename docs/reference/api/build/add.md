---
title: "Add"
linkTitle: "Add"
description: >
  Learn how to create a build.
---

## Endpoint

```
POST  /api/v1/repos/:org/:repo/builds
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
  "author": "Octocat",
  "branch": "main",
  "commit": "1598250b3d002c9f25f82bb046296f831b6b9a53",
  "clone": "https://github.com/github/octocat.git",
  "event": "push",
  "message": "First commit...",
  "ref": "refs/heads/main",
  "sender": "Octocat",
  "source": "https://github.com/github/octocat/commit/1598250b3d002c9f25f82bb046296f831b6b9a53",
  "title": "push received from https://github.com/github/octocat"
}
```

#### Request

```sh
curl \
  -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d "@data.json" \
  "http://127.0.0.1:8080/api/v1/repos/github/octocat/builds"
```

#### Response

```json
{
  "id": 40063,
  "repo": {
    "id": 293,
    "owner": {
      "id": 126,
      "name": "Octocat",
      "active": true
    },
    "org": "Octocat",
    "name": "myvela",
    "full_name": "github/octocat",
    "link": "https://github.com/github/octocat",
    "clone": "https://github.com/github/octocat.git",
    "branch": "main",
    "topics": [],
    "build_limit": 10,
    "timeout": 30,
    "counter": 2145,
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
  "pipeline_id": 4177,
  "number": 1000,
  "parent": 999,
  "event": "push",
  "event_action": "",
  "status": "success",
  "error": "",
  "enqueued": 1693341901,
  "created": 1693341901,
  "started": 1693341901,
  "finished": 1693341903,
  "deploy": "",
  "deploy_number": 0,
  "deploy_payload": {},
  "clone": "https://github.com/github/octocat.git",
  "source": "https://github.com/github/octocat/commit/1598250b3d002c9f25f82bb046296f831b6b9a53",
  "title": "push received from https://github.com/github/octocat",
  "message": "Update .vela.yml",
  "commit": "1598250b3d002c9f25f82bb046296f831b6b9a53",
  "sender": "Octocat",
  "sender_scm_id": "0",
  "fork": false,
  "author": "Octocat",
  "email": "octocat@github.com",
  "link": "https://vela.example.com/github/octocat/1000",
  "branch": "main",
  "ref": "refs/heads/main",
  "base_ref": "",
  "head_ref": "",
  "host": "worker1",
  "runtime": "docker",
  "distribution": "linux",
  "approved_at": 0,
  "approved_by": ""
}
```
