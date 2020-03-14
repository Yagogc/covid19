import { useQuery } from 'react-query'
import Axios from 'axios'
import {
  Listbox,
  // ListboxInput,
  // ListboxButton,
  // ListboxPopover,
  // ListboxList,
  ListboxOption,
} from '@reach/listbox'
import VisuallyHidden from '@reach/visually-hidden'
import flag from 'country-code-emoji'

interface CountrySelectorProps {
  country: string
  setCountry: Function
  url: string
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  country,
  setCountry,
  url,
}) => {
  const { status: statusCountries, data: dataCountries } = useQuery(
    url && 'countries',
    () => Axios.get(url)
  )
  return (
    <div>
      <VisuallyHidden id="country-selector">Choose a country</VisuallyHidden>
      <Listbox
        disabled={!dataCountries}
        aria-labelledby="country-selector"
        value={country}
        onChange={val => setCountry(val)}
      >
        <ListboxOption value="default">Choose a country</ListboxOption>
        {dataCountries &&
          Object.entries(dataCountries?.data.countries).map(
            ([key, valueCountries]: [string, string]) => (
              <ListboxOption key={key} value={valueCountries}>
                {`${key} ${flag(valueCountries)}`}
              </ListboxOption>
            )
          )}
      </Listbox>
    </div>
  )
}

export default CountrySelector
