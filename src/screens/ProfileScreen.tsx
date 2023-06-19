import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import Auth from "../api/auth";
import Header from "../components/atoms/Header";
import Login from "../components/organisms/Login";
import Profile from "../components/organisms/Profile";
import { Storage } from "../helpers";
import Register from "../components/organisms/Register";

const ProfileScreen = ({ navigation }) => {
	const [auth, setAuth] = useState(false);
	const [loading, setLoading] = useState(true);
	const [register, setRegister] = useState(false);
	useEffect(() => {
		checkAuthentication();
	}, []);

	const checkAuthentication = async () => {
		try {
			const refreshToken = await Storage.getItem('refreshToken');
			if (!refreshToken) {
				setAuth(false);
				return;
			}
			setAuth(true);
			
			// const response = await Auth.refreshToken(refreshToken);
			// if (response) {
			// 	setAuth(true);
			// 	Storage.setItem('accessToken', response.accessToken);
			// 	Storage.setItem('refreshToken', response.refreshToken);
			// } else {
			// 	setAuth(false);
			// }
		} catch (error) {
			console.error('Error checking authentication:', error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <Text>Loading...</Text>;
	}
	return (
		<>
			<Header navigation={navigation} />

			{auth ? <Profile nagivation={navigation}/> : (
				register ? <Register navigation={navigation} /> :
				<Login navigation={navigation} register={setRegister} />)}
		</>
	);
};

export default ProfileScreen;
