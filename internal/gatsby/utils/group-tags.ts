interface TagEdge {
  node: TagNode;
}
interface TagNode {
  pageAttributes?: TagPageAttributes;
}
interface TagPageAttributes {
  tags?: string;
}

const groupTag = (edges: TagEdge[]): Array<{fieldValue: string; totalCount: number }> => {
  return edges?.flatMap(
    (e: TagEdge) => e.node.pageAttributes?.tags?.split(",").map(t => t.trim())
  ).reduce((returnedArray, value) => {
    if (returnedArray === undefined || value === undefined) return returnedArray;
    let toUpdate = returnedArray.find((arrayValue) => arrayValue.fieldValue == value);
    if (toUpdate != undefined) {
      toUpdate.totalCount += 1;
    } else {
      returnedArray.push({fieldValue: value, totalCount: 1});
    }
    return returnedArray;
  }, new Array<{fieldValue: string; totalCount: number }>()) || [];
}

export default groupTag;
