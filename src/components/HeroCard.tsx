import React, { forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { PeopleContext } from "../context/PeopleProvider";

interface IHeroCardProps {
  name: string;
  birthYear: string;
  homeworld: string;
  url: string;
}

const HeroCard = forwardRef<any, IHeroCardProps>(
  ({ name, birthYear, homeworld, url }, ref) => {
    const { selectPerson, savePeople } = useContext(PeopleContext);
    const navigate = useNavigate();

    const handleClick = () => {
      selectPerson(url);
      savePeople(name, url);
      navigate("/person");
    };

    return (
      <Card sx={{ minWidth: 275 }} ref={ref}>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {birthYear}
          </Typography>
          <Link href="#" underline="hover" variant="body2">
            {homeworld}
          </Link>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            More Info
          </Button>
        </CardActions>
      </Card>
    );
  }
);

export default HeroCard;
