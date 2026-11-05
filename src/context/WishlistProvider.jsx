import { useEffect, useMemo, useState } from "react";
import WishlistContext from "./WishlistContext";

const getSavedIds = () => {
  try {
    const savedIds = JSON.parse(localStorage.getItem("nova-wishlist"));
    return Array.isArray(savedIds) ? savedIds : [];
  } catch {
    return [];
  }
};

const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(getSavedIds);

  useEffect(() => {
    localStorage.setItem("nova-wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  };

  const value = useMemo(
    () => ({ wishlistIds, wishlistCount: wishlistIds.length, toggleWishlist }),
    [wishlistIds],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export default WishlistProvider;
