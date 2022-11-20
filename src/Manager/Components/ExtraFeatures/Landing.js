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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, elementum sed sagittis id, ultricies et magna. Morbi vel consequat est. Fusce tristique enim ut ipsum dictum, vel feugiat elit placerat.</p>
              <Link to="/ExtraFeatures/SalesReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
            </div>
          </div>

          <div class="col-md-6">
            <div class="h-80 p-5 bg-light border rounded-3">
              <h2>Restock Report</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, elementum sed sagittis id, ultricies et magna. Morbi vel consequat est. Fusce tristique enim ut ipsum dictum, vel feugiat elit placerat.</p>
              <Link to="/ExtraFeatures/RestockReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
            </div>
          </div>
        </div>

        <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <div class="h-80 p-5 bg-light border rounded-3">
              <h2>Excess Report</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, elementum sed sagittis id, ultricies et magna. Morbi vel consequat est. Fusce tristique enim ut ipsum dictum, vel feugiat elit placerat.</p>
              <Link to="/ExtraFeatures/ExcessReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
            </div>
          </div>

          <div class="col-md-6">
            <div class="h-80 p-5 bg-light border rounded-3">
              <h2>Pairings Report</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ex, elementum sed sagittis id, ultricies et magna. Morbi vel consequat est. Fusce tristique enim ut ipsum dictum, vel feugiat elit placerat.</p>
              <Link to="/ExtraFeatures/PairingsReport"><button class="btn btn-outline-secondary" type="button">View Report</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
