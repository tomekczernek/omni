export type SearchParamsType = {
  searchText: string
  searchPage: number
}

export type SearchFlightsType = PaginationType & {
  docs: FlightType[];
};

export type SearchFlightDetailsType = PaginationType & {
  docs: FlightDetailsType[];
};

export type PaginationType = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

export type FlightType = {
  id: string;
  name: string;
  rocket: Rocket;
  date_local: string;
  ships: Ship[];
};

export type FlightDetailsType = FlightType & {
  rocket: Rocket;
  ships: Ship[];
  payloads: Payload[];
  links: Links;
  details: string;
};

type Rocket = {
  id: string;
  name: string;
};

type Ship = {
  id: string;
  name: string;
};

type Payload = {
  id: string;
  name: string;
};

type Links = {
  webcast: string;
  patch: LinkPatch;
  flickr: LinkFicker;
};

type LinkPatch = {
  small: string;
};

type LinkFicker = {
  original: string[];
};
