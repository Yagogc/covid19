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
  url,
}) => {
  const router = useRouter()
  const classes = useStyles()
  const { status: statusCountries, data: dataCountries } = useQuery(
    url && 'countries',
    () => Axios.get('https://covid19.mathdro.id/api/countries')
  )
  const handleChange = value => {
    console.log('HANDLE CHANGE')
    setCountry(value)
    router.push(`/`, `/?country=${value}`, { shallow: true })
  }
  const cc = useRef(selectedCountry)
  useEffect(() => {
    if (dataCountries?.data.countries) {
      console.log('START USEEFFECT')
      console.log('cc.current', cc.current)
      const code = Object.values(dataCountries?.data.countries).find(
        country => country === selectedCountry
      )
      cc.current = !code ? '' : `${code}`
      console.log('cc.current', cc.current)
      console.log('END USEEFFECT')
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
            Object.entries(dataCountries?.data.countries).map(
              ([countryName, countryCode]: [string, string]) => (
                <MenuItem
                  key={countryName}
                  value={countryCode}
                  selected={countryCode === cc.current}
                >
                  {`${flag(countryCode)} ${countryName}`}
                </MenuItem>
              )
            )}
        </Select>
      </FormControl>
    </>
  )
}

export default CountrySelector
