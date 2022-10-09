import { CreatePagesArgs } from "gatsby";

import * as types from "../types";
import groupTag from "../utils/group-tags";

interface TagsQueryResult {
  allAsciidoc: {
    edges?: Array<types.Edge>;
  }
}

const tagsQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<TagsQueryResult>(`
    {
      allAsciidoc(
        filter: {
          pageAttributes: { template: { eq: "post" }, draft: { ne: "true" } }
        }
      ) {
        edges {
          node {
            pageAttributes {
              tags
            }
          }
        }
      }
    }
  `);

  return groupTag(result?.data?.allAsciidoc?.edges || []);
};

export default tagsQuery;
