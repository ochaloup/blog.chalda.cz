import React from "react";

import { Link } from "gatsby";

import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata, useTagsList } from "@/hooks";
import { toKebabCase } from "@/utils";

const TagsTemplate: React.FC = () => {
  const tags = useTagsList();

  return (
    <Layout>
      <Sidebar />
      <Page title="Tags">
        <ul>
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${toKebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export const Head: React.FC = () => {
  const { title, subtitle, author, url } = useSiteMetadata();
  const metaImageUrl = url + author.photo;

  return (
    <>
      <html lang="en" />
      <title>{`Tags - ${title}`}</title>
      <meta name="description" content={subtitle} />
      <meta property="og:site_name" content={`Tags - ${title}`} />
      <meta property="og:image" content={metaImageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`Tags - ${title}`} />
      <meta name="twitter:description" content={subtitle} />
      <meta name="twitter:image" content={metaImageUrl} />
    </>
  );
};

export default TagsTemplate;
