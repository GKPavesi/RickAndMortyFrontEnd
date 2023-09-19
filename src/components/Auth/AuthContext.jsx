import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebaseAuthModule } from "../../utils/firebaseUtils";
import Loading_animation from '../Root/Loading-Animation'

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [showLoadingAnimation, setShowLoadingAnimation] = useState(true);
    const [isObserverActive, setIsObserverActive] = useState(true);

    useEffect(() => {
        let unsubscribe;

        if (isObserverActive) {
            unsubscribe = firebaseAuthModule.onAuthStateChanged((user) => {
                setCurrentUser(user);
                setShowLoadingAnimation(false);
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [isObserverActive]);

    const enableObserver = () => {
        setIsObserverActive(true);
    };

    const disableObserver = () => {
        setIsObserverActive(false);
    };

    const value = {
        currentUser,
        enableObserver,
        disableObserver,
    };

    if (showLoadingAnimation) {
        return <Loading_animation />;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
