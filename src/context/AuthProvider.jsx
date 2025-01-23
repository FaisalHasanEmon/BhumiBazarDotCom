import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  // Use States
  const [loading, setLoading] = useState(true); //loading state
  const [user, setUser] = useState(); //user state

  // auth
  const auth = getAuth(app);
  // Google provider
  const googleProvider = new GoogleAuthProvider();

  // Create user with email and password function
  const createUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user with email and password function
  const login = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Login with google
  const googleLogin = () => {
    setLoading(false);
    return signInWithPopup(auth, googleProvider);
  };

  // Update user name and photo
  const updateUser = (name, photo) => {
    setLoading(false);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // logout user
  const logout = () => {
    setLoading(false);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);
  const name = "emon";
  const authInfo = {
    createUser,
    login,
    logout,
    user,
    name,
    loading,
    setLoading,
    googleLogin,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
