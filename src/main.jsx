import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './index.jsx'
import axios from 'axios';
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { AuthProvider } from "./context/AuthContext";


// setup axios
axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  <Provider store={store}>
 <RouterProvider router={router}/>
  </Provider>
   </AuthProvider>
  </StrictMode>,
)






