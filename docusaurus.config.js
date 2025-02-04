import { themes as prismThemes } from 'prism-react-renderer';
import remoteContentVelaPlugins from './remote-vela-plugins/index.js';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vela',
  tagline: 'Vela is a Pipeline Automation (CI/CD) framework built on Linux container technology written in Golang.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://go-vela.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',
  plugins: [
    require.resolve('docusaurus-lunr-search'),
    ...remoteContentVelaPlugins,
  ],

  // GitHub pages deployment config...
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'go-vela',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          lastVersion: 'current',
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: "/",
          editUrl:
            'https://github.com/go-vela/docs/blob/main/',
          versions: {
            current: {
              label: `v0.26`,
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/vela.png',
      navbar: {
        title: 'Vela',
        logo: {
          alt: 'My Site Logo',
          src: 'img/vela.png',
        },
        items:
          [
            {
              type: 'docSidebar',
              position: 'left',
              sidebarId: 'installation',
              label: 'Installation',
            },
            {
              type: 'docSidebar',
              position: 'left',
              sidebarId: 'usage',
              label: 'Usage',
            },
            {
              type: 'docSidebar',
              position: 'left',
              sidebarId: 'reference',
              label: 'Reference',
            },
            { to: '/blog', label: 'Announcements', position: 'left' },
            {
              type: 'docsVersionDropdown',
              label: 'version',
              position: 'right',
              dropdownItemsAfter: [{ to: '/versions', label: 'All versions' }],
              dropdownActiveClassDisabled: true,
            },
            {
              href: 'https://github.com/go-vela',
              position: 'right',
              className: 'header-github-link',
              'aria-label': 'GitHub repository',
            },
          ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Target Brands All Rights Reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["diff", "diff-ts"],
      },
    }),
};

function modifyContent(filename, content) {
  const titleMatch = content.match(/^#\s*(.+)/);
  if (titleMatch && titleMatch[1]) {
    filename = `${titleMatch[1]}.md`;
  }

  return {
    filename: filename,
    content: content,
  };
}

export default config;
