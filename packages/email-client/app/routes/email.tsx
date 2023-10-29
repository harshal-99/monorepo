import {
  Await,
  Outlet,
  useAsyncValue,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { Box } from "@mantine/core";
import {
  EmailCardList,
  EmailFilter,
  EmailListIdAtom,
  emailListSchema,
  TEmailList,
} from "../shared/email";
import { defer, LoaderFunction } from "@remix-run/node";
import axios from "axios";
import { Suspense, useEffect } from "react";
import { useSetAtom } from "jotai";
import { EmailCountAtom, EmailListAtom } from "../shared/email";

export const loader: LoaderFunction = ({ params }) => {
  const page = params.page ?? 1;

  return defer({
    list: axios
      .get(`https://flipkart-email-mock.vercel.app/?page=${page}`)
      .then((res) => emailListSchema.parse(res.data)),
  });
};

export default function EmailLayout() {
  const { id } = useParams();
  const { list } = useLoaderData<typeof loader>();
  return (
    <Box p={24} w="100%" h="100%">
      <EmailFilter />
      <Box display="flex">
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={list}>
            <EmailListWrapper />
          </Await>
        </Suspense>
        {id && <Outlet />}
      </Box>
    </Box>
  );
}

function EmailListWrapper() {
  const data = useAsyncValue() as TEmailList;
  const setEmailCount = useSetAtom(EmailCountAtom);
  const setEmails = useSetAtom(EmailListAtom);
  const setEmailIds = useSetAtom(EmailListIdAtom);

  useEffect(() => {
    setEmailCount((prev) => prev ?? data.total);
    setEmails((prev) => {
      data.list.forEach((email) => {
        if (prev.has(email.id)) return;
        prev.set(email.id, email);
      });
      return new Map(prev);
    });
    setEmailIds((prev) => {
      const ids = new Set(prev);
      data.list.forEach((email) => {
        if (ids.has(email.id)) return;
        ids.add(email.id);
      });
      return Array.from(ids);
    });
  }, [data]);

  return <EmailCardList />;
}
