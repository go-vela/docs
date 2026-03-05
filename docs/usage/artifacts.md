---
title: "Artifacts"
toc: true
description: >
  Learn how to collect and store build artifacts from your pipeline steps.
---

:::tip
Artifacts functionality is only available in the Docker runtime and requires the Vela server to be configured with an S3-compatible object storage backend.
:::

### What are artifacts?

Artifacts are files produced by a pipeline step — such as test reports, screenshots, videos, or build binaries — that you want to preserve after the build completes. By declaring `artifacts.paths` on a step, Vela will automatically collect matching files from the step's workspace and upload them to configured object storage once the step finishes.

### Usage

Add an `artifacts` block to any step with a `paths` list of glob patterns:

```yaml
version: "1"

steps:
  - name: cypress_tests
    image: cypress/browsers:node-20.16.0-chrome-127.0.6533.119-1-ff-129.0.1-edge-127.0.2651.98-1
    commands:
      - npm install
      - npm run cy:run
    artifacts:
      paths:
        - cypress/screenshots/**/*.png
        - cypress/videos/**/*.mp4
        - test-results/*.xml
        - coverage/**/*.xml
```

After the step completes, Vela searches the step's workspace for any files matching those patterns and uploads them to object storage. The files are stored under the path:

```
{org}/{repo}/{build_number}/{filename}
```

#### Another example — Go test reports

```yaml
version: "1"

steps:
  - name: test
    image: golang:latest
    commands:
      - go test -v ./... 2>&1 | tee test-output.txt
      - go test -json ./... > test-results.json
    artifacts:
      paths:
        - test-output.txt
        - test-results.json
```

### Downloading artifacts

Once a build has completed, artifacts can be downloaded from the **Artifacts** tab on the build page in the Vela UI. Each artifact is listed by filename with a download link backed by a temporary presigned URL, allowing direct access to the file from object storage without requiring any additional credentials.

### File size limits

The worker enforces limits on artifact uploads to prevent runaway storage usage:

- **Per-file limit** — files exceeding the configured per-file size limit are skipped.
- **Per-build limit** — once the total uploaded bytes for a build reaches the configured build-level limit, remaining files are skipped.

Files that are skipped due to size limits are logged at the worker level. Contact your Vela administrator for the limits configured on your installation.

### Server configuration

Artifacts require the Vela server to be configured with an S3-compatible object storage backend (e.g. MinIO). The following environment variables must be set on the server:

| Variable                  | Description                                         |
|---------------------------|-----------------------------------------------------|
| `VELA_STORAGE_ENABLE`     | Set to `true` to enable storage (default: `false`)  |
| `VELA_STORAGE_DRIVER`     | Object storage driver (e.g. `minio`)                |
| `VELA_STORAGE_ADDRESS`    | Storage endpoint (e.g. `https://minio.example.com`) |
| `VELA_STORAGE_ACCESS_KEY` | Storage access key                                  |
| `VELA_STORAGE_SECRET_KEY` | Storage secret key                                  |
| `VELA_STORAGE_BUCKET`     | Bucket name to store artifacts in                   |
| `VELA_STORAGE_USE_SSL`    | Set to `true` to enable SSL (default: `false`)      |

If storage is not enabled on the server, any step with `artifacts.paths` will be skipped silently and the build will continue normally.

### Limitations

- Artifacts are only supported in the **Docker runtime**. The Kubernetes runtime does not support artifact collection.
- Glob patterns are evaluated relative to the step's workspace root. Only regular files are collected — directories and symlinks are excluded.
- Only the **filename** (basename) is preserved in storage, not the full path. If two different paths resolve to files with the same filename, only one will be stored.
- Artifacts are not available for download until the step that declares them has completed.
- The `artifacts` key is supported on `steps` only, not on `services`.
