

import React, { createContext, useEffect, useState } from 'react';
import api from '../Services/api';
import { isAdmin, isLoggedIn } from '../Util/auth';

export const cartContext = createContext();

const CartProvider = ({ children }) => {

    // 🔥 Full cart data from backend
    const [cartItems, setCartitems] = useState([]);

    // 🔥 Prevent wrong UI before cart loads
    const [cartLoading, setCartLoading] = useState(true);

    // 🔥 Global function to refresh cart anytime
    const fetchCartItems = async () => {

        // 🔥 Guest/Admin = no cart
        if (!isLoggedIn() || isAdmin()) {
            setCartitems([]);
            setCartLoading(false);
            return;
        }

        try {

            const response = await api.get("/cart/getCartItems");

            if (response.status === 200) {
                setCartitems(response.data);
            }

        } catch (error) {

            console.log(error.response?.data || error.message);

        } finally {

            setCartLoading(false);
        }
    };

    // 🔥 Fetch once when app loads
    useEffect(() => {

        fetchCartItems();

    }, []);

    return (
        <cartContext.Provider
            value={{
                cartItems,
                setCartitems,
                cartLoading,
                fetchCartItems
            }}
        >
            {children}
        </cartContext.Provider>
    );
};

export default CartProvider;