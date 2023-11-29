import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme, Button, Portal, Modal } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { Storage } from '../../helpers';
import TextInput from '../atoms/TextInput';
import Auth from '../../api/auth';

const Login = ({ navigation, register }) => {
	const theme = useTheme();
	const style = styles(theme.colors);
	
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	
	const [visible, setVisible] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const loginUser = async (email: string, password: string) => {
		const response = await Auth.login(email, password);
		if (!response.success) {
			setMessage(response.error.message);
			showModal();
			return;
		}
		Storage.removeItem('accessToken');
		Storage.removeItem('refreshToken');
		Storage.removeItem('userType');

		await Storage.setItem('accessToken', response.accessToken);
		await Storage.setItem('refreshToken', response.refreshToken);
		await Storage.setItem('userType', response.userType);
		navigation.replace('Profile');
	};

	return (
		<View style={style.container}>
			<Portal>
				<Modal
					visible={visible}
					onDismiss={hideModal}
					contentContainerStyle={style.modal}
				>
					<Text>
						{ message }
					</Text>
				</Modal>
			</Portal>
			<View style={style.inputContainer}>
				<TextInput
					placeholder="email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={style.input}
				/>
				<TextInput
					placeholder="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					style={style.input}
					secureTextEntry={true}
				/>
			</View>
			<View style={style.buttonContainer}>
				<Button
					mode="contained"
					onPress={() => loginUser(email, password)}
					labelStyle={style.buttonText}
					style={style.button}
				>
					Login
				</Button>
				<Button
					mode="outlined"
					onPress={() => register(true)}
					labelStyle={style.buttonText}
					style={style.button}
				>
					Register
				</Button>
			</View>
		</View>
	);
};

const styles = (colors: MD3Colors) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background,
			flex: 1,
			flexDirection: 'column',
            justifyContent: 'center',
			padding: 10,
		},
		inputContainer: {
			display: 'flex',
			flexDirection: 'column',
			height: 100,
			justifyContent: 'space-around',
			margin: 10,
		},
		input: {
			margin: 10,
            height: 40,
		},
		buttonContainer: {
			display: 'flex',
			flexDirection: 'column',
			height: 120,
			justifyContent: 'space-between',
			margin: 10,
		},
		button: {
            borderWidth: 3,
            borderRadius: 50,
            borderColor: colors.primary,
			padding: 2.5,
            margin: 10,
		},
		buttonText: {
            fontSize: 20,
		},
		modal: {
			backgroundColor: colors.background,
			padding: 20,
			margin: 20,

		}
	});

export default Login;
