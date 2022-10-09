import React from "react";

import { Link } from "gatsby";

import type { Node } from "@/types";

import { Author } from "./Author";
import { Comments } from "./Comments";
import { Content } from "./Content";
import { Meta } from "./Meta";
import { Tags } from "./Tags";

import * as styles from "./Post.module.scss";

interface Props {
  post: Node;
  tags: string[];
}

const Post: React.FC<Props> = ({ post, tags }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { title} = post.document;
  const { date } = post.revision;

  return (
    <div className={styles.post}>
      <Link className={styles.button} to="/">
        All Articles
      </Link>

      <div className={styles.content}>
        <Content body={html} title={title} />
      </div>

      <div className={styles.footer}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles.comments}>
        <Comments postSlug={slug} postTitle={post.document.title} />
      </div>
    </div>
  );
};

export default Post;
