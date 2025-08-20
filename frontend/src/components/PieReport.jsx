import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../views/piereport.css";
import { supabase } from "../superbaseClient";

export default function PieReport() {
  const [data, setData] = useState([]); // Stores all fetched data
  const [pieData, setPieData] = useState([]); // Stores filtered pie chart data
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default: current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default: current year

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Colors for pie chart

  // Fetch data from Supabase
  const fetchData = async () => {
    const { data, error } = await supabase.from("Expenses").select("*");

    if (error) {
      console.log("There was an error:", error);
    } else {
      setData(data);
      filterDataByMonth(data, selectedMonth, selectedYear);
    }
  };

  // Function to filter expenses by selected month and year
  const filterDataByMonth = (expenses, month, year) => {
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.created_at);
      return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year;
    });

    processPieChartData(filteredExpenses);
  };

  // Convert filtered expenses to pie chart format
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

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update pie data when month or year changes
  useEffect(() => {
    filterDataByMonth(data, selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, data]);

  return (
    <><h2>Category Distribution</h2>
    <div className="pie-report">

      {/* Month and Year Filters */}
      <div className="filters">
        <label>Month: </label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        <label>Year: </label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>

      {/* Pie Chart */}
      {pieData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie data={pieData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
    </>
  );
}
