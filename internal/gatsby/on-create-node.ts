import { type Node, type GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

import { routes } from "./constants/routes";
import { concat } from "./utils/concat";
import { type Edge } from "./types/edge";
import { toKebabCase } from "./utils/to-kebab-case";

const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Asciidoc") {
    const { pageAttributes, parent } = node as Node & Edge["node"];
    const { tags, category, slug } = pageAttributes || {};

    if (slug) {
      const dirname = parent && getNode(parent)?.relativeDirectory;
      const value =
        typeof dirname === "string"
          ? concat("/", dirname, "/", slug)
          : concat("/", slug);

      createNodeField({ node, name: "slug", value });
    } else {
      const value = createFilePath({ node, getNode });
      createNodeField({ node, name: "slug", value });
    }

    if (tags) {
      const splitTags = tags.split(",").map((t) => t.trim());
      const value = splitTags.map((tag) =>
        concat(routes.tagRoute, "/", toKebabCase(tag), "/"),
      );

      createNodeField({ node, name: "tagSlugs", value });
    }

    if (category) {
      const value = concat(routes.categoryRoute, "/", toKebabCase(category));

      createNodeField({ node, name: "categorySlug", value });
    }
  }
};

export { onCreateNode };
