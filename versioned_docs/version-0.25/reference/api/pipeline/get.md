---
title: "Get"
linkTitle: "Get"
description: >
  Learn how to list pipelines.
---

## Endpoint

```
GET  /api/v1/pipelines/:org/:repo
```

## Parameters

The following parameters are used to configure the endpoint:

| Name       | Description          |
|------------|----------------------|
| `org`      | name of organization |
| `repo`     | name of repository   |

## Permissions

COMING SOON!

## Responses

| Status Code | Description                                              |
| ----------- |----------------------------------------------------------|
| `200`       | indicates the request has succeeded                      |
| `400`       | unable to retrieve the pipeline configuration            |
| `401`       | indicates the user does not have proper permissions      |
| `404`       | unable to retrieve the pipeline configuration            |
| `500`       | system error while retrieving the pipeline configuration |

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
  "http://127.0.0.1:8080/api/v1/pipelines/github/octocat"
```

#### Response

```json
[
  {
    "id": 2,
    "repo_id": 1,
    "commit": "a49aaf4afae6431a79239c95247a2b169fd9f067",
    "flavor": "",
    "platform": "",
    "ref": "refs/heads/main",
    "type": "yaml",
    "version": "1",
    "external_secrets": false,
    "internal_secrets": false,
    "services": false,
    "stages": false,
    "steps": true,
    "templates": false,
    "data": "LS0tCnZlcnNpb246ICIxIgoKc3RlcHM6CiAgLSBuYW1lOiBlY2hvCiAgICBpbWFnZTogYWxwaW5lOmxhdGVzdAogICAgY29tbWFuZHM6IFtlY2hvIGZvb10="
  },
  {
    "id": 1,
    "repo_id": 1,
    "commit": "48afb5bdc41ad69bf22588491333f7cf71135163",
    "flavor": "",
    "platform": "",
    "ref": "refs/heads/main",
    "type": "yaml",
    "version": "1",
    "external_secrets": false,
    "internal_secrets": false,
    "services": false,
    "stages": false,
    "steps": true,
    "templates": false,
    "data": "LS0tCnZlcnNpb246ICIxIgoKc3RlcHM6CiAgLSBuYW1lOiBlY2hvCiAgICBpbWFnZTogYWxwaW5lOmxhdGVzdAogICAgY29tbWFuZHM6IFtlY2hvIGZvb10="
  }
]
```