import React, { FC, useContext } from "react";
import { PeopleContext } from "../context/PeopleProvider";
import Box from "@mui/material/Box";
import HistoryHeroCard from "./HistoryHeroCard";
import Carousel from "react-material-ui-carousel";

const HistoryCards: FC = () => {
  const { historyPeople } = useContext(PeopleContext);

  return (
    <Carousel>
      {Object.keys(historyPeople).map((key: string) => {
        return (
          <HistoryHeroCard
            key={historyPeople[key].url}
            name={historyPeople[key].name}
            url={historyPeople[key].url}
          />
        );
      })}
    </Carousel>
  );
};

export default HistoryCards;
