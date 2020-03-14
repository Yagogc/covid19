import { useQuery } from 'react-query'
import Axios from 'axios'

import Counters from '../Counters'

interface CountryProps {
  country: string
  urlCountry: string
}
const Country: React.FC<CountryProps> = ({ country, urlCountry }) => {
  const { status: statusCountry, data: dataCountry } = useQuery(
    urlCountry && country !== 'default' && ['country', { country }],
    () => Axios.get(`${urlCountry}/${country}`)
  )
  console.log(country)
  if (country === 'default') return null
  return (
    <>
      <div className="container">
        <h2>{`${country} Status`}</h2>
        <Counters stats={dataCountry?.data} />
      </div>
    </>
  )
}

export default Country
