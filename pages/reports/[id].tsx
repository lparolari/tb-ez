import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import Report from "lib/Report";

import { getReport } from "../../lib/api";
import styles from "../../styles/Report.module.scss";
import { useRouter } from "next/dist/client/router";

interface Data {
  report: Report;
}

const ReportDetails: NextPage<Data> = ({ report }) => {
  const router = useRouter();
  return (
    <div className="container">
      <Head>
        <title>{report.name} | TBEZ</title>
        <meta name="description" content={`${report.name}`} />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className="main">
        <h1 className={styles.title}>{report.name}</h1>

        <a className="btn" onClick={() => router.back()}>
          &larr; Indietro
        </a>
        <div className="grid">
          <video controls poster={report.thumbnailUrl} width="100%">
            <source src={report.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>

      <footer className="footer">
        <p>
          TB<span>EZ</span> | Tutti i contenuti di Teleboario senza noia.
        </p>
      </footer>
    </div>
  );
};

export default ReportDetails;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || !params.id) {
    throw new Error("No params");
  }

  const report = await getReport(params.id as string);

  return { props: { report } };
};
