// hooks
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'

// api
import { GetEmpleados } from '../api/empleado'

// store
import { user as storeUser } from './../store/User'

// components
// libraries
import { Grid, Button, Typography, List, ListItem, ListItemButton, FormControl, TextField, Box, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'


const Empleados = () => {
  // states
  const [options, setOptions] = useState({
    page: 0
  })

  // hooks
  const [user] = useAtom(storeUser)
  const { register, handleSubmit, formState: { errors } } = useForm()

  // query
  const { data: empleados, refetch, isLoading, isError } = useQuery(['empleados', options], () => GetEmpleados(options))

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
        {user.admin && <Link to='/empleados/create'>
          <Button variant="contained" color="success" fullWidth disabled={!user.admin}>
            Create Empleado
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
            <TextField label="NOMBRE" type='text' margin='dense' error={errors.nombre} helperText={errors.nombre?.message}
              {...register('nombre')} />
            <TextField label="FECHA DE INGRESO" InputLabelProps={{ shrink: true }} type='date' margin='dense' error={errors.fechaIngreso} helperText={errors.fechaIngreso?.message}
              {...register('fechaIngreso')} />
            <TextField label="SALARIO" type='number' margin='dense' error={errors.salario} helperText={errors.salario?.message}
              {...register('salario')} />
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
            empleados?.data?.length > 0 ?
              empleados?.data.map((empleado, index) => (
                <ListItem key={index}>
                  <Link to={`${empleado.ID}`} style={{ width: '100%' }}>
                    <ListItemButton>
                      <Grid container spacing={0} py={5}>
                        <Grid item xs={2}><Typography variant="h5">{empleado.ID}</Typography></Grid>
                        <Grid item xs={8}><Typography variant="h5" textTransform='uppercase'>{empleado.NOMBRE}</Typography></Grid>
                        <Grid item xs={2}><Typography variant="h5">{new Intl.DateTimeFormat('es-co', { dateStyle: 'medium' }).format(new Date(empleado.FECHA_INGRESO))}</Typography></Grid>
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
          }} count={empleados ? empleados.totalPages : 0} color="primary" />
      </Grid>
    </Grid>
  )
}

export default Empleados