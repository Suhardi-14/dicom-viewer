import Head from "next/head";
import { Children } from "react";
import Container from "./container";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>DICOM Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative overflow-hidden">
        <Navbar />
        <Container>{children}</Container>
      </div>
    </>
  );
};
export default Layout;
