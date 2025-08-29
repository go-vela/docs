---
title: "Database"
linkTitle: "Database"
weight: 3
description: >
  This section contains information on the database component for the Vela server.
---

This component is responsible for integrating with a database system based off the configuration provided.

The database system is used by Vela for storing application [data at rest](https://en.wikipedia.org/wiki/Data_at_rest).

This data is an organized collection of information necessary for the platform to operate.

:::note
Any sensitive data stored in the database will be encrypted using the [Advanced Encryption Standard (AES)](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard).
:::

## Configuration

The following options are used to configure the component:

| Name                             | Description                                                        | Required | Default       | Environment Variables                                                    |
| -------------------------------- | ------------------------------------------------------------------ | -------- | ------------- | ------------------------------------------------------------------------ |
| `database.addr`                  | full connection string / DSN to the database                       | `true`   | `vela.sqlite` | `DATABASE_ADDR`,`VELA_DATABASE_ADDR`                                     |
| `database.driver`                | type of client to control and operate the database                 | `true`   | `sqlite3`     | `DATABASE_DRIVER`,`VELA_DATABASE_DRIVER`                                 |
| `database.compression.level`     | level of compression for logs stored in the database               | `true`   | `3`           | `DATABASE_COMPRESSION_LEVEL`,`VELA_DATABASE_COMPRESSION_LEVEL`           |
| `database.connection.idle`       | maximum number of idle connections to the database                 | `true`   | `2`           | `DATABASE_CONNECTION_IDLE`,`VELA_DATABASE_CONNECTION_IDLE`               |
| `database.connection.life`       | duration of time a connection is reusable                          | `true`   | `30m`         | `DATABASE_CONNECTION_LIFE`,`VELA_DATABASE_CONNECTION_LIFE`               |
| `database.connection.open`       | maximum number of open connections to the database                 | `true`   | `0`           | `DATABASE_CONNECTION_OPEN`,`VELA_DATABASE_CONNECTION_OPEN`               |
| `database.encryption.key`        | AES-256 key for encrypting/decrypting values in the database       | `true`   | `N/A`         | `DATABASE_ENCRYPTION_KEY`,`VELA_DATABASE_ENCRYPTION_KEY`                 |
| `database.skip_creation`         | skips the creation of tables and indexes in the database           | `false`  | `false`       | `DATABASE_SKIP_CREATION`,`VELA_DATABASE_SKIP_CREATION`                   |
| `database.log.level`             | log level for database                                             | `false`  | `warn`        | `DATABASE_LOG_LEVEL` \ `VELA_DATABASE_LOG_LEVEL`                         |
| `database.log.show_sql`          | show sql query in logs                                             | `false`  | `false`       | `DATABASE_LOG_SHOW_SQL` \ `VELA_DATABASE_LOG_SHOW_SQL`                   |
| `database.log.skip_notfound`     | skip logging not found errors                                      | `false`  | `true`        | `DATABASE_LOG_SKIP_NOTFOUND` \ `VELA_DATABASE_LOG_SKIP_NOTFOUND`         |
| `database.log.slow_threshold`    | queries higher than this value are considered slow and logged      | `false`  | `200ms`       | `DATABASE_LOG_SLOW_THRESHOLD` \ `VELA_DATABASE_LOG_SLOW_THRESHOLD`       |
| `database.log.partitioned`       | enables partition-aware log cleanup for partitioned log tables     | `false`  | `false`       | `DATABASE_LOG_PARTITIONED` \ `VELA_DATABASE_LOG_PARTITIONED`             |
| `database.log.partition_pattern` | naming pattern for log table partitions (e.g. `logs_%`, `logs_y%`) | `false`  | `logs_%`      | `DATABASE_LOG_PARTITION_PATTERN` \ `VELA_DATABASE_LOG_PARTITION_PATTERN` |
| `database.log.partition_schema`  | database schema containing log table partitions                    | `false`  | `public`      | `DATABASE_LOG_PARTITION_SCHEMA` \ `VELA_DATABASE_LOG_PARTITION_SCHEMA`   |

:::note
For more information on these configuration options, please see the [server reference](/docs/reference/installation/server/server.md).
:::

## Drivers

The following drivers are available to configure the component:

| Name       | Description                                         | Documentation               |
| ---------- | --------------------------------------------------- | --------------------------- |
| `postgres` | uses a PostgreSQL database for storing data at rest | https://www.postgresql.org/ |
| `sqlite3`  | uses a SQLite database for storing data at rest     | https://www.sqlite.org/     |

### Postgres

From the [PostgreSQL official website](https://www.postgresql.org/):

> PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

The below configuration displays an example of starting the Vela server that will connect to a Postgres database:

```diff
$ docker run \
  --detach=true \
  --env=VELA_ADDR=https://vela-server.example.com \
+ --env=VELA_DATABASE_DRIVER=postgres \
+ --env=VELA_DATABASE_ADDR=postgres://<username>:<password>@<hostname>:<port>/<database> \
  --env=VELA_DATABASE_ENCRYPTION_KEY=<encryption-key> \
  --env=VELA_QUEUE_DRIVER=redis \
  --env=VELA_QUEUE_ADDR=redis://<password>@<hostname>:<port>/<database> \
  --env=VELA_PORT=443 \
  --env=VELA_SECRET=<shared-secret> \
  --env=VELA_SERVER_PRIVATE_KEY=<private_key> \
  --env=VELA_SCM_CLIENT=<oauth-client-id> \
  --env=VELA_SCM_SECRET=<oauth-client-secret> \
  --env=VELA_WEBUI_ADDR=https://vela.example.com \
  --name=server \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  target/vela-server:latest
```

### Sqlite3

From the [Sqlite official website](https://www.sqlite.org/):

> SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. SQLite is the most used database engine in the world. SQLite is built into all mobile phones and most computers and comes bundled inside countless other applications that people use every day.

The below configuration displays an example of starting the Vela server that will connect to a Sqlite database:

```diff
$ docker run \
  --detach=true \
  --env=VELA_ADDR=https://vela-server.example.com \
+ --env=VELA_DATABASE_DRIVER=sqlite3 \
+ --env=VELA_DATABASE_ADDR=vela.sqlite \
  --env=VELA_DATABASE_ENCRYPTION_KEY=<encryption-key> \
  --env=VELA_QUEUE_DRIVER=redis \
  --env=VELA_QUEUE_ADDR=redis://<password>@<hostname>:<port>/<database> \
  --env=VELA_PORT=443 \
  --env=VELA_SECRET=<shared-secret> \
  --env=VELA_SERVER_PRIVATE_KEY=<private_key> \
  --env=VELA_SCM_CLIENT=<oauth-client-id> \
  --env=VELA_SCM_SECRET=<oauth-client-secret> \
  --env=VELA_WEBUI_ADDR=https://vela.example.com \
  --name=server \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  target/vela-server:latest
```

:::note
This Sqlite configuration is enabled by default and is not necessary to provide in order for Vela to operate.
:::