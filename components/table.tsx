import React, { useEffect, useRef, useState } from "react";
import { RenderIf } from "./optional-render";
import { classNames } from "../utils/css-helper";
import Button from "./button";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

export interface TableColumnProps {
  title: string | string[] | React.ReactNode;
  width?: string;
  row?: string;
  children?: any;
  cell?: (row: any) => React.ReactNode;
}
interface TableProps {
  columns: TableColumnProps[];
  data?: any;
  showCount?: boolean;
  onNextPage?: any;
  onPreviousPage?: any;
  perPage?: number;
  currentPage?: number;
}

const Table = (props: TableProps) => {
  const {
    columns,
    data,
    showCount,
    onPreviousPage,
    onNextPage,
    perPage = 10,
    currentPage = 1,
  } = props;

  const [isOverflow, setOverflow] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const scrollRef = useRef<HTMLDivElement>();
  const elementRef = useRef<HTMLDivElement>();

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
    if (data.length > 0) {
      const remainder = data.length % perPage;
      setTotalPage(
        remainder > 0
          ? Math.floor(data.length / perPage) + 1
          : data.length / perPage
      );
    }
  }, [data]);
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

    if (showCount) {
      totalCol++;
    }

    return totalCol;
  };

  return (
    <>
      <div ref={elementRef} className="relative">
        <h1 className="text-white">
          Showing {currentPage * perPage - perPage + 1} -{" "}
          {currentPage < totalPage ? currentPage * perPage : data.length} of{" "}
          {data.length} records
        </h1>
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
                  <RenderIf isTrue={showCount}>
                    <th
                      className={classNames(
                        "px-6 py-3 bg-cyan-100 text-left text-sm font-semibold text-gray-900"
                      )}
                    >
                      No.
                    </th>
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
                            <div key={i}>{x.title}</div>
                          )}
                        </th>
                      </>
                    );
                  })}
                </tr>
              </thead>
              <tbody
                aria-label="table-body"
                className="bg-white divide-y divide-gray-200"
              >
                <RenderIf
                  isTrue={
                    data === null || data === undefined || data?.length == 0
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
                <RenderIf isTrue={data?.length > 0}>
                  {data
                    ?.slice(
                      currentPage * perPage - perPage,
                      currentPage * perPage
                    )
                    ?.map((item, idx) => (
                      <tr key={item.id} className="bg-cyan-50">
                        <RenderIf isTrue={showCount}>
                          <td className="px-6 py-4 whitespace-nowrap font-normal text-sm text-gray-500">
                            {idx +
                              (currentPage > 1
                                ? currentPage * perPage - perPage
                                : 0) +
                              1}
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
                  {/* <tr>
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
                  </tr> */}
                </RenderIf>
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={getColSpan()} scope="colgroup">
                    <RenderIf
                      isTrue={
                        data !== null && data !== undefined && data?.length != 0
                      }
                    >
                      <nav
                        className="bg-cyan-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                        aria-label="Pagination"
                      >
                        <div className="flex-1 flex justify-between sm:justify-start items-center">
                          <RenderIf isTrue={currentPage > 1}>
                            <button
                              onClick={onPreviousPage}
                              className="relative inline-flex gap-x-4 items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <ArrowLeftCircleIcon width={20} height={20} />
                              Previous
                            </button>
                          </RenderIf>
                          <RenderIf isTrue={currentPage < totalPage}>
                            <button
                              onClick={onNextPage}
                              className="ml-3 relative inline-flex gap-x-4 items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Next{" "}
                              <ArrowRightCircleIcon width={20} height={20} />
                            </button>
                          </RenderIf>
                        </div>
                        <p className="text-gray-700 justify-end">
                          Page {currentPage} of {totalPage}
                        </p>
                      </nav>
                    </RenderIf>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
