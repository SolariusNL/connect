import { compareSync, hashSync } from "bcrypt";

const hashData = async (data: string) => {
  return hashSync(data, 10);
};

const compareData = async (data: string, hash: string) => {
  return compareSync(data, hash);
};

export { compareData, hashData };
