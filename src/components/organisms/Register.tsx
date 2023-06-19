import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	Image,
	Alert,
} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import TextInput from '../atoms/TextInput';
import { RegisterUser, UserType } from '../../types/User';
import { pickImageAsync, validateMail, validatePassword } from '../../helpers';
import Auth from '../../api/auth';

const Register = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme.colors);

	const [userType, setUserType] = React.useState(UserType.DEVELOPER);

	const [inputs, setInputs] = React.useState({
		email: '',
		password: '',
	});
	const [image, setImage] = React.useState('');
	const handleChange = (name: string, text: string) =>
		setInputs((prevState) => ({
			...prevState,
			[name]: text,
		}));

	const iconBriefcase = require('../../assets/icons/briefcase.png');
	const iconCode = require('../../assets/icons/code.png');

	const handleRegister = async () => {
		const data: RegisterUser = {
			...inputs,
			userType,
			avatar: image,
		};
		if (
			!data.email ||
			!data.password ||
			(data.userType === UserType.COMPANY &&
				(!data.name || !data.avatar)) ||
			(data.userType === UserType.DEVELOPER &&
				!data.firstName &&
				!data.lastName)
		) {
			Alert.alert('Error', 'Please fill all fields');
			return;
		}
		if (!validateMail(data.email)) {
			Alert.alert('Error', 'Please enter a valid email');
			return;
		}
		if (!validatePassword(data.password)) {
			Alert.alert(
				'Error',
				'Password must be at least 8 characters long and contain at least one number, one uppercase letter and one lowercase letter'
			);
			return;
		}

		const response = await Auth.register(data);
		if (response === true) {
			Alert.alert('Success', 'You have been registered', [
				{
					text: 'OK',
					onPress: () => navigation.replace('Profile'),
				},
			]);
		} else {
			Alert.alert('Error', response);
		}
	};
	return (
		<View style={style.container}>
			<View style={style.userTypeContainer}>
				<TouchableOpacity
					onPress={() => setUserType(UserType.DEVELOPER)}
				>
					<Text
						style={[
							style.userType,
							userType === UserType.DEVELOPER
								? style.userTypeSelected
								: {},
						]}
					>
						Developer
					</Text>
				</TouchableOpacity>
				<View style={style.userTypeSep}></View>
				<TouchableOpacity onPress={() => setUserType(UserType.COMPANY)}>
					<Text
						style={[
							style.userType,
							userType === UserType.COMPANY
								? style.userTypeSelected
								: {},
						]}
					>
						Company
					</Text>
				</TouchableOpacity>
			</View>
			<Image
				source={
					userType === UserType.COMPANY ? iconBriefcase : iconCode
				}
				style={style.icon}
			/>
			<View style={style.inputContainer}>
				<TextInput
					placeholder='email'
					value={inputs['email'] || ''}
					onChangeText={(text) => handleChange('email', text)}
					style={style.input}
				/>
				<TextInput
					placeholder='password'
					value={inputs['password'] || ''}
					onChangeText={(text) => handleChange('password', text)}
					style={style.input}
					secureTextEntry={true}
				/>
				{userType === UserType.COMPANY ? (
					<>
						<TextInput
							placeholder='company name'
							value={inputs['name'] || ''}
							onChangeText={(text) => handleChange('name', text)}
							style={style.input}
						/>
						<TextInput
							placeholder='location'
							value={inputs['location'] || ''}
							onChangeText={(text) =>
								handleChange('location', text)
							}
							style={style.input}
						/>
					</>
				) : (
					<>
						<TextInput
							placeholder='first name'
							value={inputs['firstName'] || ''}
							onChangeText={(text) =>
								handleChange('firstName', text)
							}
							style={style.input}
						/>
						<TextInput
							placeholder='last name'
							value={inputs['lastName'] || ''}
							onChangeText={(text) =>
								handleChange('lastName', text)
							}
							style={style.input}
						/>
					</>
				)}
				<Image
					source={
						image
							? { uri: image }
							: null
					}
					style={image ? style.image : {}}
				/>
				<Button
					mode='outlined'
					onPress={() =>
						pickImageAsync().then((res) => setImage(res))
					}
					labelStyle={style.buttonText}
					style={style.button}
				>
					{image ? 'Image selected' : 'Select image'}
				</Button>
				<Button
					mode='contained'
					onPress={handleRegister}
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
			flex: 1,
			backgroundColor: colors.background,
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
		icon: {
			width: 80,
			height: 80,
			margin: 10,
			alignSelf: 'center',
			tintColor: colors.primary,
		},
		inputContainer: {
			flex: 1,
			alignItems: 'center',
		},
		userTypeContainer: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			margin: 10,
			padding: 10,
			alignItems: 'center',
		},
		userTypeSep: {
			width: 0,
			height: 60,
			borderColor: colors.primary,
			borderStyle: 'solid',
			borderLeftWidth: 1,
			marginHorizontal: -10,
		},
		userType: {
			fontSize: 26,
			color: colors.primary,
		},
		userTypeSelected: {
			fontWeight: 'bold',
			textDecorationLine: 'underline',
		},
		input: {
			margin: 10,
			height: 40,
			width: '80%',
		},
		image: {
			width: 40,
			height: 40,
			marginRight: 10,
		},
	});

export default Register;
