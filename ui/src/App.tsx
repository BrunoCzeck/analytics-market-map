import React from 'react';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { LayerProvider } from './contexts/LayerContext';
import { FilterProvider } from './contexts/FilterContext';

function App() {
  return (
    <LayerProvider>
      <FilterProvider>
        <Dashboard />
      </FilterProvider>
    </LayerProvider>
  );
}

export default App;
