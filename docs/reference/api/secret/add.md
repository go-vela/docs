---
title: "Add"
linkTitle: "Add"
description: >
  Learn how to create a secret.
---

## Endpoint

```
POST  /api/v1/secrets/:engine/:type/:org/:name
```

## Parameters

The following parameters are used to configure the endpoint:

| Name     | Description                |
| -------- | -------------------------- |
| `engine` | name of engine             |
| `type`   | name of type of secret     |
| `org`    | name of organization       |
| `name`   | name of repository or team |

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
  "name": "foo",
  "value": "bar",
  "images": ["alpine"],
  "events": ["push"]
}
```

#### Request

```sh
curl \
  -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d "@data.json"
  "http://127.0.0.1:8080/api/v1/secrets/native/repo/github/octocat"
```

#### Response

```json
{
  "id": 1,
  "org": "github",
  "repo": "octocat",
  "team": "",
  "name": "foo",
  "value": null,
  "type": "repo",
  "images": ["alpine"],
  "events": ["push"],
  "allow_command": true,
  "allow_substitution": true,
  "allow_events": {
    "push": {
      "branch": true,
      "tag": true,
      "delete_branch": false,
      "delete_tag": false
    },
    "pull_request": {
      "opened": false,
      "edited": false,
      "synchronize": false,
      "reopened": false,
      "labeled": false,
      "unlabeled": false
    },
    "deployment": {
      "created": true
    },
    "comment": {
      "created": false,
      "edited": false
    },
    "schedule": {
      "run": false
    }
  },
  "created_at": 1641314085,
  "created_by": "octokitty",
  "updated_at": 1641314085,
  "updated_by": "octokitty"
}
```
