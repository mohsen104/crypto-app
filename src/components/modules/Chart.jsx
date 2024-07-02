import React, { useState } from "react";
import styles from "./Chart.module.css";
import { convertData } from "../../helpers/convertData";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Text,
} from "recharts";
import currencyNotation from "../../helpers/currencyNotation";

export default function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  function typeHandler(event) {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <div className={styles.header}>
          <div className={styles.name}>
            <img src={chart.coin.image ?? chart.coin.large} />
            <p>{chart.coin.name}</p>
          </div>
          <span className={styles.cross} onClick={() => setChart(false)}>
            X
          </span>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market Caps
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChartComponent({ data, type }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className="label">{`${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "usd",
          }).format(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  };

  function customTike(tikeObj) {
    const {
      payload: { value },
    } = tikeObj;
    return <Text {...tikeObj}>{currencyNotation(value)}</Text>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={400} height={400} data={data}>
        <CartesianGrid stroke="#4040424d" />
        <YAxis
          dataKey={type}
          domain={["auto", "auto"]}
          tick={(tikeObj) => customTike(tikeObj)}
        />
        <XAxis dataKey={"date"} domain={["auto", "auto"]} />
        <Legend />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey={type}
          stroke="#8884d8"
          strokeWidth="2px"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
