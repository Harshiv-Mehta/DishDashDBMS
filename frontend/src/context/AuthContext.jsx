import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch, authHeaders } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('dishdash_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        if (user?.token) {
            localStorage.setItem('dishdash_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('dishdash_user');
        }
    }, [user]);

    useEffect(() => {
        if (!user?.token) {
            setFavoriteIds([]);
            setRecentSearches([]);
            return;
        }

        const loadUserState = async () => {
            try {
                const [favorites, history] = await Promise.all([
                    apiFetch('/api/users/favorites', { headers: authHeaders(user.token) }),
                    apiFetch('/api/users/search-history', { headers: authHeaders(user.token) }),
                ]);
                setFavoriteIds(favorites.map(item => item.product_id));
                setRecentSearches(history.map(item => item.search_term));
            } catch (error) {
                console.error('Failed to load user state:', error);
            }
        };

        loadUserState();
    }, [user?.token]);

    const register = async ({ name, email, password, address }) => {
        const userData = await apiFetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, address }),
        });
        setUser(userData);
        return userData;
    };

    const login = async ({ email, password }) => {
        const userData = await apiFetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        setUser(userData);
        return userData;
    };

    const logout = () => {
        localStorage.removeItem('dishdash_user');
        setUser(null);
        setFavoriteIds([]);
        setRecentSearches([]);
    };

    const toggleFavorite = async (productId) => {
        if (!user?.token) return;

        const isFavorite = favoriteIds.includes(productId);
        if (isFavorite) {
            await apiFetch(`/api/users/favorites/${productId}`, {
                method: 'DELETE',
                headers: authHeaders(user.token),
            });
            setFavoriteIds(prev => prev.filter(id => id !== productId));
            return false;
        }

        await apiFetch('/api/users/favorites', {
            method: 'POST',
            headers: authHeaders(user.token),
            body: JSON.stringify({ productId }),
        });
        setFavoriteIds(prev => [...prev, productId]);
        return true;
    };

    const recordSearch = async (searchTerm) => {
        if (!user?.token || !searchTerm?.trim()) return;

        try {
            await apiFetch('/api/users/search-history', {
                method: 'POST',
                headers: authHeaders(user.token),
                body: JSON.stringify({ searchTerm: searchTerm.trim() }),
            });

            setRecentSearches(prev => [searchTerm.trim(), ...prev.filter(item => item.toLowerCase() !== searchTerm.trim().toLowerCase())].slice(0, 8));
        } catch (error) {
            console.error('Failed to save search history:', error);
        }
    };

    const value = useMemo(() => ({
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        favoriteIds,
        recentSearches,
        isFavorite: (productId) => favoriteIds.includes(productId),
        toggleFavorite,
        recordSearch,
    }), [user, favoriteIds, recentSearches]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
