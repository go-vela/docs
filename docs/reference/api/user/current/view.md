---
title: "View"
linkTitle: "View"
description: >
  Learn how to inspect the current user.
---

## Endpoint

```
GET  /api/v1/user
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
  "http://127.0.0.1:8080/api/v1/user"
```

#### Response

```json
{
  "id": 1,
  "name": "OctoKitty",
  "token": null,
  "favorites": ["github/octocat"],
  "active": true,
  "admin": false
}
```
