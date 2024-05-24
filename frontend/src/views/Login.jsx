// hooks
import { useForm } from 'react-hook-form'
import useSession from './../hooks/useSession'

// components
// libraries
import { Box, Grid, FormControl, TextField, Button } from '@mui/material'

// others
import bgLogin from '../images/bgLogin.jpg'
import logo from '../images/logo.svg'

const Login = () => {
  // hooks
  const { login } = useSession()
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <Grid container spacing={0} height='100%'>
      <Grid item xs={12} lg={7} sx={{ display: { xs: 'none', lg: 'block' } }} style={{ backgroundImage: `url(${bgLogin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      </Grid>
      <Grid item xs={12} lg={5} sx={{ paddingX: { xs: '20px', md: 'none' }, height: { xs: '70%', lg: '100%' } }} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        <Box width='100%' sx={{ height: '10%' }} textAlign='center' display='flex' justifyContent='center' alignItems='center'>
          <img src={logo} alt="logo Konecta" width='120px' />
        </Box>
        <Box sx={{ width: { xs: '80%', lg: '100%' } }}>
          <form onSubmit={handleSubmit(login)}>
            <FormControl component="fieldset" fullWidth>
              <TextField label="ID" type='number' margin='dense' error={errors.id} helperText={errors.id?.message}
                {...register('id', { required: { value: true, message: 'Field Id is required' } })} />
              <TextField label="Contraseña" type='password' margin='dense' error={errors.password} helperText={errors.password?.message}
                {...register('password', { required: { value: true, message: 'Field Contraseña is required' } })} />
              <Box mt={5}>
                <Button fullWidth variant="contained" color="success" type='submit'>
                  login
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Grid >
    </Grid >
  )
}

export default Login
