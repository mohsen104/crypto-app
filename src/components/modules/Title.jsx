import React from "react";
import styles from "./Title.module.css";

export default function Title({ title, subtitle }) {
  return (
    <div className={styles.box}>
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
