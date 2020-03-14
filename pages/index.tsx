import { useQuery } from 'react-query'
import Axios from 'axios'
import {
  Listbox,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox'
import VisuallyHidden from '@reach/visually-hidden'
import flag from 'country-code-emoji'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

const Home: React.FC = () => {
  const { data } = useQuery('worldwide', () =>
    Axios.get('https://covid19.mathdro.id/api')
  )
  const { status: statusCountries, data: dataCountries } = useQuery(
    data && 'countries',
    () => Axios.get(data.data.countries)
  )
  // console.log('Home -> status', status)
  console.log('Home -> data', statusCountries)
  console.log('Home -> error', dataCountries)
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <h1>Worldwide Status</h1>
        <p>{`Confirmed: ${data?.data?.confirmed.value}`}</p>
        <p>{`Recoverd: ${data?.data?.recovered.value}`}</p>
        <p>{`Deaths: ${data?.data?.deaths.value}`}</p>

        <div>
          <VisuallyHidden id="country-selector">
            Choose a country
          </VisuallyHidden>
          <Listbox disabled={!dataCountries} aria-labelledby="country-selector">
            <ListboxOption value="default">Choose a country</ListboxOption>
            {dataCountries &&
              Object.entries(dataCountries?.data.countries).map(
                ([key, value]: [string, string]) => (
                  <ListboxOption key={value} value={value}>
                    {`${key} ${flag(value)}`}
                  </ListboxOption>
                )
              )}
          </Listbox>
        </div>
      </div>
    </>
  )
}

export default Home
