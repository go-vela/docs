---
title: "Service"
linkTitle: "Service"
description: >
  Learn how to update a service as an admin in the system.
---

## Endpoint

```
PUT  /api/v1/admin/service
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

Note: You must provide the entire service object, as this endpoint overwrites the
existing entry for the service.

#### File

```json
{
  "id": 1,
  "build_id": 1,
  "repo_id": 1,
  "number": 1,
  "name": "clone",
  "status": "failure",
  "error": "",
  "exit_code": 0,
  "created": 1563475419,
  "started": 1563475420,
  "finished": 1563475421
}
```

#### Request

```sh
curl \
  -X PUT \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d "@data.json" \
  "http://127.0.0.1:8080/api/v1/admin/service"
```

#### Response

```json
{
  "id": 1,
  "build_id": 1,
  "repo_id": 1,
  "number": 1,
  "name": "clone",
  "status": "failure",
  "error": "",
  "exit_code": 0,
  "created": 1563475419,
  "started": 1563475420,
  "finished": 1563475421
}
```
