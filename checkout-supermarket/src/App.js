import React, { useState } from 'react';
import Basket from './components/Basket/Basket';
import ItemFinder from './components/ItemFinder/ItemFinder';
import Checkout from './components/Checkout/Checkout';

import './App.css';

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div className="App">
      <ItemFinder onAddItem={setSelectedItems} selectedItems={selectedItems}/>
      {selectedItems.length !== 0 ? <Basket items={selectedItems} /> : <div><b>Shaw we start?</b></div>}
      {selectedItems.length  !== 0 && <Checkout items={selectedItems} />}
    </div>
  );
}

export default App;
