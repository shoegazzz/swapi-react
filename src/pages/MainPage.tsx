import { Box } from "@mui/material";
import React from "react";
import Cards from "../components/Cards";
import HistoryCards from "../components/HistoryCards";
import SearchBar from "../components/SearchBar";

const MainPage = () => {
  return (
    <Box>
      <SearchBar />
      <HistoryCards />
      <Cards />
    </Box>
  );
};

export default MainPage;
