import { CalendarIcon, PhotoIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs";
import Layout from "../../components/layout";
import Loading from "../../components/loader";
import { classNames } from "../../utils/css-helper";

const StudyDetail = () => {
  const router = useRouter();
  const { studyId } = router.query;
  const [studyDetails, setStudyDetails] = useState(null);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchStudyDetails = (path) => {
    setLoading(true);
    fetch(path).then((res) => {
      res.json().then((data) => {
        console.log("STUDY DETAILS", data[0]);
        setStudyDetails(data[0]);
      });
    });
  };
  useEffect(() => {
    if (studyId) {
      let path = `https://dicomserver.co.uk/WebViewerWebAPI/WebViewer/FetchStudyData?studyUID=${studyId}`;
      // let path = `/api/studies/${studyId}`;
      console.log("fetch path", path);

      fetchStudyDetails(path);
    }
  }, [studyId]);

  useEffect(() => {
    if (studyDetails) setLoading(false);
  }, [studyDetails]);
  return (
    <Layout>
      <Breadcrumbs
        pages={[
          { name: "List of Studies", href: "/studies", current: false },
          { name: "Study Details", href: "#", current: true },
        ]}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex h-full">
          <div className="rounded-lg p-2 min-w-fit max-w-sm lg:p-8 h-full bg-cyan-100">
            <h1 className="text-xl text-cyan-700 font-medium">
              {studyDetails?.patientName}
            </h1>
            <div className="flex flex-col items-start w-full text-gray-500">
              <span className="inline-flex items-center gap-x-2">
                <CalendarIcon width={20} height={20} />
                {moment(studyDetails?.studyDate, "YYYYMMDD").format(
                  "MMMM Do, YYYY"
                )}
              </span>
              <div className="flex gap-x-3 items-center">
                <span className="inline-flex items-center gap-x-2">
                  <PhotoIcon width={20} height={20} />
                  {studyDetails?.imageCount}
                </span>
                <span>
                  <span className="font-semibold">Modalities: </span>{" "}
                  {studyDetails?.modalities}
                </span>
              </div>
              <div className="flex flex-col gap-y-8 items-center self-center mt-10">
                {studyDetails?.series?.map((srs) => (
                  <div
                    key={srs?.seriesUID}
                    onClick={() => {
                      setCurrentSelection(srs);
                    }}
                    className={classNames(
                      currentSelection?.seriesUID === srs?.seriesUID
                        ? "ring-cyan-400 ring-2 ring-offset-8 ring-offset-cyan-200"
                        : "hover:ring-gray-400 hover:ring-1 hover:ring-offset-8 hover:ring-offset-cyan-100",
                      "cursor-pointer rounded-lg "
                    )}
                  >
                    <Image
                      src={"/CT-Scan.jpg"}
                      alt="dummy-image"
                      className="rounded-lg"
                      width={200}
                      height={200}
                    />

                    <div className="flex items-center justify-between mt-2">
                      <span className="">
                        <span className="font-semibold">S: </span>
                        {srs?.seriesNumber}
                      </span>
                      <span className="">
                        <span className="font-semibold">M: </span>
                        {srs?.modality}
                      </span>
                      <span className="flex items-center gap-x-2">
                        <PhotoIcon width={20} height={20} />
                        {srs?.instanceCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ml-10 h-[82vh] w-full">
            <main className="p-10 py-10 h-full w-full right-0 block relative rounded-lg inset-0 bg-gray-500 bg-opacity-75">
              <Image
                src={"/CT-Scan.jpg"}
                alt="dummy-image"
                className="rounded-lg"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </main>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudyDetail;
