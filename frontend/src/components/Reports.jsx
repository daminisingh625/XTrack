import { supabase } from "../superbaseClient";
import { useState } from "react";
import "../views/Reports.css"
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip, Cell } from "recharts";

export default function Reports() {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  // Function to group expenses by category
  const processPieChartData = (expenses) => {
    const categoryMap = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const formattedData = Object.entries(categoryMap).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));

    setPieData(formattedData);
  };

  const handleClick = async () => {
    const { data, error } = await supabase.from("Expenses").select("*");

    if (error) {
      console.log("There was an error:", error);
    } else {
      setData(data);
      processPieChartData(data);
      console.log(data);
    }
  };

  return (
    <div className="reports-container">
      <h1>Expense Reports</h1>
      <button onClick={handleClick} className="fetch-button">Fetch Charts</button>

      {data.length > 0 && (
        <>
          <p className="chart-description">
            The line chart below shows the total expense amount for each category over time.
          </p>
          <LineChart width={400} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
            <XAxis dataKey="category" />
            <YAxis />
          </LineChart>
        </>
      )}

      {pieData.length > 0 && (
        <>
          <p className="chart-description">
            The pie chart illustrates the percentage distribution of your expenses by category.
          </p>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </>
      )}
    </div>
  );
}
