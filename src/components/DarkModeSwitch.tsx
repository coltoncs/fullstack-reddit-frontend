import { useColorMode, IconButton, ComponentWithAs } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Size, useWindowSize } from "../utils/hooks/useWindowSize";
import React from "react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const size: Size = useWindowSize();
  const isDark = colorMode === "dark";

  if (size.width !== undefined && size.width < 600) {
    return (
      <IconButton
        position="fixed"
        bottom={5}
        zIndex={1}
        right={5}
        icon={isDark ? <SunIcon /> : <MoonIcon />}
        aria-label="Toggle Theme"
        colorScheme="pink"
        onClick={toggleColorMode}
      />
    );
  } else {
    return (
      <IconButton
        position="fixed"
        top={5}
        right={5}
        icon={isDark ? <SunIcon /> : <MoonIcon />}
        aria-label="Toggle Theme"
        colorScheme="pink"
        onClick={toggleColorMode}
      />
    );
  }
};
