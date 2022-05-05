import { Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'

const Index = () => {
  const [{data}] = usePostsQuery();

  return(
    <Container height="100vh">
      <Hero />
      <Main>
        <Text color="text">Testing out full-stack applications built with Express+Apollo+PostgreSQL backends and React+TS+Chakra frontends.</Text>
        {!data ? null : data.posts.map(post => <Text key={post.id}>{post.title}</Text>)}
      </Main>
      <DarkModeSwitch />
      <Footer>
        <Text>&copy;Colton Sweeney 2022</Text>
      </Footer>
    </Container>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

