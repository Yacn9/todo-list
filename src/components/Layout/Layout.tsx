import { Heading, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="blue.600"
        color="white"
        sx={{
          position: "-webkit-sticky",
          top: "0",
        }}
      >
        <Flex align="center" ml={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            Welcome!
          </Heading>
        </Flex>
      </Flex>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
