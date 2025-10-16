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
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const { group, pagination, limit, offset } = pageContext;
  const { currentPage, prevPagePath, nextPagePath, hasPrevPage, hasNextPage } =
    pagination;

  const { edges } = data.allAsciidoc;

  // Filter posts by tag (tags are comma-separated strings in AsciiDoc)
  const filteredEdges = edges.filter(e => {
    const tags = e.node.pageAttributes.tags || "";
    // Split by comma and trim whitespace, then check if tag matches
    return tags.split(",").map(t => t.trim()).includes(group || "");
  });

  // Apply manual pagination since GraphQL can't filter comma-separated tags
  const paginatedEdges = filteredEdges.slice(offset, offset + limit);

  const pageTitle =
    currentPage > 0
      ? `${group} - Page ${currentPage} - ${siteTitle}`
      : `${group} - ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
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
        pageAttributes: {
          template: { eq: "post" }
          draft: { ne: "true" }
        }
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
