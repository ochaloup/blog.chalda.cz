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

const IndexTemplate: React.FC<Props> = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const { pagination } = pageContext;
  const { currentPage, hasNextPage, hasPrevPage, prevPagePath, nextPagePath } =
    pagination;

  const { edges } = data.allAsciidoc;
  const pageTitle =
    currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar isIndex />
      <Page>
        <Feed edges={edges} />
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
  query IndexTemplate($limit: Int!, $offset: Int!) {
    allAsciidoc(
      limit: $limit
      skip: $offset
      sort: { order: DESC, fields: [revision___date] }
      filter: { pageAttributes: { template: { eq: "post" }, draft: { ne: "true" } } }
    ) {
      edges {
        node {
          fields {
            categorySlug
            slug
          }
          pageAttributes {
            description
            category
            socialimage
          }
          document {
            title
          }
          revision {
            date
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
