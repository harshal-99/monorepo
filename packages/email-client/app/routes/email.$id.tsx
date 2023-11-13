import {
  EmailDetail,
  EmailDetailsAtom,
  emailDetailSchema,
  TEmailDetail,
} from "../shared/email";
import { defer, LoaderFunction } from "@remix-run/node";
import axios from "axios";
import {
  Await,
  useAsyncValue,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { Suspense, useEffect } from "react";
import { useSetAtom } from "jotai";

export const loader: LoaderFunction = ({ params }) => {
  const { id } = params;
  if (!id) throw new Response("Not found", { status: 404 });
  const headers = new Headers();
  headers.set("Cache-Control", "private, max-age=300");
  return defer(
    {
      details: axios
        .get(`https://flipkart-email-mock.now.sh/?id=${id}`)
        .then((res) => emailDetailSchema.parse(res.data)),
    },
    { headers }
  );
};
export default function EmailBody() {
  const { details } = useLoaderData<typeof loader>();
  const { location } = useNavigation();

  if (location && location.pathname.includes("/email/"))
    return <div>Loading...</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={details}>
        {/* @ts-expect-error: Type `Element` is not assignable to type `ReactNode | ((value: any) => ReactNode)`*/}
        <EmailDetailWrapper />
      </Await>
    </Suspense>
  );
}

function EmailDetailWrapper() {
  const data = useAsyncValue() as TEmailDetail;
  const setEmailDetails = useSetAtom(EmailDetailsAtom);

  useEffect(() => {
    setEmailDetails((prev) => {
      if (!prev.has(data.id)) {
        return new Map(prev).set(data.id, data);
      }
      return prev;
    });
  }, [data]);

  return <EmailDetail {...data} />;
}
