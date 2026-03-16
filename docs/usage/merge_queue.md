---
title: "Merge Queue"
toc: true
description: >
  Learn how to configure GitHub merge queue with Vela.
---

:::tip
Merge Queue functionality is only available for Vela installations with the GitHub Source Control Management system.
:::

### What is merge queue?

Merge queue is a git branch strategy designed for high-throughput and long CI builds. More information can be found in the [GitHub documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue).

### How to enable in Vela

Since Vela reports statuses based on the webhook event that triggered the build, most required statuses configured for branch protection will be one or more of:

- vela/push
- vela/pull_request
- vela/comment

In order to enable merge queue support for your repository, update the repository's `merge queue events` (located in the settings page in the Vela UI) to reflect the same events that are _required statuses_ for the branch.

It will also be necessary to make updates to the Vela pipeline file. For every step that is required to run to protect a branch (e.g. test suite, binary build), the `merge_group` event must be added to the ruleset — if one exists. 

```yaml
version: "1"

steps:
  # will run on push-to-main, PR against main, and merge queue targeting main
  - name: test
    image: golang:latest
    ruleset:
      event: [ push, pull_request, merge_group ]
      branch: main
    commands:
      - go test ./...

  # will run on all allowed events, including merge queue
  - name: build
    image: golang:latest
    commands:
      - go build ./...
```

### Auto Canceling

With merge queue, if a required status fails for a job at the front of the queue, all running jobs behind it are invalidated. To minimize worker blockage and reduce strain on the repository concurrent build limit, Vela will automatically cancel these stale jobs.
