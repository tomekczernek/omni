import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getDataById } from "api";

import { DetailItem } from "./DetailsItem";

import "./style.css";

export function Details() {
  const { state } = useLocation();

  const { isLoading, error, data } = useQuery(["details"], () =>
    getDataById(state.id)
  );

  const details = data?.docs[0];

  return (
    <div className="items-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>An error has occurred</p>}
      {details && (
        <>
          <h2>{details.name}</h2>
          {details.links.patch.small && (
            <img
              className="details-logo"
              src={details.links.patch.small}
              alt="logo"
            />
          )}
          <p>{details.details}</p>
          <div className="details-container">
            <DetailItem name="Rocket" items={details.rocket} />
            <DetailItem name="Ships" items={details.ships} />
            <DetailItem name="Payload" items={details.payloads} />
            <DetailItem
              name="Images"
              images={details.links.flickr.original}
              type="image"
            />
            <DetailItem
              name="Video"
              video={details.links.webcast}
              type="video"
            />
          </div>

          <Link className="button pagination-button margin-top" to={`/`}>
            Back
          </Link>
        </>
      )}
    </div>
  );
}
