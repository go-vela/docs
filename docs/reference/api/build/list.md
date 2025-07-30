---
title: "List"
linkTitle: "List"
description: >
  Learn how to list builds.
---

## Endpoint

```
GET  /api/v1/repos/:org/:repo/builds
```

## Parameters

The following parameters are used to configure the endpoint:

| Name   | Description          |
| ------ | -------------------- |
| `org`  | name of organization |
| `repo` | name of repository   |

## Filters

The following optional filters are available:

| Name       | Description                                                             | 
| --------   | ----------------------------------------------------------------------- |
| `branch`   | name of branch to filter to                                             |
| `commit`   | commit hash to filter to                                                |
| `event`    | name of event to filter to                                              |
| `page`     | page number for results (default 1)                                     |
| `per_page` | number of results in a page (default 10, max 100)                       |
| `status`   | name of status to filter to                                             |
| `before`   | return builds created before a certain time (UNIX Epoch, default "now") |
| `after`    | return builds created after a certain time (UNIX Epoch, default 0)      |

## Permissions

User must have `read` access to the repository in the SCM.

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
  "http://127.0.0.1:8080/api/v1/repos/github/octocat/builds"
```

```sh
# with optional event filter
curl \
  -X GET \
  -H "Authorization: Bearer <token>" \
  "http://127.0.0.1:8080/api/v1/repos/github/octocat/builds?event=push"
```

#### Response

```json
[
  {
    "id": 73081,
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
      "counter": 2146,
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
    "number": 2146,
    "parent": 0,
    "event": "push",
    "event_action": "",
    "status": "failure",
    "error": "",
    "enqueued": 1740768216,
    "created": 1740768216,
    "started": 1740768216,
    "finished": 1740768217,
    "deploy": "",
    "deploy_number": 0,
    "deploy_payload": {},
    "clone": "https://github.com/github/octocat.git",
    "source": "https://github.com/github/octocat/commit/1598250b3d002c9f25f82bb046296f831b6b9a53",
    "title": "push received from https://github.com/github/octocat",
    "message": "First commit...",
    "commit": "1598250b3d002c9f25f82bb046296f831b6b9a53",
    "sender": "Octocat",
    "sender_scm_id": "",
    "fork": false,
    "author": "Octocat",
    "email": "",
    "link": "https://vela.example.com/github/octocat/2146",
    "branch": "main",
    "ref": "refs/heads/main",
    "base_ref": "",
    "head_ref": "",
    "host": "worker1",
    "runtime": "docker",
    "distribution": "linux",
    "approved_at": 0,
    "approved_by": ""
  },
  {
    "id": 73080,
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
      "counter": 2146,
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
    "pipeline_id": 13637,
    "number": 2145,
    "parent": 2127,
    "event": "push",
    "event_action": "",
    "status": "canceled",
    "error": "build was canceled by Octocat",
    "enqueued": 1740767429,
    "created": 1740767429,
    "started": 0,
    "finished": 0,
    "deploy": "",
    "deploy_number": 0,
    "deploy_payload": {},
    "clone": "https://github.com/github/octocat.git",
    "source": "https://github.com/github/octocat/commit/d8ca6bccf7cc61bb62a491cedd94f6892b90412b",
    "title": "push received from https://github.com/github/octocat",
    "message": "test",
    "commit": "d8ca6bccf7cc61bb62a491cedd94f6892b90412b",
    "sender": "Octocat",
    "sender_scm_id": "17043",
    "fork": false,
    "author": "Octocat",
    "email": "octocat@github.com",
    "link": "https://vela.example.com/github/octocat/2145",
    "branch": "update-base-image",
    "ref": "refs/heads/update-base-image",
    "base_ref": "",
    "head_ref": "",
    "host": "worker2",
    "runtime": "",
    "distribution": "",
    "approved_at": 0,
    "approved_by": ""
  }
]
```
