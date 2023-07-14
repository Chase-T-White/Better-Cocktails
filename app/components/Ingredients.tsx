import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Fetch Ingredients list
const fetchIngredients = async () => {
  const res = await axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
  );
  console.log(res);

  return res.data;
};

type IngredientsProps = {
  setSearchingFor: (value: string) => void;
};

const Ingredients: React.FC<IngredientsProps> = ({ setSearchingFor }) => {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchIngredients,
    queryKey: ["ingredients"],
  });
  if (error) return error;
  if (isLoading) return "Loading....";

  return (
    <select className="w-full bg-zinc-700 rounded-[50vw] border-[1px] border-solid border-white/50 form-input ps-4 py-[2.5px]">
      {data.drinks
        .sort((a: any, b: any) => {
          return a.strIngredient1.localeCompare(b.strIngredient1);
        })
        .map((ingredient: any, i: any) => {
          return (
            <option
              value={ingredient.strIngredient1}
              key={i}
              onClick={(e) => setSearchingFor(e.target.value)}
            >
              {ingredient.strIngredient1}
            </option>
          );
        })}
    </select>
  );
};

export default Ingredients;
