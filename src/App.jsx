import React, { useEffect } from 'react';

import './global.css'

import Routes from './routes';

const FilterContext = React.createContext({
  filterOrder: '',
  filterUsername: '',
  filterDate: '',
});

function App() {
  useEffect(()=> {
    console.log(FilterContext);
  })
  return (
    <FilterContext.Provider>
      <Routes />
    </FilterContext.Provider>
  );
}

export {App as default, FilterContext};