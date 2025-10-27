import React from "react";

import { Link } from "gatsby";

import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useCategoriesList, useSiteMetadata } from "@/hooks";
import { toKebabCase } from "@/utils";

const CategoriesTemplate: React.FC = () => {
  const categories = useCategoriesList();

  return (
    <Layout>
      <Sidebar />
      <Page title="Categories">
        <ul>
          {categories.map((category) => (
            <li key={category.fieldValue}>
              <Link to={`/category/${toKebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
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
      <title>{`Categories - ${title}`}</title>
      <meta name="description" content={subtitle} />
      <meta property="og:site_name" content={`Categories - ${title}`} />
      <meta property="og:image" content={metaImageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`Categories - ${title}`} />
      <meta name="twitter:description" content={subtitle} />
      <meta name="twitter:image" content={metaImageUrl} />
    </>
  );
};

export default CategoriesTemplate;
