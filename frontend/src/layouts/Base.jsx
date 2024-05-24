// hooks
import { useLocation, Link } from 'react-router-dom'
import { useAtom } from 'jotai/react'
import useSession from './../hooks/useSession'

// components
// libraries
import { Box, AppBar, Toolbar, Typography, Tooltip, Avatar, Container, IconButton, Chip } from '@mui/material'
// import HomeIcon from '@mui/icons-material/Home'

// store
import { user as storeUser } from './../store/User'

const Base = ({ children }) => {
  // hooks
  const location = useLocation()
  const [user] = useAtom(storeUser)
  const { logout } = useSession()

  return (
    <Box width='100%' height='100%'>
      <AppBar color='primary'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              Konecta
            </Link>
          </Typography>
          {
            location.pathname !== '/'
              ? <Tooltip title="volver al inicio">
                <Box color='#fff' sx={{ flexGrow: 0 }} mr>
                  <Link to="/">
                    <IconButton color='inherit'>
                      {/* <HomeIcon fontSize='large' /> */}
                    </IconButton>
                  </Link>
                </Box>
              </Tooltip>
              : null
          }
          <Box sx={{ flexGrow: 0, cursor: 'pointer' }} onClick={()=>logout()}>
            <Tooltip title={'logout ' + user.name}>
              <Avatar alt='usuario'>
                {user.name.split(' ')[0].substring(0, 2)}
              </Avatar>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box pt={12} width='100%' height='100%' overflow='auto'>
        <Container maxWidth='lg' sx={{ height: '100%' }}>
          {children}
          <Box mt={5} height='1px' />
        </Container>
      </Box>
    </Box>
  )
}

export default Base
