# Ansible

## Description

This plugin is designed for using ansible-playbook and ansible-lint in a Vela pipeline.

Source Code: https://github.com/go-vela/vela-ansible

Registry: https://hub.docker.com/r/target/vela-ansible

## Usage

> **NOTE:**
>
> Users should refrain from using latest as the tag for the Docker image.
>
> It is recommended to use a semantically versioned tag instead.

More information for ansible-lint can be found at: [ansible-lint docs](https://ansible-lint.readthedocs.io/en/latest/). \
More information for ansible-playbook can be found at: [ansible-playbook docs](https://ansible-lint.readthedocs.io/en/latest/).

### Sample for .vela.yml

```yaml
steps:
  - name: ansible-lint
    image: target/vela-ansible:latest
    parameters:
      action: lint
      playbook: "abox/main.yml"
      lint_skip:
        - no-changed-when
        - key-order

  - name: ansible-playbook
    image: target/vela-ansible:latest
    parameters:
      action: playbook
      playbook: "abox/main.yml"
      options_inventory: "abox/inventory/hosts.yml"
      connection_user: root
```

## Parameters

The following parameters are used to configure the image:

| Parameter   | Description                                                                | Required | Default |
| ----------- | -------------------------------------------------------------------------- | -------- | ------- |
| `log_level` | set the log level for the plugin (valid options: `info`, `debug`, `trace`) | true     | info    |
| `action `   | set plugin action (valid options: `lint`, `playbook`)                       | true     | lint    |

> Note: `action` parameter will determine whether to run ansible-lint or ansible-playbook. The default is set to ansible-lint.

### Ansible-Lint

| Parameter                | Description                                                                                                                                                                                                          | Required | Default       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| `playbook`               | playbook to be ran by ansible-lint                                                                                                                                                                                   | true     | false         |
| `lint_version`           | returns ansible-lint version and exits the program.                                                                                                                                                                  | false    | false         |
| `lint_list`              | lists all the rules.                                                                                                                                                                                                 | false    | false         |
| `lint_format`            | format used rules output (rich,plain,rst,codeclimate,quiet,pep8)                                                                                                                                                     | false    | rich          |
| `lint_quieter`           | quieter, although not silent output.                                                                                                                                                                                 | false    | false         |
| `lint_parseable`         | parseable output in the format of pep8.                                                                                                                                                                              | false    | false         |
| `lint_parseableseverity` | parseable output including severity of rule.                                                                                                                                                                         | false    | false         |
| `lint_progressive`       | return success if it detects a reduction in number of violations compared with previous git commit. This feature works only in git repositories.                                                                     | false    | false         |
| `lint_projectdir`        | location of project/repository, autodetected based on location of configuration file.                                                                                                                                | false    | N/A           |
| `lint_rule`              | specify one or more rules directories. -r flag (lint_rule) overrides the default rules in /path/to/ansible-lint/lib/ansiblelint/rules, unless -R (lint_rulesdefault) is also used.                                   | false    | N/A           |
| `lint_rulesdefault`      | use default rules in /path/to/ansible-lint/lib/ansiblelint/rules in addition to any extra rules directories specified with -r (lint_rule). There is no need to specify this if no -r (lint_rule) flag/s is/are used. | false    | false         |
| `lint_showrelativepath`  | display path relative to CWD.                                                                                                                                                                                        | false    | false         |
| `lint_tags`              | only check rules whose id/tags match these values.                                                                                                                                                                   | false    | N/A           |
| `lint_tagslist`          | list all the tags.                                                                                                                                                                                                   | false    | false         |
| `lint_verbose`           | increase verbosity level.                                                                                                                                                                                            | false    | false         |
| `lint_skip`              | only check rules whose id/tags does not match these values.                                                                                                                                                          | false    | N/A           |
| `lint_warn`              | only warn about these rules, unless overridden in config file defaults to 'experimental'                                                                                                                             | false    | experimental  |
| `lint_enable`            | activate optional rules by their tag name                                                                                                                                                                            | false    | N/A           |
| `lint_nocolor`           | disable colored output.                                                                                                                                                                                              | false    | false         |
| `lint_forcecolor`        | try force colored output.                                                                                                                                                                                            | false    | false         |
| `lint_exclude`           | path to directories or files to skip.                                                                                                                                                                                | false    | N/A           |
| `lint_config`            | specify a configuration file to use.                                                                                                                                                                                 | false    | .ansible-lint |
| `lint_offline`           | disable installation of requirements.yml                                                                                                                                                                             | false    | false         |

### Ansible-Playbook

| Parameter  | Description                             | Required | Default |
| ---------- | --------------------------------------- | -------- | ------- |
| `playbook` | playbook to be ran by ansible-playbook. | true     | N/A     |

### ansible-playbook options

| Parameter                   | Description                                                                                                                                                  | Required | Default                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------- |
| `options_askvaultpass`      | ask for vault password.                                                                                                                                      | false    | false                                                         |
| `options_flushcache`        | clear the fact cache for every host in inventory.                                                                                                            | false    | false                                                         |
| `options_forcehandlers`     | run handlers even if a task fails.                                                                                                                           | false    | false                                                         |
| `options_listhosts`         | outputs a list of matching hosts and exits program.                                                                                                          | false    | false                                                         |
| `options_listtags`          | list all available tags                                                                                                                                      | false    | false                                                         |
| `options_listtasks`         | list all tasks to be executed.                                                                                                                               | false    | false                                                         |
| `options_skiptags`          | only run plays and tasks whose tags does not match these values.                                                                                             | false    | N/A                                                           |
| `options_startattask`       | start the playbook at the task matching this name.                                                                                                           | false    | N/A                                                           |
| `options_step`              | one-set-at-a-time: confirm each task before running.                                                                                                         | false    | false                                                         |
| `options_syntaxcheck`       | perform a syntax check on the playbook and exits program.                                                                                                    | false    | false                                                         |
| `options_vaultid`           | the vault identity to use.                                                                                                                                   | false    | N/A                                                           |
| `options_vaultpasswordfile` | vault password file.                                                                                                                                         | false    | N/A                                                           |
| `options_version`           | returns ansible-playbook version number, configuration file location, configured module search path, module location, executable location and exits program. | false    | false                                                         |
| `options_check`             | dry-run, does not make any changes; instead, tries to predict some of the changes that may occur.                                                            | false    | false                                                         |
| `options_difference`        | when changing (small) files and template, shows the difference in those files.                                                                               | false    | false                                                         |
| `options_modulepath`        | prepend colon-separated path(s) to module library                                                                                                            | false    | ~/.ansible/plugins/modules:/usr/share/ansible/plugins/modules |
| `options_extravars`         | set additional variables as key=value or YAML/JSON, if filename is prepend with @                                                                            | false    | N/A                                                           |
| `options_forks`             | specify number of parallel processes to use.                                                                                                                 | false    | 5                                                             |
| `options_inventory`         | specify inventory host path or comma separated host list.                                                                                                    | true     | N/A                                                           |
| `options_limit`             | further limit selected hosts to additional pattern.                                                                                                          | false    | false                                                         |
| `options_tags`              | only run plays and task whose tags matches these values.                                                                                                     | false    | N/A                                                           |
| `options_verbose`           | verbose mode.                                                                                                                                                | false    | false                                                         |
| `options_verbosemore`       | verbose mode: more verbose.                                                                                                                                  | false    | false                                                         |
| `options_verbosedebug`      | verbose mode: connection debugging                                                                                                                           | false    | false                                                         |

### ansible-playbook connection

| Parameter                  | Description                                       | Required | Default |
| -------------------------- | ------------------------------------------------- | -------- | ------- |
| `connection_privatekey`    | use this file to authenticate the connection.     | false    | N/A     |
| `connection_scpextraargs`  | specify extra arguments to pass to scp only.      | false    | N/A     |
| `connection_sftpextraargs` | specify extra arguments to pass to sftp only.     | false    | N/A     |
| `connection_sshextraargs`  | specify extra arguments to pass to ssh only.      | false    | N/A     |
| `connection_sshcommonargs` | specify common arguments to pass to scp/sftp/ssh. | false    | N/A     |
| `connection_timeout`       | override the connection timeout in seconds.       | false    | 10      |
| `connection_connection`    | connection type to use.                           | false    | smart   |
| `connection_user`          | connect as this user.                             | false    | none    |
| `connection_passwordfile`  | connection password file                          | false    | N/A     |

### ansible-playbook privilege escalation

| Parameter                  | Description                                                    | Required | Default |
| -------------------------- | -------------------------------------------------------------- | -------- | ------- |
| `privilege_becomemethod`   | privilege escalation method to use.                            | false    | sudo    |
| `privilege_becomeuser`     | run operation as this user.                                    | false    | root    |
| `privilege_askbecomepass`  | ask for privilege escalation password.                         | false    | false   |
| `privilege_become`         | run operations with become (does not imply password prompting) | false    | false   |
| `privilege_becomepassfile` | become password file                                           | false    | N/A     |

## Template

COMING SOON!

## Troubleshooting

You can start troubleshooting this plugin by tuning the level of logs being displayed:

```diff
steps:
  - name: ansible-lint
    image: target/vela-ansible:latest
    parameters:
+     log_level: trace
      action: lint
      playbook: "abox/main.yml"

```

Below are a list of common problems and how to solve them: