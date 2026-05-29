import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductsProvider from './Context/ProductsProvider.jsx'
import CartProvider from './Context/CartProvider.jsx'
import UserAddress from './Context/UserAddress.jsx'

createRoot(document.getElementById('root')).render(
  <UserAddress>
  <CartProvider>
<ProductsProvider>
    <App />
  </ProductsProvider>
  </CartProvider>
   </UserAddress>
)