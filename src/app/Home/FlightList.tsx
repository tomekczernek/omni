import React from "react";

import { SearchFlightsType, FlightType, SearchParamsType } from "app/types";

import { FlightItem } from "./FlightItem";
import { FlightListPagination } from "./FlightListPagination";

type Props = {
  launches: SearchFlightsType;
  setSearchParams: any;
  searchParams: SearchParamsType;
};

export function FlightList(props: Props) {
  const { launches, setSearchParams, searchParams } = props;

  return (
    <div className="items-container">
      {launches.docs.length ? (
        launches.docs.map((item: FlightType) => (
          <FlightItem key={item.id} item={item} />
        ))
      ) : (
        <p>No data</p>
      )}

      {launches?.totalDocs > 10 && (
        <FlightListPagination
          pagination={launches}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}
