import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "app/Header";

import { Home } from "./Home";
import { Details } from "./Details";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <div className="wrapper">
      <div className="container">
        <div className="section">
          <Header />
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details" element={<Details />} />
              <Route path="*" element={<p>not found</p>} />
            </Routes>
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}
