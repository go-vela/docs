---
sidebar_position: 1
---

# Install Vela CLI

## macOS

### Homebrew

1. Add Vela tap to your brew configuration
    ```sh
    brew tap go-vela/vela
    ```
1. Update your taps
    ```sh
    brew update
    ```
1. Install Vela CLI
    ```sh
    brew install vela
    ```

### cURL

1. Download the binary
    ```sh
    curl -L https://github.com/go-vela/cli/releases/latest/download/vela_darwin_amd64.tar.gz | tar zx
    ```
1. Copy binary to $PATH
    ```sh
    sudo cp vela /usr/local/bin/
    ```

## Linux

### cURL

1. Download the binary
    ```sh
    curl -L https://github.com/go-vela/cli/releases/latest/download/vela_darwin_amd64.tar.gz | tar zx
    ```
1. Copy binary to $PATH
    ```sh
    sudo cp vela /usr/local/bin/
    ```

## Windows

### Command Prompt

1. Download the binary
    ```sh
    curl -L https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz --output vela_windows_amd64.tar.gz
    ```
1. Unzip the tarball
    ```sh
    tar xzvf vela_windows_amd64.tar.gz
    ```
1. Copy binary to $PATH
    ```sh
    copy vela C:\Windows\System32/vela.exe
    ```

### Windows PowerShell

1. Download the binary
    ```sh
    curl https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz -OutFile vela_windows_amd64.tar.gz
    ```
1. Unzip the tarball
    ```sh
    tar xzvf vela_windows_amd64.tar.gz
    ```
1. Copy binary to $PATH
    ```sh
    cp vela C:\Windows\System32/vela.exe
    ```

### PowerShell 6 (PowerShell Core)

1. Download the binary
    ```sh
    curl https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz -OutFile vela_windows_amd64.tar.gz
    ```
1. Unzip the tarball
    ```sh
    tar xzvf vela_windows_amd64.tar.gz
    ```
1. Copy binary to $PATH
    ```sh
    cp vela C:\Windows\System32/vela.exe
    ```

### Source

:::warning

This method is intended for developers and advanced users only.

Golang is required before continuing. To install and setup Golang, please review [installation documentation](https://golang.org/doc/install)
:::

1. Download the repo
    ```sh
    go get -d github.com/go-vela/cli
    ```
1. Change to the cli directory
    ```sh
    cd ${GOPATH}/src/github.com/go-vela/cli
    ```
1. Build a release binary with Go
    ```sh
    go build -o releases/vela
    ```
1. Copy binary to $PATH
    ```sh
    sudo cp releases/vela /usr/local/bin/
    ```