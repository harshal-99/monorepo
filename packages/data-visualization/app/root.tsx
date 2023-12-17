import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
// eslint-disable-next-line import/no-unresolved
import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { DevTools } from "jotai-devtools";

import { mongodb } from "./utils/db.server";

export const links: LinksFunction = () => [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => [
    { title: "Data Visualization" },
    { name: "description", content: "Visualize data" },
  ];

export const loader: LoaderFunction = async () => {
  const db = await mongodb;
  console.log("MongoDB connected to ", db.connection.host); // eslint-disable-line
  return { date: new Date() };
};

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <DevTools />
        <MantineProvider>
          <>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </>
        </MantineProvider>
      </body>
    </html>
  );
}
