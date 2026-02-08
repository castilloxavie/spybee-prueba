import { create } from "zustand"

export const useAuthStore = create((set) => ({
    isLoggedIn: false,
    user: null,

    //login
    login: (email, password) => {
        if (email && password.length >=6){
            set({isLoggedIn: true, user:{email}})
            return true
        }
        else {
            return false
        }
    },

    //logout
    logout: () => {
        set({isLoggedIn: false, user: null})
    }

}))
