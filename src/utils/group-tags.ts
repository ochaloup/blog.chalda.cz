interface TagPageAttributes {
  tags?: string;
}
interface TagNode {
  pageAttributes?: TagPageAttributes;
}
interface TagEdge {
  node: TagNode;
}

const groupTag = (
  edges: TagEdge[],
): Array<{ fieldValue: string; totalCount: number }> =>
  edges
    ?.flatMap((e: TagEdge) =>
      e.node.pageAttributes?.tags?.split(",").map((t) => t.trim()),
    )
    .reduce(
      (returnedArray, value) => {
        if (returnedArray === undefined || value === undefined)
          return returnedArray;
        let toUpdate = returnedArray.find(
          (arrayValue) => arrayValue.fieldValue === value,
        );
        if (toUpdate === undefined) {
          returnedArray.push({ fieldValue: value, totalCount: 1 });
        } else {
          toUpdate.totalCount += 1;
        }
        return returnedArray;
      },
      [{ fieldValue: "", totalCount: 0 }],
    ) || [];

export default groupTag;
