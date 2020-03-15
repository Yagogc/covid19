import { useQuery } from 'react-query'
import Axios from 'axios'

import Counters from '../Counters'

interface CountryProps {
  country: string
  urlCountry: string
}
const Country: React.FC<CountryProps> = ({ country, urlCountry }) => {
  const { status: statusCountry, data: dataCountry } = useQuery(
    urlCountry && country !== '' && ['country', { country }],
    () => Axios.get(`${urlCountry}/${country}`)
  )
  if (!country) return null
  return (
    <>
      <Counters stats={dataCountry?.data} />
    </>
  )
}

export default Country
