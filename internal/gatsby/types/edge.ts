import { Node as GatsbyNode } from "gatsby";

interface Revision {
  date?: string;
  number?: string;
}

interface PageAttributes {
  slug?: string;
  template?: string;
  category?: string;
  description?: string;
  tags?: string;
}

interface Document {
  title?: string;
}

interface Fields {
  slug?: string;
  categorySlug?: string;
  tagSlugs?: Array<string>;
}

interface Node extends GatsbyNode {
  fields?: Fields;
  revision?: Revision;
  pageAttributes?: PageAttributes;
  document?: Document;
}

interface Edge {
  node: Node;
}

export default Edge;
