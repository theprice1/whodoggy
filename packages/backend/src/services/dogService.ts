import { prisma } from "../prisma/prismaClient.js";
import type { Prisma } from "@prisma/client";

export const dogService = {
  async getDogById(id: number) {
    return prisma.dog.findUnique({ where: { id } });
  },

  async createDog(data: Prisma.DogCreateInput) {
    return prisma.dog.create({ data });
  },
};
