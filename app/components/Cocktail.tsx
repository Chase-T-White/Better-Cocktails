"use client";

import Link from "next/link";
import Image from "next/image";
import { LiaGlassMartiniAltSolid } from "react-icons/lia";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

type Drink = {
  idDrink: string;
  strDrink: string;
  strGlass: string;
  strDrinkThumb: string;
  strAlcoholic: string;
};

const Cocktail = ({
  idDrink,
  strDrink,
  strGlass,
  strDrinkThumb,
  strAlcoholic,
}: Drink) => {
  let toastFavoriteID: string;

  // Add Favorite
  const { mutate } = useMutation(
    async (idDrink: string) =>
      axios.post("/api/drinks/addFavorite", { idDrink }),
    {
      onError: (error: any) => {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message, { id: idDrink });
        } else {
          toast.error("An error occurred", { id: idDrink });
        }
      },
      onSuccess: (data: any) => {
        toast.success("Drink added to Favorites");
      },
    }
  );

  return (
    <article className="cocktail-card text-white">
      <Image
        src={strDrinkThumb}
        width={250}
        height={250}
        alt={strDrink}
        priority
        className="w-full h-[300px] object-cover object-center"
      />
      <div className="flex flex-col p-[1.5rem]">
        <div className="flex justify-between">
          <h3 className="text-[42px] leading-10 font-bold text-base text-pink-400 mb-4">
            {strDrink}
          </h3>
          <button onClick={() => mutate(idDrink)}>
            <LiaGlassMartiniAltSolid
              className="text-4xl text-white/40 hover:text-white/30 cursor-pointer"
              title="Add to Favorites"
            />
          </button>
        </div>
        <p className="text-white tracking-[0.05rem] capitalize">{strGlass}</p>
        <small className="text-sm text-white/50 mb-8">{strAlcoholic}</small>
        <Link href={`/cocktail/${idDrink}`}>
          <button className="btn">Details</button>
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
