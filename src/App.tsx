import { BrowserRouter, Route, Routes } from "react-router-dom";
import Community from "./COMMUNITY/Components/Community";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./REDUX";
import { QueryClient, QueryClientProvider } from "react-query";

//LAZY
const OnlineUserProfile = lazy(() => import('./USER/Components/OnlineUserProfile'))
const Login = lazy(() => import('./USER/Components/Login'))
const Register = lazy(() => import('./USER/Components/Register'))

// QUERY
const queryClient = new QueryClient()

export default function App() {

    return (
        <Provider store={store}>
            <BrowserRouter >
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path="*" element="Error 404" />

                        <Route path="/" element={<Community />} />
                        <Route path="/perfil/:displayName"
                            element={<Suspense fallback='Cargando componente: OnlineUserProfile'><OnlineUserProfile /></Suspense>} />
                        <Route path="/login"
                            element={<Suspense fallback='Cargando componente: Login'><Login /></Suspense>} />
                        <Route path="/registrarse"
                            element={<Suspense fallback='Cargando componente: Register'><Register /></Suspense>} />
                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    )
}