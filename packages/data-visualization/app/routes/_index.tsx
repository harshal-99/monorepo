import { LoaderFunction, redirect } from "@vercel/remix";

export const loader: LoaderFunction = () => {
  return redirect("/chart");
};
