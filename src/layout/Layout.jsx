import React from "react";
import styles from "./Layout.module.css";
import AnimationHeader from "../assets/animation-header.json";
import Lottie from "lottie-react";

export default function Layout({ children }) {
  return (
    <>
      <nav className={styles.nav}>
        <h1>Crypto App</h1>
        <p></p>
      </nav>
      <header className={styles.header}>
        <div>
          <h2>Start and Build Your Crypto Portfolio Here</h2>
          <p>
            Only at CryptoCap, you can build a good portfolio and learn best
            practices about cryptocurrency.
          </p>
        </div>
        <Lottie
          className={styles.anim}
          animationData={AnimationHeader}
          loop={true}
          width={320}
          height={400}
        />
      </header>
      {children}
      {/* <footer className={styles.footer}>
        <p>Developed by Mohsen</p>
    </footer> */}
    </>
  );
}
