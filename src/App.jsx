import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Coins from './Components/Coins';
import Coin from './Routes/Coin';
import SearchBar from './Components/SearchBar'; // Import the SearchBar component

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    axios.get(api)
      .then((response) => {
        setCoins(response.data);
        setFilteredCoins(response.data); // Initialize filteredCoins with the full list
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(lowercasedQuery) ||
      coin.symbol.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCoins(filtered);
  };

  return (
    <>
      <Navbar />
      <SearchBar onSearch={handleSearch} /> {/* Add the SearchBar component */}
      <Routes>
        <Route path='/' element={<Coins coins={filteredCoins} />} /> {/* Pass filteredCoins */}
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
