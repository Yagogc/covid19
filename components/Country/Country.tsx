import { useQuery } from 'react-query'
import Axios from 'axios'

import Counters from '../Counters'

interface CountryProps {
  country: string
  urlCountry: string
}
const Country: React.FC<CountryProps> = ({ country }) => {
  const {
    status: statusCountry,
    data: dataCountry,
    error: errorCountry,
  } = useQuery(!!country && ['country', { country }], () =>
    Axios.get(`https://covid19.mathdro.id/api/countries/${country}`)
  )
  if (errorCountry) {
    return <p>An error has ocurred, try searching for another country</p>
  }
  if (!country) return null
  return (
    <>
      <Counters stats={dataCountry?.data} />
    </>
  )
}

export default Country
