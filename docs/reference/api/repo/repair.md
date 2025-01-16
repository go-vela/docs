---
title: "Repair"
linkTitle: "Repair"
description: >
  Learn how to restore a repo.
---

## Endpoint

```
PATCH  /api/v1/repos/:org/:repo/repair
```

## Parameters

The following parameters are used to configure the endpoint:

| Name   | Description          |
| ------ | -------------------- |
| `org`  | name of organization |
| `repo` | name of repository   |

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
  -X PATCH \
  -H "Authorization: Bearer <token>" \
  "http://127.0.0.1:8080/api/v1/repos/github/octocat/repair"
```

#### Response

```
Repo github/octocat repaired
```
