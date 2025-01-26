## Description

This plugin enables you to send data to an email.

Source Code: https://github.com/go-vela/vela-email

Registry: https://hub.docker.com/r/target/vela-email

## Usage

> **NOTE:**
>
> Users should refrain from using latest as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

### Sample for .vela.yml

```yaml
secrets:
  - name: username
    engine: native
    key: vela/noreply/username
    type: shared

  - name: password
    engine: native
    key: vela/noreply/password
    type: shared

steps:
  - name: email on success
    image: target/vela-email:latest
    pull: not_present
    secrets: [username, password]
    ruleset:
      status: success
    parameters:
      from: vela-noreply@fakemail.com
      to: [one@email.com, two@email.com]
      sendtype: StartTLS
      auth: LoginAuth
      host: smtp.youremailserver.com
      port: 587
      subject: "{{ .VELA_BUILD_COMMIT }}"
      text: "Author: {{ .VELA_BUILD_AUTHOR }} - Branch: {{ .VELA_BUILD_BRANCH }}"

  - name: email on failure
    image: target/vela-email:latest
    pull: not_present
    secrets: [username, password]
    ruleset:
      status: failure
    parameters:
      from: vela-noreply@fakemail.com
      to: [one@email.com, two@email.com]
      sendtype: StartTLS
      auth: LoginAuth
      host: smtp.youremailserver.com
      port: 587
      subject: "{{ .VELA_BUILD_COMMIT }}"
      text: "Author: {{ .VELA_BUILD_AUTHOR }} - Branch: {{ .VELA_BUILD_BRANCH }}"
```

### Sample for .vela.yml with attachment

```yaml
secrets:
  - name: username
    engine: native
    key: vela/noreply/username
    type: shared

  - name: password
    engine: native
    key: vela/noreply/password
    type: shared

steps:
  - name: email on success
    image: target/vela-email:latest
    pull: not_present
    secrets: [username, password]
    ruleset:
      status: success
    parameters:
      filename: <filename>
      sendtype: StartTLS
      auth: LoginAuth
      host: smtp.youremailserver.com
      port: 587

  - name: email on failure
    image: target/vela-email:latest
    pull: not_present
    secrets: [username, password]
    ruleset:
      status: failure
    parameters:
      filename: <filename>
      sendtype: StartTLS
      auth: LoginAuth
      host: smtp.youremailserver.com
      port: 587
```

### Sample for email attachment

```text
From: vela-noreply@fakemail.com
To: emailone@email.com, emailtwo@email.com
Subject: Vela Pipeline for {{ .VELA_REPO_FULL_NAME }} {{ .VELA_BUILD_BRANCH }}
Content-Type: text/plain

BuildAuthor:        {{ .VELA_BUILD_AUTHOR }}
BuildAuthorEmail:   {{ .VELA_BUILD_AUTHOR_EMAIL }}
BuildBranch:        {{ .VELA_BUILD_BRANCH }}
BuildCommit:        {{ .VELA_BUILD_COMMIT }}
BuildCreated:       {{ .BuildCreated }}
BuildMessage:       {{ .VELA_BUILD_MESSAGE }}
BuildNumber:        {{ .VELA_BUILD_NUMBER }}
RepositoryFullName: {{ .VELA_REPO_FULL_NAME }}
RepositoryLink:     {{ .VELA_REPO_LINK }}
```

## Secrets

> **NOTE:** Users should refrain from configuring sensitive information in your pipeline in plain text.

### Internal

The plugin accepts the following `parameters` for authentication:

| Parameter  | Environment Variable Configuration |
| ---------- | ---------------------------------- |
| `username` | `PARAMETER_USERNAME`, `USERNAME`   |
| `password` | `PARAMETER_PASSWORD`, `PASSWORD`   |

Users can use [Vela internal secrets](https://go-vela.github.io/docs/tour/secrets/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: email
    image: target/vela-email:latest
    pull: always
+   secrets: [ username, password ]
    parameters:
-     username: usernameexample@email.com
```

> This example will add the secret to the `email` step as environment variables:
>
> - `USERNAME=value`

### External

The plugin accepts the following files for authentication:

| Parameter  | Volume Configuration                                              |
| ---------- | ----------------------------------------------------------------- |
| `username` | `/vela/parameters/email/username`, `/vela/secrets/email/username` |
| `password` | `/vela/parameters/email/password`, `/vela/secrets/email/password` |

Users can use [Vela external secrets](https://go-vela.github.io/docs/concepts/pipeline/secrets/origin/) to substitute these sensitive values at runtime:

```diff
steps:
  - name: email
    image: target/vela-email:latest
    pull: always
    parameters:
-     username: usernameexample@email.com
```

> This example will read the secret value in the volume stored at `/vela/secrets/`

## Parameters

> **NOTE:**
>
> Any values set from a file take precedence over values set from the environment.
>
> VELA environments can be found at [VELA Environments](https://go-vela.github.io/docs/reference/environment/)
>
> All environment variables are wrapped in sprig template. More information on sprig can be found at [sprig docs](http://masterminds.github.io/sprig/)

The following parameters are used to configure the image:

### Logging

| Parameter   | Description                                                                | Required | Default | Environment Variables                      |
| ----------- | -------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------ |
| `log_level` | set the log level for the plugin (valid options: `info`, `debug`, `trace`) | `true`   | `info`  | `PARAMETER_LOG_LEVEL`<br/>`EMAIL_LOG_LEVEL` |

### Email

| Parameter     | Description                                                       | Required | Default           | Environment Variables                          |
| ------------- | ----------------------------------------------------------------- | -------- | ----------------- | ---------------------------------------------- |
| `from`        | who the email is being sent from                                  | true     | N/A               | `PARAMETER_FROM`<br/>`EMAIL_FROM`               |
| `to`          | who the email is being sent to                                    | true     | N/A               | `PARAMETER_TO`<br/>`EMAIL_TO`                   |
| `cc`          | carbon copy of the email to be sent to                            | false    | N/A               | `PARAMETER_CC`<br/>`EMAIL_CC`                   |
| `bcc`         | blind carbon copy of the email to be sent to                      | false    | N/A               | `PARAMETER_BCC`<br/>`EMAIL_BCC`                 |
| `sender`      | who the email being sent from (will overwrite from)               | false    | N/A               | `PARAMETER_SENDER`<br/>`EMAIL_SENDER`           |
| `replyto`     | email address that will be used for replies                       | false    | N/A               | `PARAMETER_REPLYTO`<br/>`EMAIL_REPLYTO`         |
| `subject`     | subject of the email                                              | false    | default subject   | `PARAMETER_SUBJECT`<br/>`EMAIL_SUBJECT`         |
| `text`        | body of the email in plain text format (HTML will overwrite TEXT) | false    | N/A               | `PARAMETER_TEXT`<br/>`EMAIL_TEXT`               |
| `html`        | body of the email in hmtl format (HTML will overwrite TEXT)       | false    | default html body | `PARAMETER_HTML`<br/>`EMAIL_HTML`               |
| `readreceipt` | delivery confirmation                                             | false    | N/A               | `PARAMETER_READRECEIPT`<br/>`EMAIL_READRECEIPT` |

> **NOTE:**
>
> The parameters To, CC, BCC and ReplyTo accepts an array of emails in the format of:
>
> - [ one@email.com, two@email.com ] or
>
> - [ firstname lastname one@email.com, firstname lastname two@email.com ]
>
> Subject, Text body, and HTML body will accept VELA environments with the use of `{{  }}` such as:
>
> - `{{ .VELA_REPO_FULL_NAME }}`

### Attachment

| Parameter    | Description                    | Required | Default | Environment Variables                        |
| ------------ | ------------------------------ | -------- | ------- | -------------------------------------------- |
| `attachment` | file will be attached to email | false    | N/A     | `PARAMETER_ATTACHMENT`<br/>`EMAIL_ATTACHMENT` |

### Email Filename

| Parameter  | Description                                               | Required | Default | Environment Variables                    |
| ---------- | --------------------------------------------------------- | -------- | ------- | ---------------------------------------- |
| `filename` | data in attached file will be used to populate the email. | false    | N/A     | `PARAMETER_FILENAME`<br/>`EMAIL_FILENAME` |

### SMTP

| Parameter  | Description   | Required | Default | Environment Variables                    |
| ---------- | ------------- | -------- | ------- | ---------------------------------------- |
| `host`     | SMTP host     | true     | N/A     | `PARAMETER_HOST`<br/>`EMAIL_HOST`         |
| `port`     | SMTP port     | true     | N/A     | `PARAMETER_PORT`<br/>`EMAIL_PORT`         |
| `username` | SMTP username | true     | N/A     | `PARAMETER_USERNAME`<br/>`EMAIL_USERNAME` |
| `password` | SMTP password | true     | N/A     | `PARAMETER_PASSWORD`<br/>`EMAIL_PASSWORD` |

### TLS

| Parameter            | Description                                                                                                                                              | Required | Default   | Environment Variables                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | -------------------------------------------- |
| `servername`         | default is set to host address of SMTP server                                                                                                            | false    | SMTP host | `PARAMETER_SERVERNAME`<br/>`EMAIL_SERVERNAME` |
| `insecureskipverify` | verification of the server's certificate chain and host name. Only use true for testing purposes as this makes TLS susceptible to man-in-middle attacks. | false    | false     | `PARAMETER_SKIPVERIFY`<br/>`EMAIL_SKIPVERIFY` |

### Encryption

| Parameter  | Description                                                       | Required | Default  | Environment Variables                    |
| ---------- | ----------------------------------------------------------------- | -------- | -------- | ---------------------------------------- |
| `sendtype` | security to send email (valid option: `Plain`, `StartTLS`, `TLS`) | true     | StartTLS | `PARAMETER_SENDTYPE`<br/>`EMAIL_SENDTYPE` |

### Authentication

| Parameter | Description                                                   | Required | Default   | Environment Variables            |
| --------- | ------------------------------------------------------------- | -------- | --------- | -------------------------------- |
| `auth`    | login authentication (valid option: `PlainAuth`, `LoginAuth`) | true     | LoginAuth | `PARAMETER_AUTH`<br/>`EMAIL_AUTH` |

> **NOTE:**
>
> PlainAuth using smtp/auth login for SMTP server.
>
> LoginAuth using a custom login for Office 365/Exchange SMTP server.

## Variables

The Plugin provides the following User friendly timestamp variables that can be used in a subject, text, HTML template.
These timestamps are converted to Unix timestamps in UTC.

- BuildCreated
- BuildEnqueued
- BuildFinished
- BuildStarted

## Defaults

> **NOTE:**
> Context-Type options are as follow:
>
> - text/html for HTML based body of message.
> - text/plain for TEXT based body of message.

### Default subject

```text
{{ .VELA_REPO_FULL_NAME }} {{ .VELA_BUILD_BRANCH }} - {{ .VELA_BUILD_COMMIT }}
```

### Default body in HTML

```html
<table>
  <tbody>
    <tr>
      <td width="600">
        <div>
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td>
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td>Build Number:</td>
                        <td>
                          <a href="{{ .VELA_BUILD_LINK }}">
                            {{ .VELA_BUILD_NUMBER }}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Repo:</td>
                        <td>{{ .VELA_REPO_FULL_NAME }}</td>
                      </tr>
                      <tr>
                        <td>Author:</td>
                        <td>
                          {{ .VELA_BUILD_AUTHOR }} ({{ .VELA_BUILD_AUTHOR_EMAIL
                          }})
                        </td>
                      </tr>
                      <tr>
                        <td>Branch:</td>
                        <td>{{ .VELA_BUILD_BRANCH }}</td>
                      </tr>
                      <tr>
                        <td>Commit:</td>
                        <td>{{ .VELA_BUILD_COMMIT }}</td>
                      </tr>
                      <tr>
                        <td>Started at:</td>
                        <td>{{ .BuildCreated }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td>{{ .VELA_BUILD_MESSAGE }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</table>
```

## Template

COMING SOON!

## Troubleshooting

You can start troubleshooting this plugin by tuning the level of logs being displayed:

```diff
steps:
  - name: send email
    image: target/vela-email:latest
    pull: always
    parameters:
+     log_level: trace
      ...
```

Below are a list of common problems and how to solve them:
