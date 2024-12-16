---
slug: first-blog-post
title: Welcome to the Vela Prototype
authors: [vader, sanders]
tags: [cicd, vela]
---

Welcome to the Vela (VEE-la) docsite! This page covers the core components of building pipelines. We will walk through the components that make up a pipeline and show how/where they are used inside a Vela YAML file (Can be .vela.yml or .vela.yaml) at the base of a GitHub repository.

<!-- truncate -->

Vela has a few core pipeline types known as steps, stages, and templates. Steps pipelines should be used in situations when everything in the workflow needs to be accomplished sequentially. Stages are pipelines that are leveraged when workflows can or need to run in parallel. Lastly, templates, the goal with these pipelines is to identify one too many tasks that can be abstracted and used repeatedly. A common use case for templates is matrix builds. Accomplishing a set of tasks with slight variations between them.

All tasks in Vela pipelines execute commands inside ephemeral Docker containers. By integrating with Docker we provide isolation between steps and allow for safe execution of concurrent tasks on the same machine. Using containers also empowers users to customize the build dependencies or automation utilities they want Vela to perform within their pipeline.

A plugin is a Docker container that performs a pre-defined set of tasks and typically is configured as a step in pipelines. Plugins can be used to deploy code, publish artifacts, send notifications, and much more. Additionally, for even more powerful workflows you can string together a set of plugins into a single template to create reusable pipelines across your applications. Users can create one or many templates, to be stored in separate files, and then reference each template in the full pipeline configuration.
