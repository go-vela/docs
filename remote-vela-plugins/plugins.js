// this contains a list of all remote plugins that will be fetched from GitHub, processed, renamed, then added to docs/plugins
// to add a new plugin, add an object to the array with the following properties:
// - name: the name of the plugin
// - sourceRepo: the GitHub repository where the plugin's documentation is stored
// - sourceRef: the branch or tag to fetch the documentation from
// - sourceFileName: the name of the file to fetch from the repository
// - existingDocPath: (optional) the path to an existing document in the docs directory that should embed remote content to replace the first occurence of %REMOTE_CONTENT%
//                    if not provided, the document will just be fetched, processed and moved as-is.
// - stringTransformations: (optional) an object containing key-value pairs of strings to find and replace in the remote content
// - internal: a boolean indicating whether the repository is internal or not (defaults to false)

const remoteVelaPlugins = [
    {
        name: "ansible",
        sourceRepo: "go-vela/vela-ansible",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "artifactory",
        sourceRepo: "go-vela/vela-artifactory",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "aws-credentials",
        sourceRepo: "Cargill/vela-aws-credentials",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "build-summary",
        sourceRepo: "go-vela/vela-build-summary",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "cache",
        sourceRepo: "go-vela/vela-s3-cache",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "downstream",
        sourceRepo: "go-vela/vela-downstream",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "email",
        sourceRepo: "go-vela/vela-email",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "git",
        sourceRepo: "go-vela/vela-git",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "github-release",
        sourceRepo: "go-vela/vela-github-release",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "hugo",
        sourceRepo: "go-vela/vela-hugo",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "influx",
        sourceRepo: "go-vela/vela-influx",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "k6",
        sourceRepo: "go-vela/vela-k6",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "kaniko",
        sourceRepo: "go-vela/vela-kaniko",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "kubernetes",
        sourceRepo: "go-vela/vela-kubernetes",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "manifest-tool",
        sourceRepo: "go-vela/vela-manifest-tool",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "npm",
        sourceRepo: "go-vela/vela-npm",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
        destinationFileName: "NPM.md",
    },
    {
        name: "scp",
        sourceRepo: "go-vela/vela-openssh",
        sourceRef: "refs/heads/main",
        sourceFileName: "docs/usage-scp.md",
        destinationFileName: "SCP.md",
    },
    {
        name: "slack",
        sourceRepo: "go-vela/vela-slack",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    {
        name: "ssh",
        sourceRepo: "go-vela/vela-openssh",
        sourceRef: "refs/heads/main",
        sourceFileName: "docs/usage-ssh.md",
        destinationFileName: "SSH.md",
    },
    {
        name: "terraform",
        sourceRepo: "go-vela/vela-terraform",
        sourceRef: "refs/heads/main",
        sourceFileName: "DOCS.md",
    },
    // {
    //     name: "vault-secrets",
    //     sourceRepo: "go-vela/secret-vault",
    //     sourceRef: "refs/heads/main",
    //     sourceFileName: "DOCS.md",
    // },
]

export default remoteVelaPlugins;