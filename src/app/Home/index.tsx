import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { delayText } from "app/utils";
import { getSearchData } from "api/index";
import { SearchParamsType } from "app/types";

import { FlightList } from "./FlightList";

import "./style.css";

export function Home() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    searchText: queryClient.getQueryData(["searchedText"]),
    searchPage: queryClient.getQueryData(["searchedPage"]),
  });

  const serachText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (searchValue !== "") {
      setSearchParams({
        ...searchParams,
        searchText: searchValue,
        searchPage: 1,
      });
      queryClient.setQueryData(["searchedText"], searchValue);
    }
  };

  const { data, isFetching, error } = useQuery(
    ["mission", searchParams],
    () => getSearchData(searchParams),
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnMount: false,
    }
  );

  return (
    <>
      <div className="search-section">
        <input
          className="input"
          placeholder="Type mission..."
          onChange={delayText((e) => serachText(e))}
          defaultValue={searchParams.searchText}
          type="text"
        />
      </div>

      <div className="items-container">
        {isFetching && <p>Loading...</p>}
        {error && <p>An error has occurred</p>}
        {data?.docs.length ? (
          <FlightList launches={data} setSearchParams={setSearchParams} searchParams={searchParams}/>
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  );
}
