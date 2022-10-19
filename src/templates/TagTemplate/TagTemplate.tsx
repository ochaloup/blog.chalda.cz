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

  const { group, pagination } = pageContext;
  // TODO: here we should manually handle limit and offset on the filteredEdges
  // then the hasPrevPage and hasNextPage could be handled as well better
  const { currentPage, prevPagePath, nextPagePath, hasPrevPage, hasNextPage } =
    pagination;

  const { edges } = data.allAsciidoc;
  console.log(`>>> ${group}`)
  const filteredEdges = edges.filter(e => {
    console.log(`${e.node.pageAttributes.tags}`)
    return e.node.pageAttributes.tags?.includes(group || "")
  });
  const pageTitle =
    currentPage > 0
      ? `${group} - Page ${currentPage} - ${siteTitle}`
      : `${group} - ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar />
      <Page title={group}>
        <Feed edges={filteredEdges} />
        {/* <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        /> */}
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
      sort: { order: DESC, fields: [revision___date] }
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
