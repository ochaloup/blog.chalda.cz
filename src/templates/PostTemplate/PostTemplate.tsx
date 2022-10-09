import React from "react";

import { graphql } from "gatsby";

import { Layout } from "@/components/Layout";
import { Post } from "@/components/Post";
import { useSiteMetadata } from "@/hooks";
import { Node } from "@/types";

interface Props {
  data: {
    asciidoc: Node;
  };
}

const PostTemplate: React.FC<Props> = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { pageAttributes, document } = data.asciidoc;
  const { description = "", socialimage } = pageAttributes;
  const { title } = document;
  const metaDescription = description || siteSubtitle;
  const tags = data.asciidoc.pageAttributes?.tags?.split(",").map(t => t.trim()) || [];

  return (
    <Layout
      title={`${title} - ${siteTitle}`}
      description={metaDescription}
      socialimage={socialimage}
    >
      <Post post={data.asciidoc} tags={tags} />
    </Layout>
  );
};

export const query = graphql`
  query PostTemplate($slug: String!) {
    asciidoc(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      revision {
        date
      }
      pageAttributes {
        description
        tags
        socialimage
      }
      document {
        title
      }
    }
  }
`;

export default PostTemplate;
