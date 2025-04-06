import { supabase } from "../superbaseClient";
import { useState } from "react";
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
            processPieChartData(data);  // ✅ Now calling this function
            console.log(data);
        }
    };

    return (
        <>
            <h1>Reports</h1>
            <button onClick={handleClick}>Fetch Charts</button>
            
            {/* Render LineChart only if data exists */}
            {data.length > 0 && (
                <LineChart width={400} height={400} data={data}>
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                    <XAxis dataKey="category" />
                    <YAxis />
                </LineChart>
            )}

            {/* Render PieChart only if pieData exists */}
            {pieData.length > 0 && (
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
            )}

            
        </>
    );
}
