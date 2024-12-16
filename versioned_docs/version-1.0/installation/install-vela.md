---
sidebar_position: 1
---

# Install Vela

## macOS

### Homebrew

```js
# add Vela tap to your brew configuration
brew tap go-vela/vela

# update your taps
brew update

# install Vela CLI
brew install vela
```

### cURL

```js
# download the binary
curl -L https://github.com/go-vela/cli/releases/latest/download/vela_darwin_amd64.tar.gz | tar zx

# copy binary to $PATH
sudo cp vela /usr/local/bin/
```

## Linux

### cURL

```js
# download the binary
curl -L https://github.com/go-vela/cli/releases/latest/download/vela_darwin_amd64.tar.gz | tar zx

# copy binary to $PATH
sudo cp vela /usr/local/bin/
```

## Windows

### Command Prompt

```js
# download the binary
curl -L https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz --output vela_windows_amd64.tar.gz

# unzip the tarball
tar xzvf vela_windows_amd64.tar.gz

# copy binary to $PATH
copy vela C:\Windows\System32/vela.exe
```

### Windows PowerShell

```js
# download the binary
curl https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz -OutFile vela_windows_amd64.tar.gz

# unzip the tarball
tar xzvf vela_windows_amd64.tar.gz

# copy binary to $PATH
cp vela C:\Windows\System32/vela.exe
```

### PowerShell 6 (PowerShell Core)

```js
# download the binary
curl https://github.com/go-vela/cli/releases/latest/download/vela_windows_amd64.tar.gz -OutFile vela_windows_amd64.tar.gz

# unzip the tarball
tar xzvf vela_windows_amd64.tar.gz

# copy binary to $PATH
cp vela C:\Windows\System32/vela.exe
```

### Source

:::warning

This method is intended for developers and advanced users only.

Golang is required before continuing. To install and setup Golang, please review [installation documentation](https://golang.org/doc/install) 
:::

```js
# download the repo
go get -d github.com/go-vela/cli

# change to the cli directory
cd ${GOPATH}/src/github.com/go-vela/cli

# build a release binary with Go
go build -o releases/vela

# copy binary to $PATH
sudo cp releases/vela /usr/local/bin/
```