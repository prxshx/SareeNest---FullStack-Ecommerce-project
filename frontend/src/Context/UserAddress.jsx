// 🔥 FILE: src/Context/UserAddress.jsx

import React, { createContext, useState } from 'react';

export const addressProvider = createContext();

const UserAddress = ({ children }) => {

    const [address, setAddress] = useState({
        address: "",
        district: "",
        state: "",
        pinCode: "",
        contactNo: ""
    });

    return (
        <addressProvider.Provider
            value={{
                address,
                setAddress
            }}
        >
            {children}
        </addressProvider.Provider>
    );
};

export default UserAddress;