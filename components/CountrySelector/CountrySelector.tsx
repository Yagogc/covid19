import { useQuery } from 'react-query'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core'

import flag from 'country-code-emoji'

interface CountrySelectorProps {
  country: string
  setCountry: Function
  url: string
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const CountrySelector: React.FC<CountrySelectorProps> = ({
  country,
  setCountry,
  url,
}) => {
  const classes = useStyles()
  const { status: statusCountries, data: dataCountries } = useQuery(
    url && 'countries',
    () => Axios.get(url)
  )
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Country</InputLabel>
        <Select
          value={country}
          onChange={event => setCountry(event.target.value)}
        >
          {dataCountries &&
            Object.entries(dataCountries?.data.countries).map(
              ([key, valueCountries]: [string, string]) => (
                <MenuItem key={key} value={valueCountries}>
                  {`${flag(valueCountries)} ${key}`}
                </MenuItem>
              )
            )}
        </Select>
      </FormControl>
    </>
  )
}

export default CountrySelector
