import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

export const AuthContext = createContext();

const auth = getAuth(app);


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleUser = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const verifyUser = () => {
        sendEmailVerification(auth.currentUser);
    }

    const forgetPasswordEmail = (email) => {
        sendPasswordResetEmail(auth, email);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("user Observing");
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubcribe();

    }, []);

    const authInfo = {
        createUser,
        updateUser,
        loginUser,
        googleUser,
        verifyUser,
        forgetPasswordEmail,
        logOut,
        user,
    };

    return (

        <AuthContext.Provider value={authInfo}> {children} </AuthContext.Provider>

    );
};

export default AuthProvider;


