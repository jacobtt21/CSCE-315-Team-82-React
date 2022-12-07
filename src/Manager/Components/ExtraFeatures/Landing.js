import React from "react";
import { Link } from "react-router-dom";

export const ExtraFeatures = () => {

  return (
    <>
      <div class="container py-4">
        <header class="pb-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">Extra Features</span>
          </a>
        </header>

        <div class="row align-items-md-stretch pb-4">
          <div class="col-md-6">
            <div class="h-80 p-5 bg-light border rounded-3">
              <h2>Sales Report</h2>
              <p>Given a time window, find the sales by item from the order history.</p>
              <Link to="/ExtraFeatures/SalesReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
            </div>
          </div>

          <div class="col-md-6">
            <div class="h-80 p-5 bg-light border rounded-3">
              <h2>Restock Report</h2>
              <p>Displays the list of items whose current inventory is less than the item's minimum amount to have around before needing to restock.</p>
              <Link to="/ExtraFeatures/RestockReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
            </div>
          </div>
        </div>

        <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <div class="h-80 p-5 bg-light border rounded-3">
              <h2>Excess Report</h2>
              <p>Given a timestamp, find items that only sold less than 10% of their inventory between two dates, assuming no restocks have happened during the window.</p>
              <Link to="/ExtraFeatures/ExcessReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
            </div>
          </div>

          <div class="col-md-6">
            <div class="h-80 p-5 bg-light border rounded-3">
              <h2>Pairings Report</h2>
              <p>Given a time window, get pairs of menu items that sell together often, popular or not, sorted by most frequent.</p>
              <Link to="/ExtraFeatures/PairingsReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
