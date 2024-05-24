// hooks
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useAtom } from 'jotai'

// api
import endpoints from '../config/api'

// store
import { user as storeUser } from '../store/User'

// others
import axios from 'axios'
import CryptoJS from 'crypto-js'

const useSession = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [userStore, setUserStore] = useAtom(storeUser)

  const login = (data) => {
    const password = CryptoJS.SHA512(data.password).toString()

    axios.request({
      method: 'POST',
      url: endpoints.session,
      headers: { Accept: '*/*', 'Content-Type': 'application/json' },
      data: { id: data.id, password }
    }).then((res) => {
      setUserStore(res.data.data)
      enqueueSnackbar('Welcome to Konecta', { variant: 'success' })
      navigate('/')
    }).catch((error) => {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    })
  }

  const logout = () => {
    localStorage.clear()
    enqueueSnackbar('bye, until next time!!', { variant: 'warning' })
    navigate('/login')
    window.location.reload()
  }

  return {
    login,
    logout
  }
}

export default useSession
