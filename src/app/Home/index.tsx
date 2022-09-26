import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { delayText } from "app/utils";
import { getSearchData } from "api/index";
import { SearchFlightsType, SearchParamsType } from "app/types";

import { FlightList } from "./FlightList";

import "./style.css";

export function Home() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    searchText: queryClient.getQueryData(["searchedText"]),
    searchPage: queryClient.getQueryData(["searchedPage"]),
  });

  const [searchData, setSearchData] = useState<SearchFlightsType>(null);

  const serachText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (searchValue !== "") {
      setSearchParams({
        ...searchParams,
        searchText: searchValue,
        searchPage: 1,
      });
    } else {
      setSearchData(null);
    }
    queryClient.setQueryData(["searchedText"], searchValue);
  };

  const { data, isFetching, error, refetch } = useQuery(
    ["mission", searchParams],
    () => getSearchData(searchParams),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (searchParams.searchText && searchParams.searchPage) refetch();
  }, [searchParams]);

  useEffect(() => {
    setSearchData(data);
  }, [data]);

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

      {isFetching && (
        <div className="items-container">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="items-container">
          <p>An error has occurred</p>
        </div>
      )}
      {searchData && (
        <FlightList
          launches={searchData}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      )}
    </>
  );
}
