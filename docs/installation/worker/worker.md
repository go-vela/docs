---
sidebar_position: 1
---

# Worker

Known as the brawn of the Vela application, this service is responsible for managing the state of build resources.

This includes pulling the build, provided by the [server](/docs/installation/server/overview.md), from the queue to be run.

When a build is fetched from the queue, the worker will create and delete resources through the lifecycle of the build.

During this time, the worker will send API requests to the server to report the status and progress of these resources.

Additionally, the worker has its own API for processing web requests.

![Build Workflow](/img/build_workflow.png)

## Deployment Guides

Vela supports a number of deployment strategies to enable the preferences of you and your team.

This section provides a list of comprehensive guides to install and start the worker:

### Docker

From the [Docker official website](https://docker.io/):

> Docker takes away repetitive, mundane configuration tasks and is used throughout the development lifecycle for fast, easy and portable application development - desktop and cloud. Docker’s comprehensive end to end platform includes UIs, CLIs, APIs and security that are engineered to work together across the entire application delivery lifecycle.

Please refer to [our Docker deployment guide](/docs/installation/server/docker.md) to get started.


