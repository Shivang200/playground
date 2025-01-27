import React from "react";

export default function Btn({ label, onClick }) {
    return (
        <>
        <div className="pt-6">
        <button onClick={onClick} className="px-16 py-2 rounded-md bg-blue-950 text-white" type="button">
                {label}
            </button>
        </div>
        
        </>
    );
}