---
title: "Update"
linkTitle: "Update"
description: >
  Learn how to modify a build.
---

## Endpoint

```
PUT  /api/v1/repos/:org/:repo/builds/:build
```

## Parameters

The following parameters are used to configure the endpoint:

| Name    | Description          |
| ------- | -------------------- |
| `org`   | name of organization |
| `repo`  | name of repository   |
| `build` | number of build      |

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

#### File

```json
{
  "message": "this is an updated message"
}
```

#### Request

```sh
curl \
  -X PUT \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d "@data.json" \
  "http://127.0.0.1:8080/api/v1/repos/github/octocat/builds/1"
```

#### Response

```json
{
  "id": 1,
  "repo_id": 1,
  "number": 1,
  "parent": 1,
  "event": "push",
  "status": "created",
  "error": "",
  "enqueued": 1563474077,
  "created": 1563474076,
  "started": 1563474077,
  "finished": 0,
  "deploy": "",
  "clone": "https://github.com/github/octocat.git",
  "source": "https://github.com/github/octocat/commit/48afb5bdc41ad69bf22588491333f7cf71135163",
  "title": "push received from https://github.com/github/octocat",
  "message": "this is an updated message",
  "commit": "48afb5bdc41ad69bf22588491333f7cf71135163",
  "sender": "OctoKitty",
  "author": "OctoKitty",
  "branch": "main",
  "ref": "refs/heads/main",
  "base_ref": "",
  "host": "company.localhost",
  "runtime": "docker",
  "distribution": "linux"
}
```
