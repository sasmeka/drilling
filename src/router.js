import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorContext from "./helper/context_error";
import SuccessContext from './helper/context_success';

import LandingPage from "./page/landing_page";

function Router() {
  const [success_message, setsuccess_message] = useState("");
  const value_success = { success_message, setsuccess_message };
  const [error_message, seterror_message] = useState("");
  const value_error = { error_message, seterror_message };

  return (
    <ErrorContext.Provider value={value_error}>
      <SuccessContext.Provider value={value_success}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </SuccessContext.Provider>
    </ErrorContext.Provider>
  );
}

export default Router;