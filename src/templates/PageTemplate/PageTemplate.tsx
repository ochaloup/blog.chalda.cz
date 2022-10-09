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
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: body } = data.asciidoc;
  const { pageAttributes, document } = data.asciidoc;
  const { description = "", socialimage } = pageAttributes;
  const { title } = document;
  const metaDescription = description || siteSubtitle;

  return (
    <Layout
      title={`${title} - ${siteTitle}`}
      description={metaDescription}
      socialimage={socialimage}
    >
      <Sidebar />
      <Page title={title}>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Page>
    </Layout>
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
