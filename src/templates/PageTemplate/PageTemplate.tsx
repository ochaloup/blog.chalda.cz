import React from "react";

import { graphql } from "gatsby";

import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { Node } from "@/types";

interface Props {
  data: {
    asciidoc: Node;
  };
}

const PageTemplate: React.FC<Props> = ({ data }: Props) => {
  const { html: body } = data.asciidoc;
  const { document } = data.asciidoc;
  const { title } = document;

  return (
    <Layout>
      <Sidebar />
      <Page title={title}>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Page>
    </Layout>
  );
};

export const Head: React.FC<Props> = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle, url } = useSiteMetadata();
  const { pageAttributes, document } = data.asciidoc;
  const { description = "", socialimage } = pageAttributes;
  const { title } = document;
  const metaDescription = description || siteSubtitle;
  const metaImage = socialimage || "/photo.jpg";
  const metaImageUrl = url + metaImage;

  return (
    <>
      <html lang="en" />
      <title>{`${title} - ${siteTitle}`}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={metaImageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImageUrl} />
    </>
  );
};

export const query = graphql`
  query PageTemplate($slug: String!) {
    asciidoc(fields: { slug: { eq: $slug } }) {
      id
      html
      revision {
        date
      }
      pageAttributes {
        description
        socialimage
      }
      document {
        title
      }
    }
  }
`;

export default PageTemplate;
