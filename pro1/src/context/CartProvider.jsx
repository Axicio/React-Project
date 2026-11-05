import { useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext";
import { products } from "../data";

const getSavedCart = () => {
  try {
    const savedItems = JSON.parse(localStorage.getItem("nova-cart")) ?? [];
    return savedItems
      .map((savedItem) => {
        const currentProduct = products.find((product) => product.id === savedItem.id);
        return currentProduct
          ? { ...currentProduct, quantity: Math.min(savedItem.quantity, currentProduct.stock) }
          : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getSavedCart);

  useEffect(() => {
    localStorage.setItem("nova-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...product, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.stock ?? quantity) }
          : item,
      ),
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  const clearCart = () => setCartItems([]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }),
    [cartItems, cartCount, cartTotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
