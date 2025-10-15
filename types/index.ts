import { User } from "@prisma/client";

export type SafeUser = {
  id?: string | null | undefined,
  name?: string | null | undefined,
  email?: string | null | undefined,
  hashedPassword?: string | null | undefined,
  role?: string | null | undefined,
  accounts?: any[] | null | undefined,
  orders?: any[] | null | undefined,
  reviews?: any[] | null | undefined,
  createdAt?: string | null | undefined
  updatedAt?: string | null | undefined,
  __v?: number | null | undefined,
};
