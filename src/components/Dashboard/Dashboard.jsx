import React from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuthModule } from "../../utils/firebaseUtils";

const Dashboard = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))

    function logout() {
        const logout = firebaseAuthModule.signOut(firebaseAuthModule)
        localStorage.removeItem('user')
    }

    return (
        <div className="dashboard-container">
            <h2>Hello {user.first_name} {user.last_name}!</h2>
            <h2>Welcome to the Dashboard</h2>
            <br/>
            <div className="search-option dashboard-option" onClick={() => navigate('/')}>
                Search
            </div>
            <div className="logout-option dashboard-option" onClick={logout}>
                Logout
            </div>
            <div className="change-password-option dashboard-option">
                Change Password
            </div>
        </div>
    );
};

export default Dashboard;