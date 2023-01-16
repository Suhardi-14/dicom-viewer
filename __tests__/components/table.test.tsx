import { logRoles, render, screen, within } from "@testing-library/react";
import Table, { TableColumnProps } from "../../components/table";

describe("Table", () => {
  const tableColumns: TableColumnProps[] = [
    {
      title: "First Name",
      cell: (row) => <p>{row?.firstName}</p>,
    },
    {
      title: "Last Name",
      cell: (row) => <p>{row?.lastName}</p>,
    },
    {
      title: "Email",
      cell: (row) => <p>{row?.email}</p>,
    },
  ];

  test("renders basic table correctly", () => {
    const tableData = [
      { firstName: "John", lastName: "Doe", email: "john.doe@email.com" },
      {
        firstName: "Anne",
        lastName: "Boleyn",
        email: "anne.boleyn@hotmail.com",
      },
      { firstName: "Pete", lastName: "Mitchell", email: "maverick@usn.com" },
    ];
    const view = render(<Table columns={tableColumns} data={tableData} />);
    logRoles(view.container);
    // screen.debug();
    const tableHeaders = screen.getAllByRole("columnheader");

    expect(tableHeaders).toHaveLength(3);
    tableHeaders.forEach((hdr, idx) => {
      expect(hdr).toHaveTextContent(tableColumns[idx].title as string);
    });

    const tableBody = screen.getByLabelText("table-body");
    const dataRows = within(tableBody).getAllByRole("row");

    expect(dataRows).toHaveLength(3);

    dataRows.forEach((row, rowIdx) => {
      const rowCells = within(row).getAllByRole("cell");
      expect(rowCells[0]).toHaveTextContent(tableData[rowIdx].firstName);
      expect(rowCells[1]).toHaveTextContent(tableData[rowIdx].lastName);
      expect(rowCells[2]).toHaveTextContent(tableData[rowIdx].email);
    });
  });

  test("renders table with proper pagination", () => {
    const tableDataForPagination = [
      { firstName: "John", lastName: "Doe", email: "john.doe@email.com" },
      {
        firstName: "Anne",
        lastName: "Boleyn",
        email: "anne.boleyn@hotmail.com",
      },
      { firstName: "Pete", lastName: "Mitchell", email: "maverick@usn.com" },
      {
        firstName: "Robert",
        lastName: "Bruce",
        email: "robert.bruce@ymail.com",
      },
      { firstName: "Brad", lastName: "Pitt", email: "bpitt@hmail.com" },
      {
        firstName: "Angelina",
        lastName: "Jolie",
        email: "angyjolie@smail.com",
      },
      {
        firstName: "Novak",
        lastName: "Djokovic",
        email: "novak@grandslam.com",
      },
      { firstName: "Viktor", lastName: "Axelsen", email: "viktorax@den.com" },
      { firstName: "Erdson", lastName: "Pele", email: "erdsonpele@bra.com" },
      { firstName: "Messi", lastName: "Ronaldo", email: "messinaldo@arg.com" },
    ];
    let currentPage = 2;
    let perPage = 4;
    const view = render(
      <Table
        columns={tableColumns}
        data={tableDataForPagination}
        currentPage={currentPage}
        perPage={perPage}
      />
    );

    const resultIndicator = screen.getByRole("heading");

    expect(resultIndicator).toHaveTextContent(/showing 5 - 8 of 10 records/i);

    const tableBody = screen.getByLabelText("table-body");
    const dataRows = within(tableBody).getAllByRole("row");

    expect(dataRows).toHaveLength(4);

    dataRows.forEach((row, rowIdx) => {
      const rowCells = within(row).getAllByRole("cell");
      expect(rowCells[0]).toHaveTextContent(
        tableDataForPagination[rowIdx + (currentPage * perPage - perPage)]
          .firstName
      );
      expect(rowCells[1]).toHaveTextContent(
        tableDataForPagination[rowIdx + (currentPage * perPage - perPage)]
          .lastName
      );
      expect(rowCells[2]).toHaveTextContent(
        tableDataForPagination[rowIdx + (currentPage * perPage - perPage)].email
      );
    });

    const tableFooter = screen.getByLabelText("Pagination");
    const pageInfo = within(tableFooter).getByText(/page /i);
    expect(pageInfo).toHaveTextContent(/page 2 of 3/i);

    const nextButton = screen.getByRole("button", {
      name: /next/i,
    });

    const prevButton = screen.getByRole("button", {
      name: /previous/i,
    });

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
  });
});
