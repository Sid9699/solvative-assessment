import { useMemo } from "react";
import "./Table.css";

type Props = {
  columns: Array<{
    label: string;
    key: string;
  }>;
  rows: Array<{
    [key: string]: unknown;
  }>;
  rowCount: number;
  pageSizeOptions?: Array<number>;
  page: number;
  onPageChange: (value: number) => void;
  size: number;
  onSizeChange: (value: number) => void;
};

export const Table = (props: Props) => {
  const {
    columns,
    rows,
    rowCount,
    pageSizeOptions = [3, 5, 10],
    onPageChange,
    onSizeChange,
    page,
    size,
  } = props;

  const pages = useMemo(() => {
    return Math.ceil(rowCount / size);
  }, [rowCount, size]);

  const renderPaginationPages = () => {
    let pagesToShow = [];
    if (page === 1) {
      pagesToShow = [page, page + 1, page + 2];
    } else if (page === pages) {
      pagesToShow = [page - 2, page - 1, page];
    } else {
      pagesToShow = [page - 1, page, page + 1];
    }

    pagesToShow = pagesToShow.filter((page) => page <= pages);

    return pagesToShow.map((pageNumber) => (
      <span
        key={pageNumber}
        onClick={() => onPageChange(pageNumber)}
        className={`${pageNumber === page ? "disabled" : ""}`}
      >
        {pageNumber}
      </span>
    ));
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    onPageChange(page - 1);
  };

  const handleNextPage = () => {
    if (page === pages) return;
    onPageChange(page + 1);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((column, index) => (
              <th key={`${column.key}${index}`}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowCount > 0 &&
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {columns.map((column, colIndex) => (
                  <td key={`${column.key}${rowIndex}${colIndex}`}>
                    {(row[column.key] as string) || ""}
                  </td>
                ))}
              </tr>
            ))}
          {rowCount === 0 && (
            <tr>
              <td colSpan={columns.length + 1}>
                <p>No result found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rowCount > 0 && (
        <div className="table-pagination">
          <label>
            Showing {(page - 1) * size + 1} to {page * size} records of{" "}
            {rowCount}
          </label>
          <div>
            <select
              value={size}
              onChange={(e) => onSizeChange(+e.target.value)}
            >
              {pageSizeOptions.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="pagination">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-caret-left-square ${
                  page === 1 ? "disabled" : ""
                }`}
                viewBox="0 0 16 16"
                onClick={handlePrevPage}
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M10.205 12.456A.5.5 0 0 0 10.5 12V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4a.5.5 0 0 0 .537.082" />
              </svg>
              {renderPaginationPages()}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-caret-right-square ${
                  page === pages ? "disabled" : ""
                }`}
                viewBox="0 0 16 16"
                onClick={handleNextPage}
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
