import React, { createContext, ReactNode, useState } from "react";

interface People {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}

type HistoryPeople = {
  [key: string]: {
    name: string;
    url: string;
  };
};

interface PeopleContextContent {
  people: People[];
  personData: People | null;
  personUrl: string | null;
  nextPage: string | null;
  historyPeople: HistoryPeople;
  loadPeople: (name: string) => void;
  loadPerson: () => void;
  loadPeopleScroll: () => void;
  selectPerson: (url: string) => void;
  resetPerson: () => void;
  savePeople: (name: string, url: string) => void;
}

export const PeopleContext = createContext<PeopleContextContent>({
  people: [],
  personData: null,
  personUrl: null,
  nextPage: null,
  historyPeople: {},
  loadPeople: () => {},
  loadPerson: () => {},
  loadPeopleScroll: () => {},
  selectPerson: () => {},
  resetPerson: () => {},
  savePeople: () => {},
});

export const PeopleProvider = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<People[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [personUrl, setPersonUrl] = useState<string | null>(null);
  const [personData, setPersonData] = useState<People | null>(null);
  const [historyPeople, setHistoryPeople] = useState<HistoryPeople>({});

  const loadPeopleScroll = async () => {
    if (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      setPeople([...people, ...data.results]);
      setNextPage(data.next);
    }
  };

  const loadPeople = async (name: string) => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${name}`
    );
    const data = await response.json();
    setPeople(data.results);
    setNextPage(String(data.next));
  };

  const loadPerson = async () => {
    if (personUrl) {
      const response = await fetch(personUrl);
      const data = await response.json();
      setPersonData(data);
    }
  };

  const selectPerson = (url: string) => {
    setPersonUrl(url);
  };

  const resetPerson = () => {
    setPersonUrl(null);
    setPersonData(null);
  };

  const savePeople = (name: string, url: string) => {
    if (!Boolean(historyPeople[name])) {
      setHistoryPeople(prev => {
        return {
          ...prev,
          [name]: {
            name,
            url,
          },
        };
      });
    }
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        loadPeople,
        loadPeopleScroll,
        nextPage,
        personUrl,
        loadPerson,
        personData,
        selectPerson,
        resetPerson,
        historyPeople,
        savePeople,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
