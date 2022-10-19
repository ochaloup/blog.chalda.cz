import React, { Component } from "react";

import { Link } from "gatsby";

import { Edge } from "@/types";

// import { StaticImage } from "gatsby-plugin-image"

import * as styles from "./Feed.module.scss";

type Props = {
  edges: Array<Edge>;
};


type FeedImageProps = {
  src: string
}

export class FeedImage extends Component<FeedImageProps> {
  static defaultProps = {
    src: ''
  }

  render() {
    if (this.props.src != undefined && this.props.src && this.props.src.trim()) {
      return <img loading="lazy" src={this.props.src} className="feedimage" />
    } else {
      return
    }
  }
}


const Feed: React.FC<Props> = ({ edges }: Props) => (
  <div className={styles.feed}>
    {edges.map((edge) => (
      <div className={styles.item} key={edge.node.fields.slug}>
        <div className={styles.meta}>
          <time
            className={styles.time}
            dateTime={new Date(edge.node.revision.date).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "long", day: "numeric" },
            )}
          >
            {new Date(edge.node.revision.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </time>
          <span className={styles.divider} />
          <span className={styles.category}>
            <Link to={edge.node.fields.categorySlug} className={styles.link}>
              {edge.node.pageAttributes.category}
            </Link>
          </span>
        </div>
        <h2 className={styles.title}>
          <Link className={styles.link} to={edge.node.fields.slug}>
            {edge.node.document.title}
          </Link>
        </h2>
        <p className={styles.description}>
          {edge.node.pageAttributes.description}
          <FeedImage src={edge.node.pageAttributes.socialimage} />

        </p>
        <Link className={styles.more} to={edge.node.fields.slug}>
          Read
        </Link>
      </div>
    ))}
  </div>
);

export default Feed;
