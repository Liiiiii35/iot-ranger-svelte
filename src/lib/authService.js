import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	sendPasswordResetEmail,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { apiFetch } from './api';

const googleProvider = new GoogleAuthProvider();

// export async function loginUser(email, password) {
// 	const data = await apiFetch('/auth/login', {
// 		method: 'POST',
// 		body: JSON.stringify({ email, password })
// 	});

// 	localStorage.setItem('access_token', data.access_token);
// 	localStorage.setItem('token_type', data.token_type || 'bearer');
// 	localStorage.setItem('expires_in', String(data.expires_in || ''));
// 	return data;
// }

// export async function registerUser(username, email, password) {
// 	return apiFetch('/auth/register', {
// 		method: 'POST',
// 		body: JSON.stringify({ username, email, password })
// 	});
// }

export function logoutUser() {
	localStorage.removeItem('access_token');
	localStorage.removeItem('token_type');
	localStorage.removeItem('expires_in');
}

export function getToken() {
	return localStorage.getItem('access_token');
}

export function isLoggedIn() {
	return !!localStorage.getItem('access_token');
}

async function exchangeToken() {
	const firebaseUser = auth.currentUser;
	if (!firebaseUser) throw new Error("No Firebase user");

	const idToken = await firebaseUser.getIdToken();
	const data = await apiFetch("/auth/firebase", {
		method: "POST",
		body: JSON.stringify({ id_token: idToken }),
	});

	localStorage.setItem("access_token", data.access_token);
	localStorage.setItem("token_type", data.token_type || "bearer");
	return data.access_token;
}

export async function registerWithEmail(email, password) {
	await createUserWithEmailAndPassword(auth, email, password);
	return exchangeToken();
}

export async function loginWithEmail(email, password) {
	await signInWithEmailAndPassword(auth, email, password);
	return exchangeToken();
}

export async function loginWithGoogle() {
	await signInWithPopup(auth, googleProvider);
	return exchangeToken();
}

export async function resetPassword(email) {
	await sendPasswordResetEmail(auth, email);
}

export async function logoutFirebase() {
	await signOut(auth);
	logoutUser();
}