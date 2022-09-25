import {
  SearchFlightsType,
  SearchFlightDetailsType,
  SearchParamsType,
} from "app/types";

const baseRoute = "https://api.spacexdata.com/v4/launches/query";

export async function getSearchData(
  searchParams: SearchParamsType
): Promise<SearchFlightsType> {
  const response = await fetch(`${baseRoute}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: { name: { $regex: `^${searchParams.searchText}`, $options: "i" } },
      options: {
        page: searchParams.searchPage,
        sort: { date_local: "desc" },
        select: ["id", "name", "date_local"],
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "ships",
            select: {
              name: 1,
            },
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Response was not ok");
  }

  return response.json();
}

export async function getDataById(
  id: string
): Promise<SearchFlightDetailsType> {
  const response = await fetch(`${baseRoute}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: { _id: id },
      options: {
        select: [
          "id",
          "name",
          "date_local",
          "details",
          "links.webcast",
          "links.patch.small",
          "links.flickr.original",
        ],
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "ships",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              name: 1,
            },
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Response was not ok");
  }

  return response.json();
}
