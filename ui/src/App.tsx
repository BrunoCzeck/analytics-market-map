import React from 'react';
import { Dashboard } from './pages/Dashboard';
import { LayerProvider } from './contexts/layer-context';
import { FilterProvider } from './contexts/filter-context';

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
