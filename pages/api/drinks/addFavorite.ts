import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Please sign in to add drink to favorites" });
  }

  const email = session.user?.email as string;

  // Get User
  const prismaUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // Check if drink was liked by user
  const favorite = await prisma.favorite.findFirst({
    where: {
      drinkId: req.body.drinkId,
      userId: prismaUser?.id,
    },
  });

  if (req.method === "POST") {
    try {
      if (!favorite) {
        const data: Prisma.FavoriteCreateInput = {
          drink: req.body.drinkId,
          user: prismaUser?.id
            ? { connect: { id: prismaUser.id } }
            : {
                create: {
                  /* user creation data */
                },
              },
        };
        const result = await prisma.favorite.create({ data });
        res.status(201).json(result);
      } else {
        const result = await prisma.favorite.delete({
          where: {
            id: favorite.id,
          },
        });
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(403).json({ err: "Error has occured while making a post" });
    }
  }
}
