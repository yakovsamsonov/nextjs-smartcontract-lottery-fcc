import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import ManualHeader from "../components/ManualHeader"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>YS Smart Contract Lottery</title>
                <meta name="description" content="YS smart contract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ManualHeader />
            Hello! Two!
        </div>
    )
}
