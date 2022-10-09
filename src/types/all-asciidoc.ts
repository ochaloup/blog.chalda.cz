import Edge from "./edge";

interface AllAsciidoc {
  edges: Array<Edge>;
  group: Array<{
    fieldValue: string;
    totalCount: number;
  }>;
}

export default AllAsciidoc;
