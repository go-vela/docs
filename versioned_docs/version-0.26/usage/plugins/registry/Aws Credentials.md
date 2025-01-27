## Description

With OpenID Connect (OIDC), you can configure your pipeline to request a short-lived set of credentials from AWS.

Source Code: https://github.com/Cargill/vela-aws-credentials

Registry: https://hub.docker.com/r/cargill/vela-aws-credentials

## Prerequisites

### Adding the identity provider to AWS

To add the Vela OIDC provider to IAM, see the [AWS docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html).

- Provider URL: `https://<VELA API>/_services/token`.
- Audience: `sts.amazonaws.com`.

Terraform example:

```terraform
data "tls_certificate" "vela" {
  url = "https://vela-server.com/_services/token"
}

resource "aws_iam_openid_connect_provider" "vela" {
  url             = "https://vela-server.com/_services/token"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.vela.certificates[0].sha1_fingerprint]
}
```

### Configuring the IAM role

Review the [official AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html) for IAM roles with OIDC.

> **NOTE:** It is critical that the IAM trust policy has conditions to limit which Vela pipelines/steps are able to assume the IAM role.

The example below includes several conditions that limit the ability to assume the IAM role:

1. The `StringLike` condition on the `sub` claim with a wildcard operator (*) allows any branch or pull request merge branch from the `octo-org/octo-repo` organization and repository to assume the IAM role in AWS.
2. The `StringLike` condition on the `image` claim with a wildcard operator (*) permits only steps that use the `golang:<tag>` image to assume the IAM role in AWS.
3. The `StringEquals` condition on the `aud` claim ensures that only tokens with the audience of `sts.amazonaws.com` can assume the IAM role in AWS. `sts.amazonaws.com` is the default audience when utilizing this plugin.
4. The `StringEquals` condition on the `commands` claim ensures that only steps without a `commands` section can assume the IAM role in AWS.

> **NOTE:** AWS requires that all conditions must be met for the role assumption to succeed. If any condition is not met, the role assumption will fail.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::123456123456:oidc-provider/vela-server.com/_services/token"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringLike": {
                    "vela-server.com/_services/token:sub": "repo:octo-org/octo-repo:*",
                    "vela-server.com/_services/token:image": "golang:*"
                },
                "StringEquals": {
                    "vela-server.com/_services/token:aud": "sts.amazonaws.com",
                    "vela-server.com/_services/token:commands": false
                }
            }
        }
    ]
}
```

The full list of claims that Vela exposes to AWS can be found within [the Vela docs](https://go-vela.github.io/docs/usage/open_id_connect/#id-token-claims).

Terraform example:

```terraform
data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = [ "sts:AssumeRoleWithWebIdentity" ]
    principals {
      identifiers = [ aws_iam_openid_connect_provider.vela.arn ]
      type = "Federated"
    }

    condition {
      test = "StringLike"
      variable = "vela-server.com/_services/token:sub"
      values = ["repo:octo-org/octo-repo:*"]
    }

    condition {
      test = "StringLike"
      variable = "vela-server.com/_services/token:image"
      values = ["golang:*"]
    }

    condition {
      test = "StringEquals"
      variable = "vela-server.com/_services/token:aud"
      values = ["sts.amazonaws.com"]
    }

    condition {
      test = "StringEquals"
      variable = "vela-server.com/_services/token:commands"
      values = [false]
    }
  }
}

resource "aws_iam_role" "test_role" {
  name = "test_role"

  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}
```

## Usage

> **NOTE:**
>
> Users should refrain from using latest as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

Example of generating credentials:

```yaml
steps:
  - name: generate_aws
    image: cargill/vela-aws-credentials:latest
    id_request: yes
    parameters:
      role: "arn:aws:iam::123456123456:role/test"
```

Example of generating credentials with a different region:

```diff
steps:
  - name: generate_aws
    image: cargill/vela-aws-credentials:latest
    id_request: yes
    parameters:
      role: "arn:aws:iam::123456123456:role/test"
+     region: "us-west-2"
```

Sample of generating credentials, writing credentials script, and utilizing them with the AWS CLI:

```yaml
steps:
  - name: generate_aws
    image: cargill/vela-aws-credentials:latest
    id_request: yes
    parameters:
      role: "arn:aws:iam::123456123456:role/test"
      script_write: true

  - name: test_aws
    image: amazon/aws-cli:latest
    commands:
      - source /vela/secrets/aws/setup.sh
      - aws sts get-caller-identity
```

## Parameters

> **NOTE:**
>
> The plugin supports reading all parameters via environment variables or files.
>
> Any values set from a file take precedence over values set from the environment.

The following parameters are used to configure the image:

| Name                       | Description                                                                                                                                                                    | Required | Default                                                                             | Environment Variables                                                              |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| `role`                     | AWS IAM Role ARN for which to generate credentials                                                                                                                             | `true`   | `N/A`                                                                               | `PARAMETER_ROLE`<br/>`AWS_CREDENTIALS_ROLE`                                         |
| `region`                   | AWS region where you want to obtain credentials.                                                                                                                               | `false`  | `us-east-1`                                                                         | `PARAMETER_REGION`<br/>`AWS_CREDENTIALS_REGION`                                     |
| `role_duration_seconds`    | Assumed role duration in seconds.                                                                                                                                              | `false`  | `3600`                                                                              | `PARAMETER_ROLE_DURATION_SECONDS`<br/>`AWS_CREDENTIALS_ROLE_DURATION_SECONDS`       |
| `role_session_name`        | Session name to use when assuming the role.                                                                                                                                    | `false`  | `vela`                                                                              | `PARAMETER_ROLE_SESSION_NAME`<br/>`AWS_CREDENTIALS_ROLE_SESSION_NAME`               |
| `log_level`                | Log level for the plugin.                                                                                                                                                      | `false`  | `info`                                                                              | `PARAMETER_LOG_LEVEL`<br/>`AWS_CREDENTIALS_LOG_LEVEL`                               |
| `audience`                 | Audience to use for the OIDC provider.                                                                                                                                         | `false`  | `sts.amazonaws.com`                                                                 | `PARAMETER_AUDIENCE`<br/>`AWS_CREDENTIALS_AUDIENCE`                                 |
| `verify`                   | If the AWS credentials should be verified.                                                                                                                                     | `false`  | `false`                                                                             | `PARAMETER_VERIFY`<br/>`AWS_CREDENTIALS_VERIFY`                                     |
| `script_path`              | Path where to write script that contains AWS credentials                                                                                                                       | `false`  | `/vela/secrets/aws/setup.sh` (shell) or `/vela/secrets/aws/creds` (credential_file) | `PARAMETER_SCRIPT_PATH`<br/>`AWS_CREDENTIALS_SCRIPT_PATH`                           |
| `script_write`             | If the credentials script should be created.                                                                                                                                   | `false`  | `false`                                                                             | `PARAMETER_SCRIPT_WRITE`<br/>`AWS_CREDENTIALS_SCRIPT_WRITE`                         |
| `script_format`            | Format of file to write (shell or credential_file)                                                                                                                             | `false`  | `N/A`                                                                               | `PARAMETER_SCRIPT_FORMAT`<br/>`AWS_CREDENTIALS_SCRIPT_FORMAT`                       |
| `inline_session_policy`    | An IAM policy in JSON format that you want to use as an inline session policy when assuming the IAM role.                                                                      | `false`  | `N/A`                                                                               | `PARAMETER_INLINE_SESSION_POLICY`<br/>`AWS_CREDENTIALS_INLINE_SESSION_POLICY`       |
| `managed_session_policies` | List of ARNs of the IAM managed policies that you want to use as managed session policies when assuming the IAM role. The policies must exist in the same account as the role. | `false`  | `N/A`                                                                               | `PARAMETER_MANAGED_SESSION_POLICIES`<br/>`AWS_CREDENTIALS_MANAGED_SESSION_POLICIES` |

## Troubleshooting

You can start troubleshooting this plugin by tuning the level of logs being displayed:

```diff
steps:
  - name: message
    image: cargill/vela-aws-credentials:latest
    pull: always
    id_request: yes
    parameters:
+     log_level: trace
      role: "arn:aws:iam::123456123456:role/test"
```