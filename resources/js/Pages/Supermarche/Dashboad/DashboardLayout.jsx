import React from "react";
import MainContent from "./MainContent";
import Header from "./Header";
import Sidebar from "./Sidebar";


const DashboardLayout = ({ children }) => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <MainContent>{children}</MainContent>
            </div>
        </div>
    );
};

export default DashboardLayout;
