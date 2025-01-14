---
title: "Skipping a Build"
linkTitle: "Skipping a Build"
description: >
  Skip builds for certain commits.
---

To prevent Vela from running a build for a commit, add one of the following to your commit title or message:

- `[skip ci]`
- `[ci skip]`
- `[skip vela]`
- `[vela skip]`
- `***no_ci***`

:::note
You can use upper or lower case.
:::

Vela will receive the payload from the source control provider and return a 200 response with a reason for why a build was not triggered.