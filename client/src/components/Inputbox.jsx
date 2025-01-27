
import React from "react" 


export default function Inputbox({ label, placeholder, onchange }) {
  return (
    <div className="flex justify-between pt-5">
      <div className="text-lg">{label}</div>
      <div>
        
        <input type="text" className="border-2 border-slate-500 p-1 rounded-lg text-center" placeholder={placeholder} onChange={onchange} />
      </div>
    </div>
  );
}