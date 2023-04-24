import './App.scss';
import React from 'react';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Header />
          <div className='container'>
            
          </div>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movie/:imdbID' element={<MovieDetail />} />
              <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
