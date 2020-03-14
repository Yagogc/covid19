import { useState } from 'react'
import { useQuery } from 'react-query'
import Axios from 'axios'
import styled from 'styled-components'
import Counters from '../components/Counters'
import CountrySelector from '../components/CountrySelector'
import Country from '../components/Country'

const Container = styled.main`
  max-width: 768px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding: 10px;
`
const Spacer = styled.hr`
  margin: 10px 0;
`

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  padding: 20px;
  backdrop-filter: blur(4px);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
`

const Home: React.FC = () => {
  const { data } = useQuery('worldwide', () =>
    Axios.get('https://covid19.mathdro.id/api')
  )
  const [country, setCountry] = useState('default')
  console.log('Home:React.FC -> country', country)
  return (
    <Container>
      <Wrapper>
        <h1>Worldwide Status</h1>
        <Counters stats={data?.data} />
        <Spacer />
        <CountrySelector
          country={country}
          setCountry={setCountry}
          url={data?.data?.countries}
        />
        <Country country={country} urlCountry={data?.data?.countries} />
      </Wrapper>
    </Container>
  )
}

export default Home
