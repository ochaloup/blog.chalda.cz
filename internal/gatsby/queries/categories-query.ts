import { CreatePagesArgs } from "gatsby";

interface CategoriesQueryResult {
  allAsciidoc: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>;
  };
}

const categoriesQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<CategoriesQueryResult>(`
    {
      allAsciidoc(
        filter: {
          pageAttributes: { template: { eq: "post" }, draft: { ne: "true" } }
        }
        sort: { revision: { date: DESC } }
      ) {
        group(field: { pageAttributes: { category: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return result?.data?.allAsciidoc?.group ?? [];
};

export default categoriesQuery;
