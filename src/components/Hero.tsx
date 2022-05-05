import { Flex, Heading } from '@chakra-ui/react'
import Navigation from './Navigation'

export const Hero = ({ title }: { title: string }) => (
  <Flex
    flexDirection={`column`}
    justifyContent="center"
    alignItems="center"
    height="100vh"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Navigation />
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'Fullstack React & Express',
}
