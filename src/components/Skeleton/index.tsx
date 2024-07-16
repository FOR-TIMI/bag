import React, { CSSProperties } from "react";
import "./Skeleton.scss";

type Props = {
  styles?: CSSProperties;
  variant?: "full" | "split";
};

const Skeleton: React.FC<Props> = ({ styles, variant = "full" }: Props) => {
  const split = (
    <div style={styles} className="skeleton-loader">
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
    </div>
  );

  const full = (
    <div style={styles} className="skeleton-loader">
      <div className="skeleton-item"></div>
    </div>
  );

  switch (variant) {
    case "split":
      return split;
    default:
      return full;
  }
};

export default Skeleton;
