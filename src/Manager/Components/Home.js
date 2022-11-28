import React from "react";

export const Home = () => {
  return (
    <div class="container py-4">
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Welcome back, {localStorage.getItem("full_name")}!</h1>
          <p class="col-md-8 fs-4">This is a protected page for employee use only. Here you can place orders, manage database items, and see trends and reports.</p>
        </div>
      </div>
    </div>
  );
};
