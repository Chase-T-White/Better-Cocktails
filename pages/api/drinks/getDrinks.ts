import axios from "axios";

const fetchDrinks = async ({ searchCocktail, searchingFor }: any) => {
  const url = "www.thecocktaildb.com/api/json/v1/1/";
  const type = searchCocktail ? "search.php?s=" : "filter.php?i=";

  const res = await axios.get(`${url}${type}${searchingFor}`);

  return res.data;
};
