import Posts from '../components/posts'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
//create client
const queryClient = new QueryClient()

const HomePage = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1>Blog-em Ipsum</h1>
        <Posts />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default HomePage
