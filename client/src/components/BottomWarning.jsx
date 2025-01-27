import { Link } from "react-router-dom";



export default function BottomWarning({ label , to ,Bottomtext}){

          
    return(
        <>
        <div className="flex mt-5"> 
            <h3 className="text-gray-700">{label}</h3>
            <Link to={to} >{Bottomtext}</Link>
        </div>
        </>
    )

}