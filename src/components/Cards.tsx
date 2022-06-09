import React, { createRef, FC, useContext, useEffect, useRef } from "react";
import { PeopleContext } from "../context/PeopleProvider";
import Box from "@mui/material/Box";
import HeroCard from "./HeroCard";

const Cards: FC = () => {
  const { people, nextPage, loadPeopleScroll } = useContext(PeopleContext);

  const lastItem = createRef<any>();
  const observerLoader = useRef<IntersectionObserver | null>(null);

  const actionInSight = (entries: any) => {
    if (entries[0].isIntersecting && nextPage) {
      loadPeopleScroll();
    }
  };

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }

    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current);
    }
  }, [lastItem]);

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        {Boolean(people.length) &&
          people.map((person, index) => {
            if (index + 1 === people.length) {
              return (
                <HeroCard
                  key={person.url}
                  name={person.name}
                  birthYear={person.birth_year}
                  homeworld={person.homeworld}
                  ref={lastItem}
                  url={person.url}
                />
              );
            }
            return (
              <HeroCard
                key={person.url}
                name={person.name}
                birthYear={person.birth_year}
                homeworld={person.homeworld}
                url={person.url}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default Cards;
