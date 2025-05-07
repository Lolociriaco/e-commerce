import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];
    addProductToCart: (product: CartProduct) => void;

    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
    getTotalItems: () => number;
    getSummaryInformation: () => {
        total: number;
        subTotal: number;
        tax: number;
        itemsInCart: number;
    };
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],
            
            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce(
                 ( subTotal, item ) => subTotal + (item.price*item.quantity), 0)

                const tax = subTotal * 0.16;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity , 0);

                return {
                    total, subTotal, tax, itemsInCart
                }
            },

            removeProduct: (product: CartProduct) => {
                const { cart } = get();

                const updatedCart = cart.filter( item => {
                    return !(item.id === product.id && item.size === product.size);
                })

                set({cart: updatedCart})

            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProducts = cart.map( item => {
                    if(item.id === product.id && item.size === product.size){
                        return {...item, quantity: quantity}
                    }
                    return item;
                })
                set({cart: updatedCartProducts})

            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // 1. revisar si el producto existe en el carrito con la talla indicada
                const productsInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productsInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // 2. Sabiendo que el producto ya esta en el carrito con la misma talla lo incremento

                const updatedCartProducts = cart.map((item) => {

                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                })

                set({ cart: updatedCartProducts })

            },

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity , 0)
            }
        })
        ,
        {
            name: "shopping-cart"
        }
    )
)