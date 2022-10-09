import React from "react";
import renderer from "react-test-renderer";

import { Content } from "@/components/Post/Content";
import * as mocks from "@/mocks";

describe("Content", () => {
  it("renders correctly", () => {
    const props = {
      title: mocks.asciidoc.document.title,
      body: mocks.asciidoc.html,
    };

    const tree = renderer.create(<Content {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
