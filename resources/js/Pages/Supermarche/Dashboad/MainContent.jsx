import React from "react";
import { usePage } from "@inertiajs/react";

const MainContent = ({ children }) => {
    const { component } = usePage();

    return (
        <div className="flex-grow-1 p-4">
            <h2 className="mb-4">{component}</h2>
            {children}
        </div>
    );
};

export default MainContent;
