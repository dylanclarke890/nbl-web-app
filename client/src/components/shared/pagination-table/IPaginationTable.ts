export default interface IPaginationTable {
  tableHeaderRow: JSX.Element;
  tableRows: JSX.Element[];
  resultsPerPage?: number;
}
