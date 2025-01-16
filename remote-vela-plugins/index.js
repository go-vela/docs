import remoteVelaPlugins from "./plugins.js";
import { validateEnvironment, moveLocalPluginsToDocs, modifyRemoteContent } from "./utils.js";

// this file acts as the glue for taking a combination of local plugin docs and remote downloaded docs
// to produce a set of final documents that end up in docs/plugins

// the code in this file runs when docusarus builds the static site

require("dotenv").config();

validateEnvironment(remoteVelaPlugins);

const localPluginsSourceDir = "remote-vela-plugins/local";
const allPluginsDestinationDir = "docs/usage/plugins/registry";

moveLocalPluginsToDocs(localPluginsSourceDir, allPluginsDestinationDir);

function fetchRemoteContentPlugin(plugin) {
    return [
        "docusaurus-plugin-remote-content",
        {
            performCleanup: true,
            name: "plugin-content-" + plugin.name,
            sourceBaseUrl: plugin.internal ?
                `${process.env.GHE_API_URL}/repos/${plugin.sourceRepo}/contents/` :
                `https://api.github.com/repos/${plugin.sourceRepo}/contents/`,
            requestConfig: {
                headers: {
                    "Authorization": "Bearer " + (plugin.internal ?
                        process.env.GHE_PAT :
                        process.env.GITHUB_PAT),
                },
                params: {
                    ref: plugin.sourceRef,
                },
            },
            outDir: allPluginsDestinationDir,
            documents: [plugin.sourceFileName],
            modifyContent: modifyRemoteContent(plugin),
        },
    ];
}

const remoteContentVelaPlugins = remoteVelaPlugins.map(fetchRemoteContentPlugin);

export default remoteContentVelaPlugins;