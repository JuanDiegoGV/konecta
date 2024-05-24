// hooks
import { useSnackbar } from 'notistack'

// components
// libraries
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// createds
import Router from './Router'

function App() {

  // hooks
  const { enqueueSnackbar } = useSnackbar()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        refetchOnWindowFocus: false,
        onError: (data) => {
          enqueueSnackbar(data.response.data === undefined ? 'connection error, try again later' : data.response.data.message, { variant: 'error' })
        },
        onSuccess: (data) => {
          enqueueSnackbar(data.message, { variant: 'success' })
        }
      },
      mutations: {
        onError: (data) => {
          enqueueSnackbar(data.response.data === undefined ? 'connection error, try again later' : data.response.data.message, { variant: 'error' })
        },
        onSuccess: (data) => {
          enqueueSnackbar(data.message, { variant: 'success' })
        }
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
