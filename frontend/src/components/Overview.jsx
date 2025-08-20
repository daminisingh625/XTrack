import "../views/overview.css";
// import RecentExpenses from "./RecentExpenses";

export default function Overview() {
    return (
        <div className="money-spent">
            <h1>You've spent <span className="spent-amount"></span> of <span className="total-amount"></span></h1>
            <div className="grid-container">
                <div className="grid-item">
                    <h2>Food</h2>
                    <p>₹150</p>
                </div>
                <div className="grid-item">
                    <h2>Transport</h2>
                    <p>₹100</p>
                </div>
                <div className="grid-item">
                    <h2>Entertainment</h2>
                    <p>₹200</p>
                </div>
                <div className="grid-item">
                    <h2>Shopping</h2>
                    <p>₹50</p>
                </div>
            </div>
        </div>
    );
}
