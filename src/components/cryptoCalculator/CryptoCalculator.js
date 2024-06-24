import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cryptoCalculator.css';

const CryptoCalculator = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [amountBought, setAmountBought] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [feePercentage, setFeePercentage] = useState('');
  const [minSellingPrice, setMinSellingPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    // Получение списка криптовалют
    const fetchCryptocurrencies = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCryptocurrencies(response.data);
      } catch (error) {
        console.error('Ошибка получения данных криптовалют:', error);
      }
    };
    fetchCryptocurrencies();
  }, []);

  const handleCryptoChange = async (e) => {
    const selectedCrypto = cryptocurrencies.find(crypto => crypto.id === e.target.value);
    setSelectedCrypto(selectedCrypto);
    await fetchCurrentPrice(selectedCrypto.id);
  };

  const fetchCurrentPrice = async (cryptoId) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: cryptoId,
          vs_currencies: 'usd',
        },
      });
      setCurrentPrice(response.data[cryptoId].usd);
    } catch (error) {
      console.error('Ошибка получения текущего курса криптовалюты:', error);
    }
  };

  const handleCalculateMinSellingPrice = () => {
    const purchaseAmount = parseFloat(amountBought) * parseFloat(purchasePrice);
    const feeAmount = (purchaseAmount * parseFloat(feePercentage)) / 100;
    const totalCost = purchaseAmount + feeAmount;
    const minPrice = totalCost / parseFloat(amountBought);
    setMinSellingPrice(minPrice);
  };

  return (
    <div className="crypto-calculator">
      <h2>Калькулятор криптовалют</h2>
      <div className="form-group">
        <label htmlFor="crypto">Выберите криптовалюту:</label>
        <select id="crypto" onChange={handleCryptoChange}>
          <option value="">--Выберите--</option>
          {cryptocurrencies.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </div>
      {currentPrice !== null && (
        <div className="current-price">
          <p>Текущий курс: ${currentPrice.toFixed(2)}</p>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="amountBought">Количество купленной криптовалюты:</label>
        <input
          type="number"
          id="amountBought"
          value={amountBought}
          onChange={(e) => setAmountBought(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="purchasePrice">Цена покупки ($):</label>
        <input
          type="number"
          id="purchasePrice"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="feePercentage">Процент комиссии (%):</label>
        <input
          type="number"
          id="feePercentage"
          value={feePercentage}
          onChange={(e) => setFeePercentage(e.target.value)}
        />
      </div>
      <button onClick={handleCalculateMinSellingPrice}>Рассчитать минимальную цену продажи</button>
      {minSellingPrice !== null && (
        <div className="result">
          <p>Минимальная цена продажи: ${minSellingPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CryptoCalculator;
