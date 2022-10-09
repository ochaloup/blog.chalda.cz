import React from "react";
import renderer from "react-test-renderer";

import { Tags } from "@/components/Post/Tags";
import * as mocks from "@/mocks";

describe("Tags", () => {
  it("renders correctly", () => {
    const props = {
      tags: mocks.asciidoc.pageAttributes.tags.split(",").map(t => t.trim()),
      tagSlugs: mocks.asciidoc.fields.tagsSlugs,
    };

    const tree = renderer.create(<Tags {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
