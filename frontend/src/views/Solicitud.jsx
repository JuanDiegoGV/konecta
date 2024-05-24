// hooks
import { useMutation, useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

// api
import { GetSolicitud, DeleteSolicitud } from '../api/solicitud'

// store
import { user as storeUser } from './../store/User'

// components
// libraries
import { Grid, Button, Typography } from '@mui/material'


const Solicitud = () => {

  // hooks
  const { id } = useParams()

  // hooks
  const [user] = useAtom(storeUser)
  const navigate = useNavigate()

  // query
  const { data: solicitud, isLoading, isError } = useQuery(['solicitud', id], () => GetSolicitud(id))
  const { mutate, isLoading: isLoadingMutate } = useMutation(() => DeleteSolicitud(id), {
    onSettled: ()=>{
      navigate('/solicitudes')
    }
  })

  if (isLoading) {
    return (
      <Grid container spacing={0}>
        loading
      </Grid>
    )
  }

  if (isError) {
    return (
      <Grid container spacing={0}>
        error
      </Grid>
    )
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {
          solicitud?.data ?
            <Grid container spacing={0} py={5}>
              <Grid item xs={12}><Typography variant="h5"><Typography variant="inherit" component='span' fontWeight='bold'>ID:</Typography> {solicitud.data.ID}</Typography></Grid>
              <Grid item xs={12}><Typography variant="h5" textTransform='uppercase'><Typography variant="inherit" component='span' fontWeight='bold'>CODIGO:</Typography> {solicitud.data.CODIGO}</Typography></Grid>
              <Grid item xs={12}><Typography variant="h5" textTransform='uppercase'><Typography variant="inherit" component='span' fontWeight='bold'>RESUMEN:</Typography> {solicitud.data.RESUMEN}</Typography></Grid>
              <Grid item xs={12}><Typography variant="h5" textTransform='uppercase'><Typography variant="inherit" component='span' fontWeight='bold'>DESCRIPCION:</Typography> {solicitud.data.DESCRIPCION}</Typography></Grid>
            </Grid>
            : <Typography variant="h5">Not Solicitud</Typography>
        }
      </Grid>
      <Grid item xs={12}>
        <Link to={`/empleados/${solicitud?.data.ID_EMPLEADO}`}><Button variant="contained" color="primary" fullWidth>
          VIEW Empleado
        </Button></Link>
      </Grid>
      {user.admin && <Grid item xs={12} mt={5}>
        <Button variant="contained" color="error" fullWidth disabled={!user.admin || isLoadingMutate} onClick={() => mutate()}>
          DELETE
        </Button>
      </Grid>}
    </Grid>
  )
}

export default Solicitud