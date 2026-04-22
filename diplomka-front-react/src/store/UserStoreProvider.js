import {create} from 'zustand';

const useUserStore = create((set) => ({
    user: undefined,
    cart: [],
    setUser: (user) => set({user}),
    logout: () => set({user: null}),
    clearCart: () => set({cart: []}),
    setCart: (cart) => set({cart: cart}),
    addToCart: (item) => {
        set((state) => {
            const existing = state.cart.find(i => i.id === item.id);
            if (existing) {
                return {
                    cart: state.cart.map(i =>
                        i.id === item.id
                            ? {...i, quantity: i.quantity + 1}
                            : i
                    )
                };
            }
            return {
                cart: [...state.cart, {...item, quantity: 1}]
            };
        })
    },
    decreaseQuantity: (id) => {
        set((state) => ({
            cart: state.cart
                .map(item =>
                    item.id === id
                        ? {...item, quantity: item.quantity - 1}
                        : item
                )
                .filter(item => item.quantity > 0)
        }))
    },
    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter(item => item.id !== id)
        }))
}));

export default useUserStore;