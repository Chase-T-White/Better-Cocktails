import axios from "axios";

const fetchDrinks = async ({ searchCocktail, searchingFor }) => {
  const url = "www.thecocktaildb.com/api/json/v1/1/";
  const type = searchCocktail ? "search.php?s=" : "filter.php?i=";

  const res = await axios.get(`${url}${type}${searchingFor}`);
  console.log(res.data);

  return res.data;
};
