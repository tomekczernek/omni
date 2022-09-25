import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { SearchFlightsType, SearchParamsType } from "app/types";

type Props = {
  pagination: SearchFlightsType;
  setSearchParams: any;
  searchParams: SearchParamsType;
};

export function FlightListPagination(props: Props) {
  const { pagination, setSearchParams, searchParams } = props;
  const { hasNextPage, hasPrevPage, nextPage, prevPage, page, totalPages } =
    pagination;

  const queryClient = useQueryClient();
  queryClient.setQueryData(["currentPage"], page);

  const handleNextPage = () => {
    if (nextPage) {
      setSearchParams({ ...searchParams, searchPage: nextPage });
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setSearchParams({ ...searchParams, searchPage: prevPage });
    }
  };

  return (
    <div className="pagination">
      <button
        disabled={!hasPrevPage}
        className={`${
          !hasPrevPage ? "disabled-button" : ""
        } button pagination-button`}
        onClick={handlePrevPage}
      >
        Previous
      </button>

      <span className="page">{`${page} / ${totalPages}`}</span>

      <button
        disabled={!hasNextPage}
        className={`${
          !hasNextPage ? "disabled-button" : ""
        } button pagination-button`}
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
}
