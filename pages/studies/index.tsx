import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs";
import Button from "../../components/button";
import Layout from "../../components/layout";
import Loading from "../../components/loader";
import Table, { TableColumnProps } from "../../components/table";
import TextField from "../../components/textfield";

const StudiesListing = () => {
  const router = useRouter();
  const { patientId, patientName } = router.query;
  const [studies, setStudies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ptId, setPtId] = useState(patientId);
  const [ptName, setPtName] = useState(patientName);
  const [currentPage, setCurrentPage] = useState(1);

  const column: TableColumnProps[] = [
    {
      title: "Patient Name",
      cell: (row) => (
        <div>
          <span className="block">{row?.PatientName}</span>
        </div>
      ),
    },
    {
      title: "Patient ID",
      cell: (row) => (
        <div>
          <span className="block ">{row?.PatientID}</span>
        </div>
      ),
    },
    {
      title: "Study Date",
      cell: (row) => (
        <div>
          <span className="block">{row?.StudyDate}</span>
        </div>
      ),
    },
    {
      title: "Study Description",
      cell: (row) => (
        <div>
          <span className="flex-wrap">{row?.StudyDescription}</span>
        </div>
      ),
    },
    {
      title: "Accession Number",
      cell: (row) => (
        <div>
          <span className="block">{row?.AccessionNumber}</span>
        </div>
      ),
    },
    {
      title: "Specific Character Set",
      cell: (row) => (
        <div>
          <span className="block">{row?.SpecificCharacterSet}</span>
        </div>
      ),
    },
    {
      title: "Action",
      cell: (row) => (
        <div className="whitespace-nowrap">
          <Button
            label="View Details"
            onClick={() => {
              router.push(`/studies/${row?.StudyInstanceUID}`);
            }}
          />
        </div>
      ),
    },
  ];

  const fetchStudies = (path) => {
    setLoading(true);
    setCurrentPage(1);
    fetch(path).then((res) => {
      res.json().then((data) => {
        console.log("STUDIES RECORD", data);
        const tableData = data?.result?.map((study) => {
          const {
            StudyInstanceUID,
            PatientName,
            PatientID,
            StudyDate,
            StudyDescription,
            AccessionNumber,
            SpecificCharacterSet,
            ModalitiesInStudy,
          } = study?.elements;
          return {
            StudyInstanceUID,
            PatientName,
            PatientID,
            StudyDate: moment(StudyDate, "YYYYMMDD").format("L"),
            StudyDescription,
            AccessionNumber,
            SpecificCharacterSet,
            ModalitiesInStudy,
          };
        });
        console.log("STUDIES TABLE DATA", tableData);
        setStudies(tableData);
      });
    });
  };
  useEffect(() => {
    let path = `/api/studies?PatientID=${patientId || "*"}&PatientName=${
      patientName || "*"
    }`;
    fetchStudies(path);
  }, []);

  useEffect(() => {
    if (studies?.length >= 0) setLoading(false);
  }, [studies]);

  const onNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <Layout>
      <Breadcrumbs
        pages={[{ name: "List of Studies", href: "#", current: false }]}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="grid grid-cols-1 gap-y-2 lg:grid-cols-3 lg:gap-x-2 bg-cyan-200 p-4 rounded-md mb-4"
      >
        <TextField
          label={<span className="text-cyan-700">Patient ID</span>}
          name="patient-id"
          value={ptId}
          onChange={(e) => {
            setPtId(e.target.value);
          }}
        />
        <TextField
          label={<span className="text-cyan-700">Patient Name</span>}
          name="patient-name"
          value={ptName}
          onChange={(e) => {
            setPtName(e.target.value);
          }}
        />
        <div className="flex flex-row gap-x-2 justify-end items-end">
          <Button
            onClick={() => {
              let path = `/api/studies?PatientID=${ptId || "*"}&PatientName=${
                ptName || "*"
              }`;
              fetchStudies(path);
            }}
            label="Search Studies"
            className="!w-fit h-12"
            type="submit"
          />
          <Button
            onClick={() => {
              setPtId("");
              setPtName("");
              let path = `/api/studies`;
              fetchStudies(path);
            }}
            label="Reset"
            className="!w-fit h-12"
          />
        </div>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Table
          columns={column}
          data={studies}
          showCount
          perPage={10}
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPreviousPage={onPrevPage}
        />
      )}
    </Layout>
  );
};

export default StudiesListing;
