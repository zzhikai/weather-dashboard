import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div>
        <h1>
          Welcome to the Demostration of Weather Forecast API and Contacts API
        </h1>
      </div>
      {/* <Dashboard />
      <Contacts /> */}
    </div>
  );
}
