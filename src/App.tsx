import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";

import { PeopleProvider } from "./context/PeopleProvider";
import MainPage from "./pages/MainPage";
import PersonPage from "./pages/PersonPage";

export const App = () => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#36454B",
      },
      secondary: {
        main: "#00a883",
      },
    },
  });
  return (
    <ThemeProvider theme={customTheme}>
      <PeopleProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/person" element={<PersonPage />} />
        </Routes>
      </PeopleProvider>
    </ThemeProvider>
  );
};
