import React from "react";

import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";

const NotFoundTemplate: React.FC = () => (
  <Layout>
    <Sidebar />
    <Page title="NOT FOUND">
      <p>You just hit a route that doesn't exist... the sadness.</p>
    </Page>
  </Layout>
);

export const Head: React.FC = () => {
  const { title, subtitle, author, url } = useSiteMetadata();
  const metaImageUrl = url + author.photo;

  return (
    <>
      <html lang="en" />
      <title>{`Not Found - ${title}`}</title>
      <meta name="description" content={subtitle} />
      <meta property="og:site_name" content={`Not Found - ${title}`} />
      <meta property="og:image" content={metaImageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`Not Found - ${title}`} />
      <meta name="twitter:description" content={subtitle} />
      <meta name="twitter:image" content={metaImageUrl} />
    </>
  );
};

export default NotFoundTemplate;
