import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getPromotions } from './utils/promotions';
import PromotionTable from './components/Promotion/Table/index';

const promotions = getPromotions()

console.log({ promotions})

function App() {
  
  return (
    <div className="App">
      <h1>Promotion Table</h1>

      <PromotionTable 
        data={promotions}
      />
    </div>
  );
}

export default App;
