import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes';
import { SearchProvider } from './hooks-and-funcs/SearchContext';

function App() {
  return (
    <SearchProvider>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    </SearchProvider>
  );
}

export default App;
