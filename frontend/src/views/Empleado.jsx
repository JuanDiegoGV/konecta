// hooks
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'

// api
import { GetEmpleado } from '../api/empleado'
import { GetSolicitudes } from '../api/solicitud'

// components
// libraries
import { Grid, Typography, Divider, List, ListItem, ListItemButton } from '@mui/material'


const Empleado = () => {

  // hooks
  const { id } = useParams()

  // query
  const { data: empleado, isLoading: isLoadingEmpleado, isError } = useQuery(['empleado', id], () => GetEmpleado(id))
  const { data: solicitudes, isLoading: isLoadingSolicitudes } = useQuery(['solicitudes empleado', id], () => GetSolicitudes({ idEmpleado: id }))

  if (isLoadingEmpleado || isLoadingSolicitudes) {
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
          empleado?.data ?
            <Grid container spacing={0} py={5}>
              <Grid item xs={12}><Typography variant="h5"><Typography variant="inherit" component='span' fontWeight='bold'>ID:</Typography> {empleado.data.ID}</Typography></Grid>
              <Grid item xs={12}><Typography variant="h5" textTransform='uppercase'><Typography variant="inherit" component='span' fontWeight='bold'>NOMBRE:</Typography> {empleado.data.NOMBRE}</Typography></Grid>
              <Grid item xs={12}><Typography variant="h5"><Typography variant="inherit" component='span' fontWeight='bold'>FECHA DE INGRESO:</Typography> {new Intl.DateTimeFormat('es-co', { dateStyle: 'medium' }).format(new Date(empleado.data.FECHA_INGRESO))}</Typography></Grid>
              <Grid item xs={12}><Typography variant="h5"><Typography variant="inherit" component='span' fontWeight='bold'>SALARIO:</Typography> ${new Intl.NumberFormat('es-co').format(empleado.data.SALARIO)}</Typography></Grid>
            </Grid>
            : <Typography variant="h5">Not Empleado</Typography>
        }
      </Grid>
      <Grid item xs={12}>
        <Divider><Typography variant="body1">Solicitudes</Typography></Divider>
      </Grid>
      <Grid item xs={12}>
        <List>
          {
            solicitudes?.data.length > 0 ?
              solicitudes?.data.map((solicitud, index) => (
                <ListItem key={index}>
                  <Link to={`/solicitudes/${solicitud.ID}`} style={{ width: '100%' }}>
                    <ListItemButton>
                      <Grid container spacing={0} py={5}>
                        <Grid item xs={2}><Typography variant="h5">{solicitud.ID}</Typography></Grid>
                        <Grid item xs={10}><Typography variant="h5" textTransform='uppercase'>{solicitud.CODIGO}</Typography></Grid>
                        <Grid item xs={12}><Typography variant="h5" textTransform='uppercase' textAlign='center'>{solicitud.RESUMEN}</Typography></Grid>
                        <Grid item xs={12}><Typography variant="h5" textTransform='uppercase' textAlign='center'>{solicitud.DESCRIPCION}</Typography></Grid>
                      </Grid>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))
              : <Typography variant="h5" textAlign='center'>Not Solicitudes</Typography>
          }
        </List>
      </Grid>
    </Grid>
  )
}

export default Empleado