export type UserType = {
  _id: string;
  name: string | null;
  phone: string;
  role?: "user" | "admin"; // role অনুযায়ী distinction
  isVerified?: boolean;    // যদি তুমি verified flag handle করো
};

