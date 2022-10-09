import { CreatePagesArgs } from "gatsby";

import * as types from "../types";

export interface PagesQueryResult {
  allAsciidoc: {
    edges?: Array<types.Edge>;
  };
}

const pagesQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<PagesQueryResult>(`
    {
      allAsciidoc(filter: { pageAttributes: { draft: { ne: "true" } } }) {
        edges {
          node {
            pageAttributes {
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return result?.data?.allAsciidoc?.edges ?? [];
};

export default pagesQuery;
