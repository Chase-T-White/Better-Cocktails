import React, { ReactNode } from "react";
import Ingredients from "./Ingredients";
import SearchToggle from "./SearchToggle";

type Search = {
  searchCocktail: Boolean;
  setSearchCocktail: ReactNode;
  setSearchingFor: ReactNode;
};

const SearchBox = ({
  searchCocktail,
  setSearchCocktail,
  setSearchingFor,
}: Search) => {
  return (
    <header className="bg-zinc-900 px-4 md:px-48 py-8 search-container">
      <div className="max-w-[600px] mx-auto px-4">
        <div className="flex justify-center gap-8 mb-4">
          <h4 className="text-2xl font-bold text-white">Search By</h4>
          <SearchToggle
            searchCocktail={searchCocktail}
            setSearchCocktail={setSearchCocktail}
            setSearchingFor={setSearchingFor}
          />
        </div>
        <form>
          <div>
            {searchCocktail ? (
              <input
                type="text"
                name="search"
                autoFocus
                placeholder="Search Cocktails"
                className="w-full bg-zinc-700 rounded-[50vw] border-[1px] border-solid border-white/50 form-input ps-4"
                onChange={(e) => {
                  if (e.target.value === null) {
                    return setSearchingFor("a");
                  }
                  return setSearchingFor(e.target.value);
                }}
              />
            ) : (
              <Ingredients setSearchingFor={setSearchingFor} />
            )}
          </div>
        </form>
      </div>
    </header>
  );
};

export default SearchBox;
