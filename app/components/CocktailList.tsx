import Cocktail from "./Cocktail";

type CocktailListProps = {
  isLoading: boolean;
  cocktails: { drinks: any[] } | null | undefined;
};

const CocktailList = ({ isLoading, cocktails }: CocktailListProps) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!cocktails || cocktails.drinks === null) {
    return <h2>Oops, no cocktails match your search</h2>;
  }

  console.log(cocktails);

  return (
    <section className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-x-8 gap-y-16 w-full max-w-[1400px] mx-auto my-32 px-8">
      {cocktails.drinks.map((cocktail, i) => {
        console.log(cocktail);

        return <Cocktail key={i} {...cocktail} />;
      })}
    </section>
  );
};

export default CocktailList;
