// hooks
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

// api
import { PostSolicitud } from '../api/solicitud'

// components
// libraries
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material'

const SolicitudesCreate = () => {

  // hooks
  const { register, handleSubmit, formState: { errors } } = useForm()

  // query
  const { mutate, isLoading } = useMutation(PostSolicitud)

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} textAlign='center' mb={5}>
        <Typography variant="h3">Create Solicitud</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(mutate)}>
          <FormControl component="fieldset" fullWidth>
            <TextField label="CODIGO" type='text' margin='dense' error={errors.codigo} helperText={errors.codigo?.message}
              {...register('codigo')} />
            <TextField label="DESCRIPCION" type='text' multiline rows={2} margin='dense' error={errors.descripcion} helperText={errors.descripcion?.message} {...register('descripcion')} />
            <TextField label="RESUMEN" type='text' margin='dense' error={errors.resumen} helperText={errors.resumen?.message} {...register('resumen')} />
            <TextField label="ID EMPLEADO" type='number' margin='dense' error={errors.idEmpleado} helperText={errors.idEmpleado?.message} {...register('idEmpleado')} />
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

export default SolicitudesCreate