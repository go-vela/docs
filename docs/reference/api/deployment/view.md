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
  "id": 1,
  "repo_id": 1,
  "url": "https://api.github.com/repos/github/octocat/deployments/1",
  "user": "octocat",
  "commit": "48afb5bdc41ad69bf22588491333f7cf71135163",
  "ref": "main",
  "task": "deploy:vela",
  "target": "production",
  "description": "Deployment request from Vela"
}
```
