import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersScreen } from "./src/features/users/screens/UsersScreen";

const queryClient = new QueryClient();

const App = ()=>{

return (
  <QueryClientProvider client={queryClient}>
    <UsersScreen/>
  </QueryClientProvider>
)
}

export default App;