import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../Config/Firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
const { getDocs } = require("firebase/firestore");

export const FirebaseContext = createContext()

export const FirebaseProvider = props => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const createUser = async (email, password, collectionName, userData) => {
        setIsLoading(true)
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;
                await createUserInFirestore(collectionName, uid, userData, email)
            })
            .catch((error) => {
                if (error.code == "auth/email-already-in-use") {
                    message.error('The email address is already in use')

                } else if (error.code == "auth/invalid-email") {
                    message.error('The email address is not valid.')

                } else if (error.code == "auth/operation-not-allowed") {
                    alert("");
                    message.error('Operation not allowed.')
                } else if (error.code == "auth/weak-password") {
                    message.error('The password is too weak.')
                }
            })
        setIsLoading(false)
    }

    const createUserInFirestore = async (collectionName, uid, userData, email) => {
        const userInfo = {
            ...userData,
            createdBy: {
                email: email,
                uid: uid,
            }
        }
        try {
            await setDoc(doc(db, collectionName, uid), userInfo);
            message.success("Registered Successfully!");

        } catch (e) {
            console.error("Error adding document: ", e);
            message.error('Something went wrong! Registration Failed.')
        }
    }


    const [user, setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(user)

            } else {
                setUser();
            }
        });

    }, [])

    const isLoggedIn = user ? true : false

    const loginUser = async (email, password) => {
        setIsLoading(true)
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                message.success('Login Successful')
                navigate('/')
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-login-credentials') {
                    message.error('Error! Invalid Login Credentials.')
                } else if (error.code === 'auth/network-request-failed') {
                    message.error('Error! Network request failed.')
                }
                else {
                    message.error('Error! Something went wrong while login user.')
                }
            });
        setIsLoading(false)
    }

    const handleCreateNewBankAccount = async (fullName, accNo, accType, branchCode, cnic) => {
        const docRef = doc(db, "accounts", accNo);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return message.error('Error! This account number is already exist.')
        } else {
            try {
                await setDoc(doc(db, "accounts", accNo), {
                    createdBy: {
                        email: user.email,
                        uid: user.uid,
                    },
                    accTitle: fullName,
                    accNo,
                    accType,
                    branchCode,
                    cnic,
                });
                message.success('Bank Account created successfully!')
            } catch (error) {
                console.log(error)
                message.error("Error! Bank Account can't be created")
            }
        }
    }

    const handleAddTransaction = async (fromAcc, to, type, amount) => {
        const transactionData = {
            time: serverTimestamp(),
            from: fromAcc,
            to,
            type,
            amount
        }
        try {
            const docRef = await addDoc(collection(db, "transactions"), transactionData);

            const cityRef = doc(db, 'transactions', docRef.id);
            await setDoc(cityRef, { transactionId: docRef.id }, { merge: true });

        } catch (error) {
            console.error(error)
            message.error("Error! Something went wrong.")
        }

    }

    const deleteDocument = async (collectionName, docId) => {
        try {
            await deleteDoc(doc(db, collectionName, docId));
            // message.success('Deleted Successfully!')
        } catch (error) {
            message.error('Error! Something went wrong.')
        }
    }

    const updateDocument = async (collectionName, docId, updatedData) => {
        try {
            const docRef = doc(db, collectionName, docId);

            await updateDoc(docRef, updatedData);
            message.success('Updated Successfully!')

        } catch (error) {
            console.error(error)
            message.error('Error! Something went wrong.')
        }
    }


    return (
        <FirebaseContext.Provider value={{
            createUser, loginUser, isLoading, isLoggedIn, user,
            handleCreateNewBankAccount, handleAddTransaction, deleteDocument,
            updateDocument
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export const useFirebase = () => useContext(FirebaseContext)