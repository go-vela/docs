// util functions for the pulling remote vela plugin docs using docusaurus-plugin-remote-content

// validateEnvironment: checks for the presence of GITHUB_PAT and GHE_PAT and GHE_API_URL environment variables
function validateEnvironment(plugins) {
    // check for pressence of GITHUB_PAT and throw error when not provided
    if (!process.env.GITHUB_PAT || process.env.GITHUB_PAT === "") {
        throw new Error("GITHUB_PAT environment variable not set. Please set it to a GitHub Personal Access Token with read access to the repositories you want to fetch content from.");
    }

    // check if any of remoteContentVelaPlugins are marked .internal === true then check for GHE_PAT and GHE_API_URL
    if (plugins.some((plugin) => plugin.internal)) {
        if (!process.env.GHE_PAT || process.env.GHE_PAT === "") {
            throw new Error("GHE_PAT environment variable not set. Please set it to a GitHub Personal Access Token with read access to the repositories you want to fetch content from.");
        }
        if (!process.env.GHE_API_URL || process.env.GHE_API_URL === "") {
            throw new Error("GHE_API_URL environment variable not set. Please set it to the base URL of your GitHub Enterprise instance.");
        }
    }
}

// moveLocalPluginsToDocs: copies all local plugins from remote-vela-plugins/local to docs/plugins
function moveLocalPluginsToDocs(sourceDir, destinationDir) {
    const fs = require("fs");
    const path = require("path");

    // delete everything in docs/plugins/*.md (destinationDir)
    // except for index.md
    const files = fs.readdirSync(destinationDir);
    for (const file of files) {
        if (file !== "index.md" && file.endsWith(".md")) {
            fs.unlinkSync(`${destinationDir}/${file}`);
        }
    }

    const localPlugins = fs.readdirSync(sourceDir);
    localPlugins.forEach((plugin) => {
        fs.copyFileSync(path.join(sourceDir, plugin), `${destinationDir}/${plugin}`);
    });
}

// modifyRemoteContent: returns a function that modifies the content of a remote file
function modifyRemoteContent(plugin) {
    return function (filename, content) {
        // base64 decode content.content when returned by github api
        if (content.content) {
            content = Buffer.from(content.content, "base64").toString("utf-8");
        }

        if (plugin.destinationFileName) {
            filename = plugin.destinationFileName;
        } else {
            // set filename to be the plugin.name in "title case" where every word is capitalized, thats it, where the words can be separated by hyphen, underscore, or space, then with .md attached to the end 
            filename = `${plugin.name.split(/[-_ ]/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}.md`;
        }

        if (plugin.existingDocPath) {
            // read the existing document and then find and replace %CONTENT%
            const fs = require("fs");
            const existingDocContent = fs.readFileSync(plugin.existingDocPath, "utf8");

            const withDisclaimer = `:::info
            The documentation below was pulled automatically from [GitHub External](https://github.com/${plugin.sourceRepo}/blob/${plugin.sourceRef}/${plugin.sourceFileName}). The image and registry references have been updated to point at internally mirrored versions or locations. The registry link will take you to all available plugin versions internally.
            :::\n\n`
                +
                content;

            content = existingDocContent.split('%REMOTE_CONTENT%').join(withDisclaimer);

            filename = plugin.existingDocPath.split("/").pop();
        }

        // replace default external image with internal image, if provided
        if (plugin.internalImage) {
            const externalImage = plugin.externalImage ?? `target/vela-${plugin.name.toLowerCase()}:latest`;
            const internalImage = plugin.internalImage;
            // content replace external with internal
            content = content.replace(new RegExp(externalImage, "g"), internalImage);
        }

        // do string transformations using the plugin's stringTransformations with object key as the source and the value as the new value to replace key with
        if (plugin.stringTransformations) {
            for (const [key, value] of Object.entries(plugin.stringTransformations)) {
                content = content.replace(new RegExp(key, "g"), value);
            }
        }

        // replace {{% notice anything %}} with :::anything
        content = content.replace(/{{% notice ([^%]+) %}}/g, ":::$1");

        // replace ::: with :::
        content = content.replace(/{{% \/notice %}}/g, ":::");

        // replace <br> with <br/>
        content = content.replace(/<br>/g, "<br/>");

        // replace <repo> and <org> with |repo| and |org|
        content = content.replace(/<repo>/g, "|repo|");
        content = content.replace(/<org>/g, "|org|");

        // Convert angle bracket URLs to proper markdown links
        // This matches <http://...> or <https://...> patterns and converts them to [url](url)
        content = content.replace(/<(https?:\/\/[^>]+)>/g, function(match, url) {
            return `[${url}](${url})`;
        });

        return {
            filename: filename,
            content: content,
        };
    }
}

export {
    moveLocalPluginsToDocs,
    validateEnvironment,
    modifyRemoteContent,
};
