import {create} from 'zustand';

const useUserStore = create((set) => ({
    user: null,
    cart: [],
    setUser: (user) => set({user}),
    logout: () => set({user: null}),
    clearCart: () => set({cart: []}),
    setCart: (cart) => set({cart: cart}),
}));

export default useUserStore;