## Description

This plugin uses [Grafana k6](https://k6.io/) to run performance tests in a Vela pipeline.

Source Code: https://github.com/go-vela/vela-k6

Registry: https://hub.docker.com/r/target/vela-k6

## Usage

Below is a simple example using the plugin. In this hypothetical repository, the k6 test script is located at `./k6-test/script.js`. In this step, a file named `test-results.json` will be created in the current directory with the test results.

```yaml
- name: k6-performance-test
  image: target/vela-k6:v0.1.0
  ruleset:
    event: [tag]
  pull: true
  parameters:
    script_path: ./k6-test/script.js
    output_path: ./test-results.json
```

Example using `projektor_compat_mode` parameter, which generates output with the `--summary-export` flag instead of the recommended `--out` flag. This ensures compatibility with [Projektor](https://projektor.dev/) test result visualization:

```yaml
- name: k6-performance-test
  image: target/vela-k6:v0.1.0
  ruleset:
    event: [tag]
  pull: true
  parameters:
    script_path: ./k6-test/script.js
    output_path: ./test-results.json
    projektor_compat_mode: true

- name: projektor-publish
  image: node:alpine
  ruleset:
    event: [tag]
  pull: true
  commands:
    - npm install -g projektor-publish
    - npx projektor-publish --serverUrl=https://my-projektor-server.dev --performance="./test-results.json"
```

> **NOTE:**
>
> Projektor will not accept performance test results unless the below stats are included

For your results to be accepted by your Projektor server, the k6 script's `options.summaryTrendStats` MUST include the following:

```js
export const options = {
  summaryTrendStats: ["p(95)", "p(90)", "avg", "min", "max", "med"],
  ...
};
```

## Parameters

> **NOTE:**
>
> The plugin supports reading all parameters via environment variables or files.
>
> Any values set from a file take precedence over values set from the environment.

The following parameters are used to configure the image:

| Name                       | Description                                                                                                                                                                                                                          | Required | Default |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------- |
| `script_path`              | path to the k6 script file. must be a JavaScript file satisfying the pattern `^(\./\|(\.\./)+)?[a-zA-Z0-9-_/]*[a-zA-Z0-9]\.js$`.                                                                                                     | `true`   | `N/A`   |
| `output_path`              | path to the output file that will be created. directories will be created as necessary. if empty, no output file will be generated. must be a JSON file satisfying the pattern `^(\./\|(\.\./)+)?[a-zA-Z0-9-_/]*[a-zA-Z0-9]\.json$`. | `false`  | `N/A`   |
| `setup_script_path`        | path to an optional setup script file to be run before tests. must be a shell script (sh or bash) with execute permissions matching the pattern `^(\./\|(\.\./)+)?[a-zA-Z0-9-_/]*[a-zA-Z0-9]\.sh$`.                                  | `false`  | `N/A`   |
| `fail_on_threshold_breach` | if `false`, the pipeline step will not fail even if thresholds are breached.                                                                                                                                                         | `false`  | `true`  |
| `projektor_compat_mode`    | if `true`, output will be generated with the `--summary-output` flag instead of the `--out` flag. this is necessary for results uploaded to a [Projektor](https://projektor.dev/) server.                                            | `false`  | `false` |
| `log_progress`             | if `true`, k6 progress bar output will print to the Vela pipeline. Not recommended for numerous or long-running tests, as logging becomes excessive.                                                                                 | `false`  | `false` |
