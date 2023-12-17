import { Flex, MantineProvider, rem, Text } from "@mantine/core";
import { DevTools } from "jotai-devtools";

import { SuggestedSkills } from "./components/SuggestedSkills";
import "@mantine/core/styles.css";

export function App() {
  return (
    <MantineProvider>
      <Flex
        bg="#EFF6FF"
        w="100%"
        h="100%"
        justify="center"
        align="center"
        direction="column"
        gap={rem("32px")}
      >
        <Text style={{ color: "#0D2167", fontSize: rem("40px") }} fw={600}>
          Select your top 5 tech skills
        </Text>
        <Flex
          p={64}
          gap={64}
          style={{
            borderRadius: rem("16px"),
            background: "#FFF",
            boxShadow: "0px 44px 64px 0px rgba(37, 99, 235, 0.10)",
          }}
        >
          <div>hi</div>
          <SuggestedSkills />
        </Flex>
      </Flex>
      <DevTools />
    </MantineProvider>
  );
}
