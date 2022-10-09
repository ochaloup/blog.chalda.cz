import Fields from "./fields";
import PageAttributes from "./page-attributes";
import Revision from "./revision";
import Document from "./document";

interface Node {
  id: string;
  fields: Fields;
  pageAttributes: PageAttributes;
  document: Document;
  revision: Revision;
  html: string;
}

export default Node;
