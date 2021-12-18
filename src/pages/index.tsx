import type { NextPage } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.grey900};
  width: 100%;
  height: 100vh;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    background: ${({ theme }) => theme.colors.pink900};
  }
`

const Home: NextPage = () => {
  return <Container>hello</Container>
}

export default Home