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
  const { pagination } = pageContext;
  const { hasNextPage, hasPrevPage, prevPagePath, nextPagePath } = pagination;

  const { edges } = data.allAsciidoc;

  return (
    <Layout>
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

export const Head: React.FC<Props> = ({ pageContext }) => {
  const {
    title: siteTitle,
    subtitle: siteSubtitle,
    author,
    url,
  } = useSiteMetadata();
  const { pagination } = pageContext;
  const { currentPage } = pagination;

  const pageTitle =
    currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;
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
  query IndexTemplate($limit: Int!, $offset: Int!) {
    allAsciidoc(
      limit: $limit
      skip: $offset
      sort: { revision: { date: DESC } }
      filter: {
        pageAttributes: { template: { eq: "post" }, draft: { ne: "true" } }
      }
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
