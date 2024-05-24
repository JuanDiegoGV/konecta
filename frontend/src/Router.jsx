// hooks
import { useAtom } from 'jotai'

// context/store
import { theme as ThemeStore } from './store/Theme'
import { user as UserStore } from './store/User'

// components/views
// libraries
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// createds
import Base from './layouts/Base'
import Login from './views/Login'
import Home from './views/Home'
import Empleados from './views/Empleados'
import Empleado from './views/Empleado'
import NotFound from './views/NotFound'
import Solicitudes from './views/Solicitudes'
import Solicitud from './views/Solicitud'
import EmpleadosCreate from './views/EmpleadosCreate'
import SolicitudesCreate from './views/SolicitudesCreate'

function Router() {

  // hooks
  const [themeStore] = useAtom(ThemeStore)
  const [userStore] = useAtom(UserStore)

  // others
  const theme = createTheme(themeStore)

  return (
    <ThemeProvider theme={theme}>
      {!userStore
        ? <Routes>
          {/* Login */}
          <Route path='login' element={<Login />} />
          {/* 404 */}
          <Route path='*' element={<NotFound />} />
        </Routes>
        : <Base>
          <Routes>
            {/* home */}
            <Route index element={<Home />} />
            {/* Empleados */}
            <Route path='empleados' element={<Empleados />} />
            {/* Empleados */}
            <Route path='empleados/create' element={<EmpleadosCreate />} />
            {/* Empleado */}
            <Route path='empleados/:id' element={<Empleado />} />
            {/* Solicitudes */}
            <Route path='solicitudes' element={<Solicitudes />} />
            {/* Solicitudes */}
            <Route path='solicitudes/create' element={<SolicitudesCreate />} />
            {/* Solicitud */}
            <Route path='solicitudes/:id' element={<Solicitud />} />
            {/* 404 */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Base>
      }
    </ThemeProvider >
  )
}

export default Router
