---
title: "Go"
linkTitle: "Go"
description: >
  Learn how the find the documentation for the Go sdk
---

## Overview

Vela Go SDK is a client to perform operations on Vela objects or view content in a new way to integrate into applications.

For a complete list of APIs and examples, please take a look at the [Godoc Reference documentation](https://pkg.go.dev/github.com/go-vela/sdk-go/vela).

## Minimum requirements

Go 1.26 or above

## Get build info example

Below is a sample Go program demonstrating how to authenticate and get a build with the Go SDK:

```go
package main

import (
    "context"
    "fmt"
    "github.com/go-vela/sdk-go/vela"
)

func main() {
    ctx := context.Background()

    // full URI to the Vela server
    url := "https://your-vela-server.example.com"

    token := "someToken"

    // instantiate a new Vela client
    client, err := vela.NewClient(url, nil)
    if err != nil {
        fmt.Println(err)
        return
    }    

    // set token authentication for the client
    client.Authentication.SetTokenAuth(token)
    
    // Get a build from the server
    build, resp, err := client.Build.Get(ctx, "go-vela", "sdk-go", 1)
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Printf("Received response code %d, for build %+v", resp.StatusCode, build)    
}
```

