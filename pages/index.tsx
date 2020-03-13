import Head from 'next/head'
import { useQuery } from 'react-query'
import Axios from 'axios'

const Home: React.FC = () => {
  const { status, data, error } = useQuery('worldwide', () =>
    Axios.get('https://covid19.mathdro.id/api')
  )
  console.log('Home -> status', status)
  console.log('Home -> data', data)
  console.log('Home -> error', error)
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Worldwide Status</h1>
      <p>{`Confirmed: ${data?.data?.confirmed.value}`}</p>
      <p>{`Recoverd: ${data?.data?.recovered.value}`}</p>
      <p>{`Deaths: ${data?.data?.deaths.value}`}</p>
    </div>
  )
}

export default Home
