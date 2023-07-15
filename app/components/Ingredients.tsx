import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Fetch Ingredients list
const fetchIngredients = async () => {
  const res = await axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
  );

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
  if (error) return null;
  if (isLoading) return "Loading....";

  if (!data || !data.drinks) return null;

  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchingFor(e.target.value);
  };

  return (
    <select
      className="w-full bg-zinc-700 rounded-[50vw] border-[1px] border-solid border-white/50 form-input ps-4 py-[2.5px]"
      onChange={handleIngredientChange}
    >
      {data.drinks
        .sort((a: any, b: any) => {
          return a.strIngredient1.localeCompare(b.strIngredient1);
        })
        .map((ingredient: any, i: any) => {
          return (
            <option value={ingredient.strIngredient1} key={i}>
              {ingredient.strIngredient1}
            </option>
          );
        })}
    </select>
  );
};

export default Ingredients;
