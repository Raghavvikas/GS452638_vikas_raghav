import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ChartPage: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const salesData = useSelector((state: RootState) => state.planning.salesData);

  const [selectedStore, setSelectedStore] = useState(stores[0]?.store || "");

  // Simulating weekly data (W01 to W52)
  const weeks = Array.from(
    { length: 52 },
    (_, i) => `W${String(i + 1).padStart(2, "0")}`
  );

  const generateDummySalesData = (store: string) => {
    return weeks.map((week) => {
      const dummySales = Math.floor(Math.random() * 100000) + 30000; // Random $30K-$130K
      const dummyGM = Math.floor(dummySales * (0.3 + Math.random() * 0.3)); // 30%-60% GM

      return {
        week,
        salesDollars: dummySales.toFixed(2),
        gmDollars: dummyGM.toFixed(2),
        gmPercent: ((dummyGM / dummySales) * 100).toFixed(2),
      };
    });
  };

  const chartData = useMemo(() => {
    const storeSales = salesData.filter(
      (entry) => entry.store === selectedStore
    );

    if (storeSales.length === 0) {
      console.warn(
        `⚠ No data found for ${selectedStore}, generating dummy data.`
      );
      return generateDummySalesData(selectedStore);
    }

    const weeklySales = weeks.map((week) => {
      const randomFactor = Math.random() * 0.2 + 0.9; // 90%-110% variation

      const totalSalesDollars = storeSales.reduce(
        (sum, entry) =>
          sum + (entry.salesUnits * entry.price || 0) * randomFactor,
        0
      );

      const totalGMDollars = storeSales.reduce(
        (sum, entry) =>
          sum +
          (entry.salesUnits * (entry.price - entry.cost) || 0) * randomFactor,
        0
      );

      return {
        week,
        salesDollars: totalSalesDollars.toFixed(2),
        gmDollars: totalGMDollars.toFixed(2),
        gmPercent:
          totalSalesDollars > 0
            ? ((totalGMDollars / totalSalesDollars) * 100).toFixed(2)
            : "0.00",
      };
    });

    return weeklySales;
  }, [selectedStore, salesData]);

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        backgroundColor: "#222",
        padding: 20,
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center", color: "#fff" }}>Gross Margin</h2>

      {/* Store Selector */}
      <div style={{ textAlign: "center", marginBottom: 15 }}>
        <label style={{ color: "#fff", fontSize: "16px", marginRight: 10 }}>
          Select Store:
        </label>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          style={{ padding: "5px", fontSize: "16px" }}
        >
          {stores.map((store) => (
            <option key={store.store} value={store.store}>
              {store.store}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="week" tick={{ fill: "#fff" }} />
          <YAxis
            yAxisId="left"
            tick={{ fill: "#fff" }}
            tickFormatter={(val) => `$${val.toLocaleString()}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "#fff" }}
            tickFormatter={(val) => `${val}%`}
          />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            fill="#3498db"
            name="GM Dollars"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercent"
            stroke="#e67e22"
            strokeWidth={2}
            dot={false}
            name="GM %"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPage;
