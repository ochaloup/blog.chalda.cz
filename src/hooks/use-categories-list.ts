import { graphql, useStaticQuery } from "gatsby";

interface CategoriesQueryResult {
  allAsciidoc: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>;
  };
}

const useCategoriesList = () => {
  const { allAsciidoc } = useStaticQuery<CategoriesQueryResult>(
    graphql`
      query CategoriesListQuery {
        allAsciidoc(
          filter: {
            pageAttributes: { template: { eq: "post" }, draft: { ne: "true" } }
          }
        ) {
          group(field: pageAttributes___category) {
            fieldValue
            totalCount
          }
        }
      }
    `,
  );

  return allAsciidoc.group ?? [];
};

export default useCategoriesList;
