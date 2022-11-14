/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn')
const path = require('path')
const fs = require('fs')
const kebabCase = require('lodash.kebabcase')

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Kickass Toolkit',
    tagline: 'Set of curated tools for kickass projects. Focus on code let us take care of chores!',
    url: 'https://kickass.codes',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'kickassCoderz', // Usually your GitHub org/user name.
    projectName: 'kickass-toolkit', // Usually your repo name.

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/kickass-toolkit/tree/master/apps/kickass-toolkit',
                    remarkPlugins: [[npm2yarn, { sync: true }]]
                },
                blog: {
                    showReadingTime: true,
                    editUrl: 'https://github.com/kickass-toolkit/tree/master/apps/kickass-toolkit/blog/'
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            }
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        {
            colorMode: {
                respectPrefersColorScheme: true
            },
            navbar: {
                title: 'Kickass Toolkit',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg'
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Docs'
                    },
                    // { to: '/blog', label: 'Blog', position: 'left' }, // enable if we use the blog
                    {
                        href: 'https://github.com/kickassCoderz/kickass-toolkit',
                        position: 'right',
                        className: 'header-github-link',
                        'aria-label': 'GitHub repository'
                    }
                ]
            },
            footer: {
                // style: 'dark',
                // links: [
                //     {
                //         title: 'Docs',
                //         items: [
                //             {
                //                 label: 'Introduction',
                //                 to: '/docs/intro'
                //             },
                //             {
                //                 label: 'Quick Start',
                //                 to: '/docs/quick-start'
                //             },
                //             {
                //                 label: 'Hooks',
                //                 to: '/docs/hooks/overview'
                //             },
                //             {
                //                 label: 'Data service',
                //                 to: '/docs/data-service/overview'
                //             },
                //             {
                //                 label: 'Auth service',
                //                 to: '/docs/auth-service/overview'
                //             },
                //             {
                //                 label: 'Subscription service',
                //                 to: '/docs/subscription-service/overview'
                //             }
                //         ]
                //     },
                //     {
                //         title: 'Community',
                //         items: [
                //             // TODO add links
                //         ]
                //     },
                //     {
                //         title: 'More',
                //         items: [
                //             // TODO add more
                //         ]
                //     }
                // ],
                copyright: `Copyright © ${new Date().getFullYear()} KickassCoderz.`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        },
    plugins: [
        ...fs
            .readdirSync(path.resolve(__dirname, '../../packages/hooks/src'))
            .filter(path => !path.endsWith('.ts'))
            .map(hookName => {
                return [
                    'docusaurus-plugin-typedoc',
                    {
                        id: hookName,
                        entryPoints: [path.resolve(__dirname, `../../packages/hooks/src/${hookName}/index.ts`)],
                        tsconfig: path.resolve(__dirname, '../../packages/hooks/tsconfig.json'),
                        out: 'types',
                        entryDocument: `${kebabCase(hookName)}.md`,
                        sidebar: {
                            categoryLabel: 'Types reference',
                            indexLabel: hookName
                        },
                        readme: 'none',
                        readmeTitle: hookName
                    }
                ]
            }),
        // @ts-ignore
        ...[
            [
                'docusaurus-plugin-typedoc',
                {
                    id: 'DataService',
                    entryPoints: [path.resolve(__dirname, '../../packages/data-service/src')],
                    tsconfig: path.resolve(__dirname, '../../packages/data-service/tsconfig.json'),
                    out: 'types',
                    entryDocument: 'data-service.md',
                    sidebar: {
                        categoryLabel: 'Types reference',
                        indexLabel: 'DataService'
                    },
                    readme: 'none'
                }
            ]
        ]
    ]
}

module.exports = config