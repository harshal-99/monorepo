import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
// eslint-disable-next-line import/no-unresolved
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { DevTools } from "jotai-devtools";

export const links: LinksFunction = () => [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  return [
    { title: "Email Client" },
    { name: "description", content: "Welcome to Remix!" },
  ];
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
          {/* @ts-expect-error: Type Element is not assignable to type ReactNode*/}
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
