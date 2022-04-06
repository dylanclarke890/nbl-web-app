import React, { useEffect, useState } from "react";
import IPaginationTable from "./IPaginationTable";

import './pagination-table.css';

export default function PaginationTable({ tableHeaderRow, tableRows, resultsPerPage = 8 }: IPaginationTable) {
  const [tableRowPages, setTableRowPages] = useState<JSX.Element[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const groups: JSX.Element[][] = [];
    for (let i = 0; i < tableRows.length; i + resultsPerPage) {
      groups.push(tableRows.slice(i, i += resultsPerPage));
    }
    setTableRowPages(groups);
  }, [tableRows, resultsPerPage])

  const prevPage = () => {
    setCurrentPage(currentPage === 0 ? tableRowPages.length - 1 : currentPage - 1);
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1 === tableRowPages.length ? 0 : currentPage + 1);
  }

  const pageIndicator = (
    <p className="text-center">
      Showing {(currentPage * resultsPerPage) + 1} - {(currentPage * resultsPerPage) + resultsPerPage} appointments out of {tableRows.length}.
    </p>
  )


  return (
    <>
      <table className="table-wrapper">
        <thead>
          {tableHeaderRow}
        </thead>
        <tbody>
          {tableRowPages[currentPage]}
        </tbody>
      </table>
      <p className="mb-2">{pageIndicator}</p>
      <div className="flex justify-center">
        <button className="btn mr-1" onClick={prevPage}>Prev</button>
        <button className="btn ml-1" onClick={nextPage}>Next</button>
      </div>
    </>
  )
}