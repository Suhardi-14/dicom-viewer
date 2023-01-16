import { logRoles, render, screen, within } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import Button from "../../../components/button";
import { TableColumnProps } from "../../../components/table";
import { sampleStudies } from "../../../mocks/studiesResult";
import StudiesListing from "../../../pages/studies";
import { createMockRouter } from "../../../test-utils/createMockRouter";

describe("Studies Listing", () => {
  const tableColumns: TableColumnProps[] = [
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
          <Button label="View Details" />
        </div>
      ),
    },
  ];
  test("renders correctly", async () => {
    const view = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <StudiesListing />
      </RouterContext.Provider>
    );

    logRoles(view.container);

    const link = screen.getByRole("link", {
      name: /your company duerr\-ndt\-logo/i,
    });
    const companyImg = within(link).getByRole("img", {
      name: /duerr\-ndt\-logo/i,
    });
    expect(companyImg).toBeVisible();
    expect(link).toHaveAttribute("href", "/");

    const idField = screen.getByRole("textbox", { name: /patient id/i });
    const nameField = screen.getByRole("textbox", { name: /patient name/i });
    const searchButton = screen.getByRole("button", {
      name: /search studies/i,
    });
    const resetButton = screen.getByRole("button", {
      name: /reset/i,
    });
    expect(idField).toBeInTheDocument();
    expect(nameField).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();

    const resultIndicator = await screen.findByRole("heading", {
      name: /showing/i,
    });
    expect(resultIndicator).toHaveTextContent(/showing 1 \- 5 of 5 records/i);

    const tableHeaders = await screen.findAllByRole("columnheader");
    expect(tableHeaders).toHaveLength(tableColumns.length + 1);
    tableHeaders.slice(1).forEach((hdr, idx) => {
      expect(hdr).toHaveTextContent(tableColumns[idx].title as string);
    });

    const tableBody = await screen.findByLabelText("table-body");
    const dataRows = await within(tableBody).findAllByRole("row");
    expect(dataRows).toHaveLength(sampleStudies.result.length);
  });
});
