import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ page, setPage }) {
  const perviousHandler = () => {
    if (page <= 1) {
      return false;
    }
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) {
      return false;
    }
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={page === 1 ? styles.disabled : null}
        onClick={perviousHandler}
      >
        Previous
      </button>
      <p className={page === 1 ? styles.selected : null}>1</p>
      <p className={page === 2 ? styles.selected : null}>2</p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p className={styles.selected}>{page}</p>
        </>
      )}
      <span>...</span>
      <p className={page === 9 ? styles.selected : null}>9</p>
      <p className={page === 10 ? styles.selected : null}>10</p>
      <button
        className={page === 10 ? styles.disabled : null}
        onClick={nextHandler}
      >
        Next
      </button>
    </div>
  );
}
