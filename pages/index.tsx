import { useState } from 'react'
// import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Paper, Grid, Container } from '@material-ui/core'

import Counters from '../components/Counters'
import CountrySelector from '../components/CountrySelector'
import Country from '../components/Country'

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
}))

export async function getServerSideProps(context) {
  let country
  if (context && context.country) {
    country = context.query.country
    country = Array.isArray(country) ? country[0] : country
  } else country = ''
  return {
    props: {
      country,
    }, // will be passed to the page component as props
  }
}

// const useCountryQuery = () => {
//   const router = useRouter()
//   let country
//   if (router?.query?.country) {
//     country = router?.query?.country
//     country = Array.isArray(country) ? country[0] : country
//   } else {
//     country = ''
//   }
//   return country
// }

const Home: React.FC<{ country: string }> = ({ country }) => {
  const classes = useStyles()
  // const country = useCountryQuery()
  const { data } = useQuery('worldwide', () =>
    Axios.get('https://covid19.mathdro.id/api')
  )
  const [selectedCountry, setCountry] = useState(country)
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <Paper variant="outlined" className={classes.paper}>
            <Typography variant="h2" component="h1" gutterBottom>
              COVID 19
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" component="h2" gutterBottom>
              Worldwide Status
            </Typography>
            <Counters stats={data?.data} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CountrySelector
              selectedCountry={selectedCountry}
              setCountry={setCountry}
              url={data?.data?.countries}
            />
            <Country
              country={selectedCountry}
              urlCountry={data?.data?.countries}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

// Home.getInitialProps = async ({ query }) => {
//   let country
//   if (query?.country) {
//     country = query.country
//     country = Array.isArray(country) ? country[0] : country
//   } else country = ''
//   return {
//     country,
//   }
// }

export default Home
