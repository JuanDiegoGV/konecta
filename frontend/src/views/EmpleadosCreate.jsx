// hooks
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

// api
import { PostEmpleado } from '../api/empleado'

// components
// libraries
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material'

const EmpleadosCreate = () => {

  // hooks
  const { register, handleSubmit, formState: { errors } } = useForm()

  // query
  const { mutate, isLoading } = useMutation(PostEmpleado)

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} textAlign='center' mb={5}>
        <Typography variant="h3">Create Empleado</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(mutate)}>
          <FormControl component="fieldset" fullWidth>
            <TextField label="NOMBRE" type='text' margin='dense' error={errors.nombre} helperText={errors.nombre?.message}
              {...register('nombre')} />
            <TextField label="FECHA DE INGRESO" InputLabelProps={{ shrink: true }} type='date' margin='dense' error={errors.fechaIngreso} helperText={errors.fechaIngreso?.message}
              {...register('fechaIngreso')} />
            <TextField label="SALARIO" type='number' margin='dense' error={errors.salario} helperText={errors.salario?.message}
              {...register('salario')} />
            <Box mt={5}>
              <Button fullWidth variant="contained" color="success" type='submit' disabled={isLoading}>
                Create
              </Button>
            </Box>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}

export default EmpleadosCreate