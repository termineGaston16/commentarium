import { BrowserRouter, Route, Routes } from "react-router-dom";
import Community from "./COMMUNITY/Components/Community";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./REDUX";

//LAZY
const OnlineUserProfile = lazy(() => import('./COMMUNITY/Components/OnlineUserProfile'))

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter >
                <Routes>
                    <Route path="*" element="Error 404" />

                    <Route path="/" element={<Community />} />
                    <Route path="/perfil/:displayName"
                        element={<Suspense fallback='Cargando componente: OnlineUserProfile'><OnlineUserProfile /></Suspense>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}