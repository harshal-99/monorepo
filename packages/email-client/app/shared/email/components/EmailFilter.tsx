import { Box, Button, Text } from "@mantine/core";
import { useSetAtom } from "jotai";
import { EmailFilterAtom, TEmailFilterAtom } from "../atoms";
import { useTransition } from "react";

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
      <Text>Filter by:</Text>
      <Button.Group>
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
          Favriots
        </Button>
      </Button.Group>
    </Box>
  );
};
