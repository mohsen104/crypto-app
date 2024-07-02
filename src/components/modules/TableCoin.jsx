import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./TableCoin.module.css";
import { marketChart } from "../../services/cryptoApi";
import currencyFormater from "../../helpers/currencyFormater";

export default function TableCoin({ coins, isLoading, currency, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeWidth="2" strokeColor="#3874ff" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                key={coin.id}
                id={coin.id}
                coin={coin}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function TableRow({ coin, currency, setChart }) {
  const {
    id,
    name,
    image,
    symbol,
    market_cap_rank,
    current_price,
    price_change_percentage_24h: price_change,
  } = coin;

  async function showHandler() {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  }
  return (
    <tr>
      <td>
        <span>{market_cap_rank}</span>
      </td>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>
        <span>{name}</span>
      </td>
      <td>
        <span>{currencyFormater(current_price, currency)}</span>
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
}
