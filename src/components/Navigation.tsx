import { Link as ChakraLink, Text, Flex, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Size, useWindowSize } from "../utils/hooks/useWindowSize";
import { isServer } from "../utils/isServer";
import { AddIcon } from '@chakra-ui/icons'

export const Navigation: React.FC<{}> = ({}) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  const [{data, fetching}] = useMeQuery({ pause: isServer(), });
  const size: Size = useWindowSize();

  let mobile;
  if (size.width! < 800) {
    mobile = true;
  }

  let body;
  if (fetching) {} else if (!data?.me) {
    body = (
      <Flex
        justifyContent={`space-around`}
        alignItems={`center`}
        gap={`15px`}
        width={mobile ? '75%' : '25%'}
        color={'navText'}
      >
        <NextLink href={"/register"}>
          <ChakraLink color={'navText'}>Register</ChakraLink>
        </NextLink>
        <NextLink href={"/login"}>
          <ChakraLink color={'navText'}>Log In</ChakraLink>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex
        justifyContent={`space-around`}
        alignItems={`center`}
        gap={`15px`}
        width={mobile ? '75%' : '25%'}
        color={'navText'}
      >
        <NextLink href={"/create-post"}>
          <AddIcon 
            w={6} 
            h={6} 
            bgColor={"whiteAlpha.400"} 
            borderRadius={8} 
            p={1} 
            cursor={`pointer`} 
            _hover={
              { 
                backgroundColor: "whiteAlpha.600" 
              }
            }
            />
        </NextLink>
        <Box>
          <Text>Welcome, {data.me?.username}</Text>
        </Box>
        <Button 
          onClick={() => { logout(); }} 
          isLoading={logoutFetching}
          color={'navBtn'}
        >
          Logout
        </Button>
      </Flex>
    )
  }
  return (
    <nav>
      <Flex 
        bgColor={`gray.600`} 
        h={`20`} 
        justifyContent={mobile ? `flex-start` : `space-around`} 
        alignItems={`center`} 
        width="100vw"
      >
        <NextLink href={"/"}>
          <ChakraLink color={'navText'}>Home</ChakraLink>
        </NextLink>
        {body}
      </Flex>
    </nav>
  );
};

export default Navigation;
