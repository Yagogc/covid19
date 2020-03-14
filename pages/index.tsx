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

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
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
