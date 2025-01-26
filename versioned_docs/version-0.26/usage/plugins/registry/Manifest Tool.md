## Description

This plugin enables you to build and publish [Docker Manifest List](https://www.docker.com/)
or [OCI Image Index](https://github.com/opencontainers/image-spec/blob/main/image-index.md)
in a Vela pipeline.

Source Code: https://github.com/go-vela/vela-manifest-tool

Registry: https://hub.docker.com/r/target/vela-manifest-tool

## Usage

> **NOTE:**
>
> Users should refrain from using latest as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

Sample of building and publishing an image:

```yaml
steps:
  - name: publish_hello-world
    image: target/vela-manifest-tool:latest
    pull: always
    parameters:
      registry: index.docker.io
      repo: /octocat/hello-world
      tags: [ "latest" ]
      platforms:
        - linux/amd64
        - linux/arm64/v8
      component_template: /octocat/hello-world:latest-{{ .Os }}-{{ .Arch }}{{ if .Variant }}-{{ .Variant }}{{ end }}
```

NOTE: For vela-manifest-tool, unlike for vela-kaniko, the `repo` argument excludes the `registry` value. Said another
way, rather than using:

```yaml
parameters:
  registry: index.docker.io
  repo: index.docker.io/octocat/hello-world
  ...
  component_template: index.docker.io/octocat/hello-world:latest-{{ .Os }}-{{ .Arch }}{{ if .Variant }}-{{ .Variant }}{{ end }} 
```

You must instead use:

```yaml
parameters:
  registry: index.docker.io
  repo: /octocat/hello-world
  ...
  component_template: /octocat/hello-world:latest-{{ .Os }}-{{ .Arch }}{{ if .Variant }}-{{ .Variant }}{{ end }}
```

This is because manifest tool requires that all image repos referenced exist within the same registry. Resulting tags will
all be the concatenation of the registry with the repo.

Sample of building an image without publishing:

```yaml
steps:
  - name: publish_hello-world
    image: target/vela-manifest-tool:latest
    pull: always
    parameters:
+     dry_run: true
      registry: index.docker.io
      repo: /octocat/hello-world
      tags: [ "latest" ]
      platforms:
        - linux/amd64
        - linux/arm64/v8
      component_template: /octocat/hello-world:latest-{{ .Os }}-{{ .Arch }}{{ if .Variant }}-{{ .Variant }}{{ end }}
```

For every element of `tags:`, one spec file will be generated and (unless `dry_run: true`) pushed to the `registry:`.
For each manifest-tool spec file, the tag for the manifest list/image index will be `$registry$repo:$tag`. Then there will
be one element   in the `manifests:` list of the spec file for each element of the `platform:` argument. Platform is assumed
to be in `os/architecture/variant` format. Within the `component_template`, you can use Os, Arch, Variant (from the platform),
or Tag (from the top level `tags:`).

Note: The default component_template of `"{{.Repo}}:{{.Tag}}-{{.Os}}-{{.Arch}}{{if .Variant}}-{{.Variant}}{{end}}"` might
be sufficient for most needs if you follow that tagging convention. For example, if the builds for /octocat/hello-world created
the architecture specific image

- index.docker.io/octocat/hello-world:latest-linux-amd64
- index.docker.io/octocat/hello-world:latest-linux-arm64-v8

Then the following configuration would be sufficient due to defaults for tags, platforms, and component_template:

```yaml
steps:
  - name: publish_hello-world
    image: target/vela-manifest-tool:latest
    pull: always
    parameters:
      registry: index.docker.io
      repo: /octocat/hello-world
```

