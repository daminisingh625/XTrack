import { supabase } from "../superbaseClient";
import { useState, useEffect } from "react";
import "../views/recentexpenses.css";

export default function RecentExpenses() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const { data, error } = await supabase
                .from("Expenses")
                .select("id, category, amount, created_at")
                .order("created_at", { ascending: false })
                .limit(5);
            if (!error) {
                setTransactions(data);
            } else {
                console.log(error);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <>
            <div className="recent-transactions">
                <div>
                    <h2>Recent Expenses</h2>
                    <ul>
                        {transactions.map((transaction) => (
                            <li key={transaction.id}>
                                {transaction.category} - ₹{transaction.amount} on{" "}
                                {new Date(transaction.created_at).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
