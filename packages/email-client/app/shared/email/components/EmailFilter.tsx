import { Box, Button, Text } from "@mantine/core";
import { useSetAtom } from "jotai";
import { useTransition } from "react";

import { EmailFilterAtom, TEmailFilterAtom } from "../atoms";

export const EmailFilter = () => {
  const setFilter = useSetAtom(EmailFilterAtom);
  const [isPending, startTransition] = useTransition();
  const handleFilterChange = (filter: TEmailFilterAtom) => {
    startTransition(() => setFilter(filter));
  };

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Text mr={8}>Filter by:</Text>
      <Button.Group>
        {/* @ts-expect-error: Type Element is not assignable to ReactNode*/}
        <>
          <Button
            loading={isPending}
            loaderProps={{ type: "dots" }}
            onClick={() => handleFilterChange("all")}
          >
            All
          </Button>
          <Button
            loading={isPending}
            loaderProps={{ type: "dots" }}
            onClick={() => handleFilterChange("read")}
          >
            Read
          </Button>
          <Button
            loading={isPending}
            loaderProps={{ type: "dots" }}
            onClick={() => handleFilterChange("unread")}
          >
            Unread
          </Button>
          <Button
            loading={isPending}
            loaderProps={{ type: "dots" }}
            onClick={() => handleFilterChange("favorites")}
          >
            Favorites
          </Button>
        </>
      </Button.Group>
    </Box>
  );
};
