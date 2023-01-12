import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/button";
import Layout from "../components/layout";
import TextField from "../components/textfield";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [patientName, setPatientName] = useState(null);

  return (
    <Layout>
      {/* <div className="mx-auto max-w-7xl lg:px-8"> */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
          <div className="lg:py-24">
            <a
              href="https://www.duerr-ndt.com/"
              className="inline-flex items-center rounded-full bg-black p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
            >
              <span className="rounded-full bg-white px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                <Image
                  alt="duerr-ndt-logo"
                  src="/duerr-ndt-logo.png"
                  width={50}
                  height={10}
                />
              </span>
              <span className="ml-4 text-sm">Visit our main page</span>
              <ChevronRightIcon
                className="ml-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </a>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
              <span className="block">DICOM Server</span>
              <span className="block text-cyan-400">Web Viewer</span>
            </h1>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Enter Patient Name and/or Patient ID to get studies for a specific
              patient. If not, just press &quot;search&quot; to view list of
              studies available
            </p>
            <div className="mt-10 sm:mt-12">
              <div className="lg:mx-0">
                <form
                  onSubmit={(e) => {
                    console.log(e, "SUBMITTTTTT");
                    e.preventDefault();
                    // router.push({
                    //   pathname: "/studies",
                    //   query: { patientId, patientName },
                    // });
                  }}
                  className="sm:flex gap-x-4"
                >
                  <TextField
                    label="Patient ID"
                    onChange={(e) => {
                      setPatientId(e.target.value);
                    }}
                    placeholder="e.g. 3215648544"
                  />
                  <TextField
                    label="Patient Name"
                    onChange={(e) => {
                      setPatientName(e.target.value);
                    }}
                    placeholder="e.g. John Doe"
                  />
                  <div className="mt-3 sm:mt-0 sm:ml-3 self-end">
                    <Button
                      onClick={() => {
                        router.push({
                          pathname: "/studies",
                          query: { patientId, patientName },
                        });
                      }}
                      label="Search Studies"
                      type="submit"
                    />
                  </div>
                </form>
                <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                  This is a demo page. Powered by{" "}
                  <a
                    href="https://dicomserver.co.uk/"
                    className="font-medium text-white"
                  >
                    DICOM Server
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
            {/* <img
              className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/illustration.svg"
              alt=""
            /> */}

            <Image
              alt="background_illustration"
              src="/Illustration.svg"
              className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
}
