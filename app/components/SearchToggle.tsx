"use client";

import { motion } from "framer-motion";

const SearchToggle = ({
  searchCocktail,
  setSearchCocktail,
  setSearchingFor,
}: Boolean | any) => {
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };

  return (
    <div
      className={`relative flex ${
        searchCocktail ? "justify-start" : "justify-end"
      } w-[15rem] rounded-[50vw] border-[1px] border-solid border-white/50 `}
    >
      <motion.div
        layout
        transition={spring}
        className="w-[50%] bg-cyan-300 rounded-[50vw]"
      ></motion.div>
      <button
        className={`absolute left-[25%] top-[50%] -translate-y-[50%] -translate-x-[50%] px-2 ${
          searchCocktail ? "" : "text-white"
        }`}
        onClick={() => {
          setSearchCocktail(true);
          setSearchingFor("a");
        }}
      >
        Cocktail
      </button>
      <button
        className={`absolute right-[25%] top-[50%] -translate-y-[50%] translate-x-[50%] px-2 ${
          searchCocktail ? "text-white" : ""
        }`}
        onClick={() => {
          setSearchCocktail(false);
          setSearchingFor("7-Up");
        }}
      >
        Ingredient
      </button>
    </div>
  );
};

export default SearchToggle;
