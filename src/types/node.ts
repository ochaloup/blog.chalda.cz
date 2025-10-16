import Document from "./document";
import Fields from "./fields";
import PageAttributes from "./page-attributes";
import Revision from "./revision";

interface Node {
  id: string;
  fields: Fields;
  pageAttributes: PageAttributes;
  document: Document;
  revision: Revision;
  html: string;
}

export default Node;
