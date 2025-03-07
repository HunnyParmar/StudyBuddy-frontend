import React from "react";

const Dashboard = () => {
    const token = localStorage.getItem("token");

    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            {token ? <p>Token: {token}</p> : <p>No Token Found</p>}
        </div>
    );
};

export default Dashboard;