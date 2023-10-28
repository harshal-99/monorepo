import { Link, Outlet, useParams } from "@remix-run/react";
import { Box } from "@mantine/core";
import { EmailCardList, EmailDetail, EmailFilter } from "../shared/email";

export default function EmailLayout() {
  const { id } = useParams();

  return (
    <Box p={24} w="100%" h="100%">
      <EmailFilter />
      <EmailCardList />
      {id && <EmailDetail />}
    </Box>
  );
}
