// hooks
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'

// api
import { GetSolicitudes } from '../api/solicitud'

// store
import { user as storeUser } from './../store/User'

// components
// libraries
import { Grid, Button, Typography, List, ListItem, ListItemButton, FormControl, TextField, Box, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'


const Solicitudes = () => {
  // states
  const [options, setOptions] = useState({
    page: 0
  })
  // hooks
  const [user] = useAtom(storeUser)
  const { register, handleSubmit, formState: { errors } } = useForm()

  // query
  const { data: solicitudes, refetch, isLoading, isError } = useQuery(['solicitudes', options], () => GetSolicitudes(options))

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
      <Grid item xs={8}>
        {user.admin && <Link to='/solicitudes/create'>
          <Button variant="contained" color="success" fullWidth disabled={!user.admin}>
            Create Solicitud
          </Button>
        </Link>}
      </Grid>
      <Grid item xs={4} display='flex' justifyContent='end'>
        <Button variant="text" color="primary" onClick={() => refetch()}>
          Refresh
        </Button>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit((e) => setOptions({ ...options, ...e }))}>
          <FormControl component="fieldset" fullWidth>
            <TextField label="CODIGO" type='text' margin='dense' error={errors.codigo} helperText={errors.codigo?.message}
              {...register('codigo')} />
            <TextField label="DESCRIPCION" type='text' margin='dense' error={errors.descripcion} helperText={errors.descripcion?.message} {...register('descripcion')} />
            <TextField label="RESUMEN" type='text' margin='dense' error={errors.resumen} helperText={errors.resumen?.message} {...register('resumen')} />
            <TextField label="ID EMPLEADO" type='number' margin='dense' error={errors.idEmpleado} helperText={errors.idEmpleado?.message} {...register('idEmpleado')} />
            <Box mt={5}>
              <Button fullWidth variant="contained" color="info" type='submit'>
                Search
              </Button>
            </Box>
          </FormControl>
        </form>
      </Grid>
      <Grid item xs={12}>
        <List>
          {
            solicitudes?.data?.length > 0 ?
              solicitudes?.data.map((solicitud, index) => (
                <ListItem key={index}>
                  <Link to={`${solicitud.ID}`} style={{ width: '100%' }}>
                    <ListItemButton>
                      <Grid container spacing={0} py={5}>
                        <Grid item xs={2}><Typography variant="h5">{solicitud.ID}</Typography></Grid>
                        <Grid item xs={10}><Typography variant="h5" textTransform='uppercase'>{solicitud.CODIGO}</Typography></Grid>
                        <Grid item xs={12}><Typography variant="h5" textTransform='uppercase' textAlign='center'>{solicitud.RESUMEN}</Typography></Grid>
                        <Grid item xs={12}><Typography variant="h5" textTransform='uppercase' textAlign='center'>{solicitud.DESCRIPCION}</Typography></Grid>
                        <Grid item xs={12}><Link to={`/empleados/${solicitud.ID_EMPLEADO}`}><Button variant="contained" color="primary" fullWidth>
                          VIEW Empleado
                        </Button></Link></Grid>
                      </Grid>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))
              : <Typography variant="h5">Not Empleados</Typography>
          }
        </List>
      </Grid>
      <Grid item xs={12} display='flex' justifyContent='center' mt={2}>
        <Pagination
          shape='rounded'
          page={options.page + 1}
          onChange={async (e, v) => {
            await setOptions({ ...options, page: v - 1 })
            refetch()
          }} count={solicitudes ? solicitudes.totalPages : 0} color="primary" />
      </Grid>
    </Grid>
  )
}

export default Solicitudes