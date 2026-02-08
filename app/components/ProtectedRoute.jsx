"use client";
import {useAuthStore} from "../store/authStore"
import Login from "./Login"

//protección de rutas, si el usuario no está logueado se muestra el componente de login, si está logueado se muestra el contenido protegido
export default function ProtectedRoute ({children}) {

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    if(!isLoggedIn) return <Login />
    return children
}
