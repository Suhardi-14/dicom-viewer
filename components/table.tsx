import React, { useEffect, useRef, useState } from "react";
import { RenderIf } from "./optional-render";
import { classNames } from "../utils/css-helper";
import Button from "./button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export interface GroupedRowData {
  group_header: any;
  grouped_row_data: any[];
  group_footer?: any;
}
interface TableProps {
  columns: TableColumnProps[];
  data?: any;
  selectable?: boolean;
  selectedItems?: any;
  setSelectedItems?: any;
  showCount?: boolean;
  groupedRow?: boolean;
  groupedRowData?: GroupedRowData[];
  onClickBulkEdit?: any;
  onClickDeleteAll?: any;
  onNextPage?: any;
  onPreviousPage?: any;
  countOffset?: number;
}

export interface TableColumnProps {
  title: string | string[] | React.ReactNode;
  width?: string;
  row?: string;
  children?: any;
  cell?: (row: any) => React.ReactNode;
}

const Table = (props: TableProps) => {
  const {
    columns,
    data,
    selectable,
    selectedItems,
    setSelectedItems,
    showCount,
    groupedRow,
    groupedRowData,
    onClickBulkEdit,
    onClickDeleteAll,
    onPreviousPage,
    onNextPage,
    countOffset,
  } = props;

  const [isOverflow, setOverflow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>();
  const elementRef = useRef<HTMLDivElement>();
  // const [selectedItems, setSelectedItems] = useState([]);

  const onChevronLeftClick = () => {
    const el = scrollRef.current?.children[0];
    el?.scrollTo({
      left: el.scrollLeft - 50,
      behavior: "auto",
    });
  };
  const onChevronRightClick = () => {
    const el = scrollRef.current?.children[0];
    el?.scrollTo({
      left: el.scrollLeft + 50,
      behavior: "auto",
    });
  };
  useEffect(() => {
    const el = scrollRef.current?.children[0];

    if (el) {
      if (el.clientWidth >= el.scrollWidth) {
        setOverflow(false);
      } else {
        setOverflow(true);
        const onWheel = (e) => {
          if (e.deltaY == 0) return;
          e.preventDefault();
          el?.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: "auto",
          });
        };
        el?.addEventListener("wheel", onWheel);
        return () => el?.removeEventListener("wheel", onWheel);
      }
    }
  }, []);

  const getColSpan = () => {
    let totalCol = columns?.length;

    if (selectable) {
      totalCol++;
    }

    if (showCount) {
      totalCol++;
    }

    return totalCol;
  };

  return (
    <>
      <div ref={elementRef} className="relative">
        {/* <div> */}
        {/* <RenderIf isTrue={isOverflow}>
          <div
            className="z-50 fixed mt-16 top-[35%] left-10 bg-gray-100 opacity-25 hover:opacity-100 cursor-pointer rounded-full"
            onClick={onChevronLeftClick}
          >
            <ChevronLeftIcon className=" " height={50} />
          </div>
        </RenderIf>
        <RenderIf isTrue={isOverflow}>
          <div
            className="z-50 fixed mt-16 top-[35%] right-10 bg-gray-100 opacity-25 hover:opacity-100 cursor-pointer rounded-full"
            onClick={onChevronRightClick}
          >
            <ChevronRightIcon className="  " height={50} />
          </div>
        </RenderIf> */}
        <div className="flex flex-col mt-2 font-['Inter var']" ref={scrollRef}>
          <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead>
                <tr>
                  {/* <RenderIf isTrue={selectable}>
                    <th
                      className={classNames(
                        "px-6 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900"
                      )}
                    >
                      <CheckBox
                        onChange={(checked) => {
                          let newArray = [];
                          if (checked) {
                            if (!groupedRow) {
                              newArray = data?.map((row) => row?.id);
                            }
                            if (groupedRow) {
                              const idsArray = groupedRowData?.map((data) => {
                                let ids = data?.grouped_row_data?.map(
                                  (row) => row?.id
                                );
                                return ids;
                              });

                              newArray = idsArray?.flat();
                            }
                          }
                          setSelectedItems(newArray);
                        }}
                      />
                    </th>
                  </RenderIf> */}
                  <RenderIf isTrue={showCount}>
                    {selectedItems?.length > 0 ? (
                      <th
                        className={classNames(
                          "inline-flex gap-x-2 h-fit py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900"
                        )}
                      >
                        <Button
                          label={`Bulk Edit`}
                          //   darkStyle
                          className="w-fit px-2 whitespace-nowrap"
                          onClick={onClickBulkEdit}
                        />
                        <Button
                          label={`Delete All`}
                          //   darkStyle
                          className="w-fit px-2 whitespace-nowrap"
                          onClick={onClickDeleteAll}
                        />
                      </th>
                    ) : (
                      <th
                        className={classNames(
                          "px-6 py-3 bg-cyan-100 text-left text-sm font-semibold text-gray-900"
                        )}
                      >
                        No.
                      </th>
                    )}
                  </RenderIf>
                  {columns?.map((x, i) => {
                    return (
                      <>
                        <th
                          key={i}
                          className={classNames(
                            "px-6 py-3 whitespace-nowrap bg-cyan-100 text-left text-sm font-semibold text-gray-900",
                            `${
                              i > 0 && i < columns?.length - 1 ? "hidden" : ""
                            } lg:table-cell`
                          )}
                          style={{
                            width: `${x?.width}`,
                          }}
                          scope="col"
                        >
                          {x?.title instanceof Array ? (
                            (x?.title).map((y) => {
                              return <div key={y}>{y}</div>;
                            })
                          ) : (
                            <div>{x.title}</div>
                          )}
                        </th>
                      </>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <RenderIf
                  isTrue={
                    (!groupedRow &&
                      (data === null ||
                        data === undefined ||
                        data?.length == 0)) ||
                    (groupedRow &&
                      (groupedRowData === null ||
                        groupedRowData === undefined ||
                        groupedRowData?.length == 0))
                  }
                >
                  <tr className="text-center w-96">
                    <td
                      colSpan={getColSpan()}
                      scope="colgroup"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 min-w-full"
                    >
                      <div>Tiada Rekod Ditemui</div>
                    </td>
                  </tr>
                </RenderIf>
                {/* <RenderIf isTrue={groupedRowData?.length > 0 && groupedRow}>
                  {groupedRowData?.map((item, idx) => (
                    <React.Fragment key={item?.group_header}>
                      <tr className="border-t border-gray-200">
                        <th
                          colSpan={getColSpan()}
                          scope="colgroup"
                          className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                        >
                          {item?.group_header}
                        </th>
                      </tr>
                      {item?.grouped_row_data?.map((data, dataIdx) => (
                        <React.Fragment key={data?.id}>
                          <tr
                            key={data?.id}
                            className={`${
                              selectedItems?.includes(data?.id)
                                ? "bg-gray-200"
                                : "bg-white"
                            }`}
                          >
                            <RenderIf isTrue={selectable}>
                              <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-500">
                                <CheckBox
                                  onChange={(checked) => {
                                    setSelectedItems((prevState) => {
                                      let newArray = checked
                                        ? [...prevState, data?.id]
                                        : prevState?.filter(
                                            (id) => id !== data?.id
                                          );
                                      return newArray;
                                    });
                                  }}
                                  defaultCheck={selectedItems?.includes(
                                    data?.id
                                  )}
                                />
                              </td>
                            </RenderIf>
                            <RenderIf isTrue={showCount}>
                              <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-500">
                                {dataIdx + 1}
                              </td>
                            </RenderIf>

                            {columns?.map((x, i) => {
                              const collapsedData =
                                i === 0 ? (
                                  <dl className="font-normal lg:hidden">
                                    {columns?.map((col, i) => {
                                      if (
                                        i > 0 &&
                                        i < columns?.length - 1 &&
                                        i < columns?.length - 1
                                      ) {
                                        return (
                                          <>
                                            <RenderIf
                                              isTrue={col?.children != null}
                                            >
                                              <dt
                                                key={i}
                                                className="p-2 text-sm text-gray-900"
                                              >
                                                <span className="text-sm font-semibold text-gray-900">
                                                  {col?.title} :{" "}
                                                </span>{" "}
                                                {col?.children}
                                              </dt>
                                            </RenderIf>
                                            {col?.cell && (
                                              <dt
                                                key={i}
                                                className="p-2 text-sm text-gray-900"
                                              >
                                                <span className="text-sm font-semibold text-gray-900">
                                                  {col?.title} :{" "}
                                                </span>{" "}
                                                {col?.cell(data)}
                                              </dt>
                                            )}
                                            <RenderIf
                                              isTrue={
                                                col?.children == null &&
                                                col?.cell == null
                                              }
                                            >
                                              <dt
                                                key={i}
                                                className="p-2 text-sm text-gray-900"
                                              >
                                                <div>
                                                  <span className="text-sm font-semibold text-gray-900">
                                                    {col?.title} :{" "}
                                                  </span>{" "}
                                                  {data[col?.row]}
                                                </div>
                                              </dt>
                                            </RenderIf>
                                          </>
                                        );
                                      }
                                    })}
                                  </dl>
                                ) : null;
                              return (
                                <>
                                  <RenderIf isTrue={x?.children != null}>
                                    <td
                                      key={i}
                                      className={`px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-500 ${
                                        i > 0 && i < columns?.length - 1
                                          ? "hidden"
                                          : ""
                                      } lg:table-cell`}
                                    >
                                      {x?.children}
                                      {i === 0 && collapsedData}
                                    </td>
                                  </RenderIf>
                                  {x?.cell && (
                                    <td
                                      key={i}
                                      className={`px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-500 ${
                                        i > 0 && i < columns?.length - 1
                                          ? "hidden"
                                          : ""
                                      } lg:table-cell`}
                                    >
                                      {x?.cell(data)}
                                      {i === 0 && collapsedData}
                                    </td>
                                  )}
                                  <RenderIf
                                    isTrue={
                                      x?.children == null && x?.cell == null
                                    }
                                  >
                                    <td
                                      key={i}
                                      className={`px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-500 ${
                                        i > 0 && i < columns?.length - 1
                                          ? "hidden"
                                          : ""
                                      } lg:table-cell`}
                                    >
                                      <div>{data[x?.row]}</div>
                                      {i === 0 && collapsedData}
                                    </td>
                                  </RenderIf>
                                </>
                              );
                            })}
                          </tr>
                          <RenderIf isTrue={data?.row_footer}>
                            <tr
                              className={`!border-t-0 ${
                                selectedItems?.includes(data?.id)
                                  ? "bg-gray-200"
                                  : "bg-white"
                              }`}
                            >
                              <th
                                colSpan={getColSpan()}
                                scope="colgroup"
                                className="px-6 pb-4 font-semibold text-gray-500"
                              >
                                {data?.row_footer}
                              </th>
                            </tr>
                          </RenderIf>
                        </React.Fragment>
                      ))}
                      <RenderIf isTrue={item?.group_footer}>
                        <tr>
                          <th
                            colSpan={getColSpan()}
                            scope="colgroup"
                            className="p-4 font-semibold text-gray-500"
                          >
                            {item?.group_footer}
                          </th>
                        </tr>
                      </RenderIf>
                    </React.Fragment>
                  ))}
                </RenderIf> */}
                <RenderIf isTrue={data?.length > 0 && !groupedRow}>
                  {data?.map((item, idx) => (
                    <tr key={item.id} className="bg-cyan-50">
                      {/* <RenderIf isTrue={selectable}>
                        <td className="px-6 py-4 whitespace-nowrap font-normal text-sm text-gray-500">
                          <CheckBox
                            onChange={(checked) => {
                              setSelectedItems((prevState) => {
                                let newArray = checked
                                  ? [...prevState, item?.id]
                                  : prevState?.filter((id) => id !== item?.id);
                                return newArray;
                              });
                            }}
                            defaultCheck={
                              selectedItems?.filter((id) => id === item?.id)
                                ?.length > 0
                            }
                          />
                        </td>
                      </RenderIf> */}
                      <RenderIf isTrue={showCount}>
                        <td className="px-6 py-4 whitespace-nowrap font-normal text-sm text-gray-500">
                          {idx + (countOffset ? countOffset : 0) + 1}
                        </td>
                      </RenderIf>
                      {columns?.map((x, i) => {
                        const collapsedData =
                          i === 0 ? (
                            <dl className="font-normal lg:hidden">
                              {columns?.map((col, i) => {
                                if (
                                  i > 0 &&
                                  i < columns?.length - 1 &&
                                  i < columns?.length - 1
                                ) {
                                  return (
                                    <>
                                      <RenderIf isTrue={col?.children != null}>
                                        <dt
                                          key={i}
                                          className="p-2 text-sm text-gray-900"
                                        >
                                          <span className="text-sm font-semibold text-gray-900">
                                            {col?.title} :{" "}
                                          </span>{" "}
                                          {col?.children}
                                        </dt>
                                      </RenderIf>
                                      {col?.cell && (
                                        <dt
                                          key={i}
                                          className="p-2 text-sm text-gray-900"
                                        >
                                          <span className="text-sm font-semibold text-gray-900">
                                            {col?.title} :{" "}
                                          </span>{" "}
                                          {col?.cell(item)}
                                        </dt>
                                      )}
                                      <RenderIf
                                        isTrue={
                                          col?.children == null &&
                                          col?.cell == null
                                        }
                                      >
                                        <dt
                                          key={i}
                                          className="p-2 text-sm text-gray-900"
                                        >
                                          <div>
                                            <span className="text-sm font-semibold text-gray-900">
                                              {col?.title} :{" "}
                                            </span>{" "}
                                            {item[col?.row]}
                                          </div>
                                        </dt>
                                      </RenderIf>
                                    </>
                                  );
                                }
                              })}
                            </dl>
                          ) : null;
                        return (
                          <>
                            <RenderIf isTrue={x?.children != null}>
                              <td
                                key={i}
                                className={`px-6 py-4  text-sm text-gray-500 ${
                                  i > 0 && i < columns?.length - 1
                                    ? "hidden"
                                    : ""
                                } lg:table-cell`}
                              >
                                {x?.children}
                                {i === 0 && collapsedData}
                              </td>
                            </RenderIf>
                            {x?.cell && (
                              <td
                                key={i}
                                className={`px-6 py-4  font-normal text-sm text-gray-500 ${
                                  i > 0 && i < columns?.length - 1
                                    ? "hidden"
                                    : ""
                                } lg:table-cell`}
                              >
                                {x?.cell(item)}
                                {i === 0 && collapsedData}
                              </td>
                            )}
                            <RenderIf
                              isTrue={x?.children == null && x?.cell == null}
                            >
                              <td
                                key={i}
                                className={`px-6 py-4  font-normal text-sm text-gray-500 ${
                                  i > 0 && i < columns?.length - 1
                                    ? "hidden"
                                    : ""
                                } lg:table-cell`}
                              >
                                <div>{item[x?.row]}</div>
                                {i === 0 && collapsedData}
                              </td>
                            </RenderIf>
                          </>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={getColSpan()} scope="colgroup">
                      <RenderIf
                        isTrue={
                          data !== null &&
                          data !== undefined &&
                          data?.length != 0
                        }
                      >
                        <nav
                          className="bg-cyan-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                          aria-label="Pagination"
                        >
                          <div className="flex-1 flex justify-between sm:justify-start">
                            <button
                              onClick={onPreviousPage}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Previous
                            </button>
                            <button
                              onClick={onNextPage}
                              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Next
                            </button>
                          </div>
                        </nav>
                      </RenderIf>
                    </td>
                  </tr>
                </RenderIf>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
