import React, { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";
import Title from "../modules/Title";

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(getCoinList(page, currency))
      .then((res) => res.json())
      .then((json) => {
        setCoins(json);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, currency]);

  return (
    <div>
      <Title title="Market Live" subtitle="Cryptocurrency Categories" />
      <Search currency={currency} setCurrency={setCurrency} setChart={setChart} />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}
