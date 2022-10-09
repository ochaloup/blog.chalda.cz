import { graphql, useStaticQuery } from "gatsby";
import { groupTag } from "@/utils";

import * as types from "../types";


interface TagsQueryResult {
  allAsciidoc: {
    edges?: Array<types.Edge>;
  }
}

const useTagsList = () => {
  const { allAsciidoc } = useStaticQuery<TagsQueryResult>(
    graphql`
      query TagsListQuery {
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
    `,
  );

  return groupTag(allAsciidoc?.edges || []);
};

export default useTagsList;
