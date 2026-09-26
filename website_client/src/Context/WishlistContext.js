import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('traveler_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('traveler_wishlist', JSON.stringify(wishlist));
        } catch (e) { }
    }, [wishlist]);

    const toggleWishlist = (item) => {
        setWishlist((prev) => {
            const exists = prev.some((x) => x._id === item._id || x.id === item._id || x.name === item.foodName);
            if (exists) {
                return prev.filter((x) => (x._id || x.id) !== (item._id || item.id) && x.foodName !== item.foodName);
            } else {
                return [...prev, item];
            }
        });
    };

    const isInWishlist = (id, name) => {
        return wishlist.some((x) => (x._id || x.id) === id || (name && x.foodName === name));
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((x) => (x._id || x.id) !== id));
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                isInWishlist,
                removeFromWishlist,
                clearWishlist,
                totalItems: wishlist.length,
                totalPrice: wishlist.reduce((acc, curr) => acc + (Number(curr.foodPrice) || 60), 0)
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}

export default WishlistContext;
