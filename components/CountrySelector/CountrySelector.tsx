import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core'

import flag from 'country-code-emoji'
import { useEffect, useRef } from 'react'

interface CountrySelectorProps {
  selectedCountry: string
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
  selectedCountry,
  setCountry,
}) => {
  const router = useRouter()
  const classes = useStyles()
  const { data: dataCountries } = useQuery(
    'countries',
    () => Axios.get('https://covid19.mathdro.id/api/countries')
  )
  const handleChange = value => {
    setCountry(value)
    router.push(`/`, `/?country=${value}`, { shallow: true })
  }
  const cc = useRef(selectedCountry)
  useEffect(() => {
    if (dataCountries?.data.countries) {
      const code = dataCountries?.data.countries.find(
        country => country.iso2 === selectedCountry
        )
      cc.current = !code ? '' : `${code.iso2}`
    }
  }, [selectedCountry, dataCountries])
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Country</InputLabel>
        <Select
          value={dataCountries ? cc.current : ''}
          onChange={event => handleChange(event.target.value)}
          disabled={!dataCountries}
        >
          {dataCountries &&
            dataCountries?.data.countries.map(
              ({name, iso2}: {name: string, iso2:string}) => (
                <MenuItem
                  key={name}
                  value={iso2}
                  selected={iso2 === cc.current}
                >
                  {`${iso2 ? flag(iso2) : ""} ${name}`}
                </MenuItem>
              )
            )}
        </Select>
      </FormControl>
    </>
  )
}

export default CountrySelector
