import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/Home.page'
import SuperHeroesPage from './components/SuperHeroes.page'
import RQSuperHeroesPage from './components/RQSuperHeroes.page'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools"

import "./App.css"

 const queryClient = new QueryClient()
function App() {

  return (
  
  <QueryClientProvider client={queryClient}>
  
        <Router>     
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' element={<SuperHeroesPage />}> </Route>
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />}> </Route>
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroesPage />}> </Route>

         
          
          
            <Route path='/' element={<HomePage />}> </Route>
          </Routes>
     
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
  )
}

export default App 
