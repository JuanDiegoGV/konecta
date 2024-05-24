// components
// libraries
import { Grid, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} textAlign='center'>
        <Typography variant="h2">Welcome to Konecta</Typography>
      </Grid>
      <Grid item xs={12} textAlign='center'>
        <Typography variant="h5">What do you want to see?</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Link to='/empleados'>
          <Button variant="contained" color="primary" fullWidth>
            View Empleados
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Link to='/solicitudes'>
          <Button variant="contained" color="secondary" fullWidth>
            View Solicitudes
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Home