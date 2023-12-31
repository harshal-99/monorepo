import { Flex, Text } from "@mantine/core";
import { FC } from "react";

import { accent } from "../colors";

type UserIconProps = {
  firstName: string;
};
export const UserIcon: FC<UserIconProps> = ({ firstName }) => {
  const firstLetter = firstName[0];

  return (
    <Flex
      w={40}
      h={40}
      justify="center"
      align="center"
      p={4}
      style={{ borderRadius: "999px", backgroundColor: accent }}
    >
      <Text style={{ color: "white" }} size="md">
        {firstLetter}
      </Text>
    </Flex>
  );
};
