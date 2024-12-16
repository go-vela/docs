import React, { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import {
    useVersions,
    useLatestVersion,
} from '@docusaurus/plugin-content-docs/client';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const docsPluginId = undefined;

const VersionsArchived = {
    "0.25": "/usage/quickstart",
    "0.24": "/0.24.x/usage/quickstart",
};

const VersionsArchivedList = Object.entries(VersionsArchived);

function DocumentationLabel() {
    return (
        <span>Documentation</span>
    );
}

function ReleaseNotesLabel() {
    return (
        <span>
            Release Notes
        </span>
    );
}

export default function Version(): ReactNode {
    const {
        siteConfig: { organizationName, projectName },
    } = useDocusaurusContext();
    const versions = useVersions(docsPluginId);
    const latestVersion = useLatestVersion(docsPluginId);
    const currentVersion = versions.find(
        (version) => version.name === 'current',
    )!;
    const pastVersions = versions.filter(
        (version) => version !== latestVersion && version.name !== 'current',
    );
    const repoUrl = `https://github.com/go-vela/community`;

    return (
        <Layout
            title="Versions"
            description="Vela Versions page listing all versions">
            <main className="container margin-vert--lg">
                <h1>
                    <span>
                        Vela versions
                    </span>
                </h1>

                <div className="margin-bottom--lg">
                    <Heading as="h3" id="next">
                        <span>
                            Current version
                        </span>
                    </Heading>
                    <p>
                        <span>
                            Here you can find the documentation for the latest release.
                        </span>
                    </p>
                    <table>
                        <tbody>
                            <tr>
                                <th>{latestVersion.label}</th>
                                <td>
                                    <Link to={latestVersion.path}>
                                        <DocumentationLabel />
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`${repoUrl}/blob/main/releases/v${latestVersion.name}.md`}>
                                        <ReleaseNotesLabel />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {(pastVersions.length > 0 || VersionsArchivedList.length > 0) && (
                    <div className="margin-bottom--lg">
                        <Heading as="h3" id="archive">
                            <span>
                                Previous versions (Not maintained anymore)
                            </span>
                        </Heading>
                        <p>
                            <span>
                                Here you can find documentation for past releases.
                            </span>
                        </p>
                        <table>
                            <tbody>
                                {VersionsArchivedList.map(([versionName, versionUrl]) => (
                                    latestVersion.label !== versionName ?
                                        <tr key={versionName}>
                                            <th>{versionName}</th>
                                            <td>
                                                <Link to={versionUrl}>
                                                    <DocumentationLabel />
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href={`${repoUrl}/blob/main/releases/v${versionName}.md`}>
                                                    <ReleaseNotesLabel />
                                                </Link>
                                            </td>
                                        </tr> : <></>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </Layout>
    );
}