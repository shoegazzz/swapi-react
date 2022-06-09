import React, { forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { PeopleContext } from "../context/PeopleProvider";

interface IHistoryHeroCardProps {
  name: string;
  url: string;
}

const HistoryHeroCard = forwardRef<any, IHistoryHeroCardProps>(
  ({ name, url }) => {
    const { selectPerson, savePeople } = useContext(PeopleContext);
    const navigate = useNavigate();

    const handleClick = () => {
      selectPerson(url);
      savePeople(name, url);
      navigate("/person");
    };

    return (
      <Card sx={{ minWidth: 275 }}>
        <CardActions sx={{ padding: 5 }}>
          <Button size="large" onClick={handleClick}>
            {name}
          </Button>
        </CardActions>
      </Card>
    );
  }
);

export default HistoryHeroCard;
