import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Please sign in to add drink to favorites" });
  }

  // Get User
  const prismaUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // Check if drink was liked by user
  const favorite = await prisma.favorite.findFirst({
    where: {
      drinkId: req.body.drinkId,
      userId: prismaUser.id,
    },
  });

  if (req.method === "POST") {
    try {
      if (!favorite) {
        const result = await prisma.favorite.create({
          data: {
            drinkId: req.body.drinkId,
            userId: prismaUser.id,
          },
        });
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
