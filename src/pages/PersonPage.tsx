import {
  Link,
  List,
  ListItem,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PeopleContext } from "../context/PeopleProvider";

const PersonPage = () => {
  const { personUrl, loadPerson, personData, resetPerson } =
    useContext(PeopleContext);
  const navigate = useNavigate();

  const goToHomePage = () => navigate("/");

  const HandleClickBackToHomePage = () => {
    goToHomePage();
    resetPerson();
  };

  useEffect(() => {
    if (personUrl) {
      loadPerson();
    } else {
      goToHomePage();
    }
  }, [navigate]);

  if (!personUrl || !personData) return null;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={HandleClickBackToHomePage}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Person page
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Typography variant="h3" align="center">
        {personData.name}
      </Typography>
      <Typography align="center">
        <Link href="#" underline="hover" variant="body2">
          {personData.homeworld}
        </Link>
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Birth year: {personData.birth_year}
      </Typography>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h4" align="center">
          Appearance
        </Typography>
        <Typography variant="h6" align="center">
          gender: {personData.gender}
        </Typography>
        <Typography variant="h6" align="center">
          eye color: {personData.eye_color}
        </Typography>
        <Typography variant="h6" align="center">
          hair color: {personData.hair_color}
        </Typography>
        <Typography variant="h6" align="center">
          height: {personData.height}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          mass: {personData.mass}
        </Typography>

        {Boolean(personData.films.length) && (
          <>
            <Typography variant="h5">Films</Typography>
            <List>
              {personData.films.map((film: string) => (
                <ListItem key={film}>
                  <Link href="#" underline="hover" variant="body2">
                    {film}
                  </Link>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {Boolean(personData.species.length) && (
          <>
            <Typography variant="h5">Spesies</Typography>
            <List>
              {personData.species.map((item: string) => (
                <ListItem key={item}>
                  <Link href="#" underline="hover" variant="body2">
                    {item}
                  </Link>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {Boolean(personData.starships.length) && (
          <>
            <Typography variant="h5">Starships</Typography>
            <List>
              {personData.starships.map((item: string) => (
                <ListItem key={item}>
                  <Link href="#" underline="hover" variant="body2">
                    {item}
                  </Link>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {Boolean(personData.vehicles.length) && (
          <>
            <Typography variant="h5">Vehicles</Typography>
            <List>
              {personData.vehicles.map((item: string) => (
                <ListItem key={item}>
                  <Link href="#" underline="hover" variant="body2">
                    {item}
                  </Link>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Grid>
    </>
  );
};

export default PersonPage;
