import { Link as ChakraLink, Text, Flex, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  const [{data, fetching}] = useMeQuery({ pause: isServer(), });

  let body;
  if (fetching) {
    
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href={"/register"}>
          <ChakraLink>Register</ChakraLink>
        </NextLink>
        <NextLink href={"/login"}>
          <ChakraLink>Log In</ChakraLink>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex
        justifyContent={`center`}
        alignItems={`center`}
        gap={`15px`}
        width={`15%`}
      >
        <Box>
          {data.me?.username}
        </Box>
        <Button 
          onClick={() => { logout(); }} 
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    )
  }
  return (
    <nav>
      <Flex justifyContent={`space-around`} alignItems={`center`} width="100vw">
        <NextLink href={"/"}>
          <ChakraLink>Home</ChakraLink>
        </NextLink>
        {body}
      </Flex>
    </nav>
  );
};

export default Navigation;
