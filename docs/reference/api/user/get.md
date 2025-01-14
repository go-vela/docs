---
title: "Get"
linkTitle: "Get"
description: >
  Learn how to list users.
---

## Endpoint

```
GET  /api/v1/users
```

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

To authenticate to the API, please review the [authentication documentation](/docs/reference/api/authentication/).
:::

#### Request

```sh
curl \
  -X GET \
  -H "Authorization: Bearer <token>" \
  "http://127.0.0.1:8080/api/v1/users"
```

#### Response

```json
[
  {
    "id": 2,
    "name": "octocat",
    "token": null,
    "favorites": ["github/octocat"],
    "active": true,
    "admin": false
  },
  {
    "id": 1,
    "name": "OctoKitty",
    "token": null,
    "favorites": ["github/octocat"],
    "active": true,
    "admin": false
  }
]
```
