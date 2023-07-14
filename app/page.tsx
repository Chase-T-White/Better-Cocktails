"use client";

import { useState, ReactNode } from "react";
import SearchBox from "./components/SearchBox";
import CocktailList from "./components/CocktailList";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [searchCocktail, setSearchCocktail] = useState(true);
  const [searchingFor, setSearchingFor] = useState("a");

  type Props = {
    searchCocktail: Boolean;
    searchingFor: string;
  };

  // Fetching drinks
  const fetchDrinks = async ({ searchCocktail, searchingFor }: Props) => {
    console.log(searchCocktail, searchingFor);

    const url = "https://www.thecocktaildb.com/api/json/v1/1/";
    const type = searchCocktail ? "search.php?s=" : "filter.php?i=";

    const res = await axios.get(`${url}${type}${searchingFor}`);
    console.log(res.data);

    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: () => fetchDrinks({ searchCocktail, searchingFor }),
    queryKey: ["drinks", searchCocktail, searchingFor],
  });
  if (error) return error;

  return (
    <main>
      <SearchBox
        searchCocktail={searchCocktail}
        setSearchCocktail={setSearchCocktail}
        setSearchingFor={setSearchingFor}
      />
      <CocktailList isLoading={isLoading} cocktails={data} />
    </main>
  );
}
