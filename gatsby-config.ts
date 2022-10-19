import path from "path";

import config from "./content/config.json";
import * as types from "./internal/gatsby/types";

export default {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    url: config.url,
    menu: config.menu,
    title: config.title,
    author: config.author,
    subtitle: config.subtitle,
    copyright: config.copyright,
    postsLimit: config.postsLimit,
    disqusShortname: config.disqusShortname,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.resolve("content"),
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allAsciidoc },
            }: {
              query: {
                site: {
                  siteMetadata: {
                    url: string;
                  };
                };
                allAsciidoc: {
                  edges: Array<types.Edge>;
                };
              };
            }) =>
            allAsciidoc.edges.map(({ node }) => ({
                date: node?.revision?.date,
                description: node?.pageAttributes?.description,
                url: site.siteMetadata.url + node?.fields?.slug,
                guid: site.siteMetadata.url + node?.fields?.slug,
                custom_elements: [{ "content:encoded": node.html }],
              })),
            query: `
              {
                allAsciidoc(
                  limit: 1000,
                  sort: { order: DESC, fields: [revision___date] },
                  filter: { pageAttributes: { template: { eq: "post" }, draft: { ne: "true" } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      revision {
                        date
                      }
                      pageAttributes {
                        description
                      }
                      document {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: config.title,
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-asciidoc`,
      options: {
        attributes: {
          showtitle: false,
          imagesdir: `/images`,
        },
        extensions: [`.adoc`],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [config.googleAnalyticsId],
        gtagConfig: {
          optimize_id: config.googleManagerTag,
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl: url
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
              }
            ) {
              nodes {
                path
              }
            }
          }
        `,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.title,
        short_name: config.title,
        theme_color: "hsl(31, 92%, 62%)",
        background_color: "hsl(0, 0%, 100%)",
        icon: "content/photo.jpg",
        display: "standalone",
        start_url: "/",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|[^:]static\/)/,
              handler: "CacheFirst",
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern:
                /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: "StaleWhileRevalidate",
            },
          ],
        },
      },
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-optimize-svgs",
    "gatsby-plugin-sass",
  ],
};
