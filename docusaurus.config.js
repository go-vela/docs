import { themes as prismThemes } from 'prism-react-renderer';
import remoteContentVelaPlugins from './remote-vela-plugins/index.js';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vela',
  tagline: 'Vela is a Pipeline Automation (CI/CD) framework built on Linux container technology written in Golang.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://pages.git.target.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs-v2/',
  plugins: [
    require.resolve('docusaurus-lunr-search'),
    ...remoteContentVelaPlugins,
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'actions-playground',
  projectName: 'vela-prototype',
  deploymentBranch: 'gh-pages',
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
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: "/",
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
            versions: {
            current: {
              label: `0.26 🚧`,
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo..
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
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
            { to: '/blog', label: 'Blog', position: 'left' },
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
