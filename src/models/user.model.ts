import prisma from "../prisma";

export const findUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export const createUser = async (username: string, hashedPassword: string) => {
  return await prisma.user.create({
    data: { username, password: hashedPassword },
  });
};
