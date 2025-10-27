import React from "react";

import { graphql } from "gatsby";

import { Feed } from "@/components/Feed";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { AllAsciidoc, PageContext } from "@/types";

interface Props {
  data: {
    allAsciidoc: AllAsciidoc;
  };
  pageContext: PageContext;
}

const TagTemplate: React.FC<Props> = ({ data, pageContext }: Props) => {
  const { group, pagination, limit, offset } = pageContext;
  const { prevPagePath, nextPagePath, hasPrevPage, hasNextPage } = pagination;

  const { edges } = data.allAsciidoc;

  // Filter posts by tag (tags are comma-separated strings in AsciiDoc)
  const filteredEdges = edges.filter((e) => {
    const tags = e.node.pageAttributes.tags || "";
    // Split by comma and trim whitespace, then check if tag matches
    return tags
      .split(",")
      .map((t) => t.trim())
      .includes(group || "");
  });

  // Apply manual pagination since GraphQL can't filter comma-separated tags
  const paginatedEdges = filteredEdges.slice(offset, offset + limit);

  return (
    <Layout>
      <Sidebar />
      <Page title={group}>
        <Feed edges={paginatedEdges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const Head: React.FC<Props> = ({ pageContext }) => {
  const {
    title: siteTitle,
    subtitle: siteSubtitle,
    author,
    url,
  } = useSiteMetadata();
  const { group, pagination } = pageContext;
  const { currentPage } = pagination;

  const pageTitle =
    currentPage > 0
      ? `${group} - Page ${currentPage} - ${siteTitle}`
      : `${group} - ${siteTitle}`;
  const metaImageUrl = url + author.photo;

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={siteSubtitle} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={metaImageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={siteSubtitle} />
      <meta name="twitter:image" content={metaImageUrl} />
    </>
  );
};

export const query = graphql`
  query TagTemplate {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allAsciidoc(
      filter: {
        pageAttributes: { template: { eq: "post" }, draft: { ne: "true" } }
      }
      sort: { revision: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          document {
            title
          }
          revision {
            date
          }
          pageAttributes {
            category
            description
            tags
          }
        }
      }
    }
  }
`;

export default TagTemplate;
