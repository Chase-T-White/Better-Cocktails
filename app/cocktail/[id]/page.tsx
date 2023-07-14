"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { LiaGlassMartiniAltSolid } from "react-icons/lia";

const page = ({
  params,
}: {
  params: {
    slug: URL;
  };
}) => {
  const address = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

  //   Fetch Drink Details
  const fetchDrinks = async (id: string) => {
    console.log(id);

    const res = await axios.get(`${address}${id}`);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["drink"],
    queryFn: () => fetchDrinks(params.id),
  });
  if (isLoading) {
    return "Loading....";
  }
  if (error) return error;

  const {
    strDrink: name,
    strAlcoholic: type,
    strDrinkThumb: image,
    strGlass: glass,
    strInstructions: instructions,
  } = data.drinks[0];

  // Filtering out null ingredients
  let ingredientList = [];
  let measurementList = [];
  let available = true;
  let i = 1;
  while (available) {
    let jsonIngredient = `strIngredient${i}`;
    let jsonMeasurement = `strMeasure${i}`;
    if (data.drinks[0][jsonIngredient] !== null) {
      const ingredient = data.drinks[0][jsonIngredient];
      const measurement = data.drinks[0][jsonMeasurement];
      ingredientList.push(ingredient);
      measurementList.push(measurement);
      i++;
    } else {
      available = false;
    }
  }

  //   console.log(data);

  return (
    <main className="px-4 md:px-8">
      <article className="grid grid-cols-1 md:grid-cols-[400px,1fr] grid-rows-[400px,1fr] md:grid-rows-1 items-center w-full max-w-[950px] mx-auto my-32 min-h-[550px] max rounded-md overflow-hidden cocktail-page-card">
        <div className="col-1 row-1 relative w-full h-full mx-auto">
          <Image
            src={image}
            alt={name}
            priority
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="col-1 md:col-2 row-2 md:row-1 p-8 w-full text-center md:text-left">
          <div className="underline-drink-page">
            <h2 className="cocktailPage-drinkName text-white">{name}</h2>
          </div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{glass}</h3>
              <h5 className="text-sm mb-8 text-white/50">{type}</h5>
            </div>
            <LiaGlassMartiniAltSolid
              className="text-4xl text-white/40 hover:text-white/30 cursor-pointer"
              title="Add to Favorites"
            />
          </div>
          <div className="flex justify-center md:justify-start gap-12 mb-8 text-[1.4rem]">
            <div className="flex flex-col gap-1 text-[16px] font-bold text-pink-400 text-left">
              {ingredientList.map((ingredient, i) => {
                return <h5 key={i}>{ingredient}</h5>;
              })}
            </div>
            <div className="flex flex-col gap-1 text-[16px] text-white text-left">
              {measurementList.map((measurement, i) => {
                if (measurement === null) {
                  return null;
                }
                return <h5 key={i}>{measurement}</h5>;
              })}
            </div>
          </div>
          <div className="mb-8">
            <h5 className="text-[1.2rem] text-pink-600">Instructions:</h5>
            <p className="text-base text-white">{instructions}</p>
          </div>
          <Link href="/" className="btn">
            Back
          </Link>
        </div>
      </article>
    </main>
  );
};

export default page;
