import { useState } from 'react'
import { useQuery } from 'react-query'
import Axios from 'axios'
// import styled from 'styled-components'
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

const Home: React.FC = () => {
  const classes = useStyles()
  const { data } = useQuery('worldwide', () =>
    Axios.get('https://covid19.mathdro.id/api')
  )
  const [country, setCountry] = useState('')
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
              country={country}
              setCountry={setCountry}
              url={data?.data?.countries}
            />
            <Country country={country} urlCountry={data?.data?.countries} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
