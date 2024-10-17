import { BrowserRouter, Route, Routes } from "react-router-dom";
import Community from "./COMMUNITY/Components/Community";

export default function App(){
    return(
        <BrowserRouter >
            <Routes>
                <Route path="*" element="Error 404"/>

                <Route path="/" element={<Community />}/>
            </Routes>
        </BrowserRouter>
    )
}