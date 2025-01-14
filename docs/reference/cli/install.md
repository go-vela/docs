---
title: "Install"
sidebar_position: 2
---

:::tip
Please keep in mind your operating system (OS) when referring to the installation instructions below.
:::

## MacOS

:::tip
[Homebrew](https://brew.sh/) is the recommended method for installing the Vela CLI on a Mac.
:::

#### Homebrew

```sh
# add Vela tap to your brew configuration
brew tap go-vela/vela

# update your taps
brew update

# install Vela CLI
brew install vela
```

#### cURL

```sh
# download the binary
curl -L https://github.com/go-vela/cli/releases/latest/download/vela_darwin_amd64.tar.gz | tar zx

# copy binary to $PATH
sudo cp vela /usr/local/bin/
```

## Linux

#### cURL

```sh
# download the binary
curl -L https://github.com/go-vela/cli/releases/latest/download/vela_linux_amd64.tar.gz | tar zx

# copy binary to $PATH
sudo cp vela /usr/local/bin/
```

## Windows

:::tip
The `curl` utility must be installed before following the instructions below.
:::

#### Command Prompt

```sh
# download the binary
curl -L https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz --output vela_windows_amd64.tar.gz

# unzip the tarball
tar xzvf vela_windows_amd64.tar.gz

# copy binary to $PATH
copy vela C:\Windows\System32/vela.exe
```

#### Windows PowerShell

```sh
# download the binary
curl https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz -OutFile vela_windows_amd64.tar.gz

# unzip the tarball
tar xzvf vela_windows_amd64.tar.gz

# copy binary to $PATH
cp vela C:\Windows\System32/vela.exe
```

#### PowerShell 6 (PowerShell Core)

```sh
# download the binary
curl -L https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz --output vela_windows_amd64.tar.gz

# unzip the tarball
tar xzvf vela_windows_amd64.tar.gz

# copy binary to $PATH
cp vela C:\Windows\System32/vela.exe
```

## From Source

:::warning
This method is intended for **developers and advanced users only**.
:::

:::tip
This section assumes you have already installed and setup [Golang](https://golang.org/).

To install and setup Golang, please review the [installation documentation](https://golang.org/doc/install).
:::

```sh
# download the repo
go get -d github.com/go-vela/cli

# change to the cli directory
cd ${GOPATH}/src/github.com/go-vela/cli

# build a release binary with Go
go build -o releases/vela

# copy binary to $PATH
sudo cp releases/vela /usr/local/bin/
```
