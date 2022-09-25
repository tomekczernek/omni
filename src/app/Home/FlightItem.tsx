import React from "react";
import { Link } from "react-router-dom";

import { FlightType } from "app/types";

type Props = {
  item: FlightType;
};

export function FlightItem({ item }: Props) {
  const { id, name, rocket, date_local } = item;

  return (
    <div className="item-container">
      <div className="item-line">
        <div className="item-width">
          <p className="item-titile">Mission</p>
          <p className="item-value">{name}</p>
        </div>
        <div className="item-width">
          <p className="item-titile">Rocket</p>
          <p className="item-value">{rocket.name}</p>
        </div>
        <div className="item-width">
          <p className="item-titile">Date</p>
          <p className="item-value">
            {new Date(date_local).toLocaleDateString()}
          </p>
        </div>
        <Link
          className="button pagination-button"
          to={`/details`}
          state={{ id }}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
