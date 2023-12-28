import React from 'react';
import { StyleSheet, View, Alert, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import TextInput from '../atoms/TextInput';
import { Category, CreateOfferDto, Requirement } from '../../types/Offer';
import Offers from '../../api/offers';
import { Storage } from '../../helpers';
import Dropdown from '../molecules/Dropdown';
import { geocodeAddress } from '../../api/geocode';



const CreateOffer = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme.colors);

	const [inputs, setInputs] = React.useState({
		title: '',
		description: '',
		category: null,
		location: '',
	});
	
	const handleChange = (name: string, text: string) =>
		setInputs((prevState) => ({
			...prevState,
			[name]: text,
		}));

	const [requirementsInputs, setRequirementsInputs] = React.useState([{ key: '', value: 1 }]);

	const handleAddRequirement = () => {
		const newInput = { key: '', value: 1 };
		setRequirementsInputs([...requirementsInputs, newInput]);
	};

	const handleRequirementInputChange = (text: string, index: number, type: string) => {
		const newInputs = [...requirementsInputs];
		if (type === 'key') {
			newInputs[index].key = text;
		} else {
			newInputs[index].value = parseInt(text);
		}
		setRequirementsInputs(newInputs);
	};
	

	const incrementValue = (index: number) => {
		const newInputs = [...requirementsInputs];
		const value = newInputs[index].value;
		if (value < 5) {
			newInputs[index].value = value + 1;
			setRequirementsInputs(newInputs);
		}
	};

	const decrementValue = (index: number) => {
		const newInputs = [...requirementsInputs];
		const value = newInputs[index].value;
		if (value > 1) {
			newInputs[index].value = value - 1;
			setRequirementsInputs(newInputs);
		}
	};

	const generateJSON = () => {
		const jsonResult = {};
		requirementsInputs.forEach((input) => {
			if (input.key.trim() !== '' && !isNaN(input.value) && input.value >= 1 && input.value <= 5) {
				jsonResult[input.key.trim()] = input.value;
			}
		});
		return jsonResult;
	};

	const handleCreateOffer = async () => {
		const requirementsJson = generateJSON();
		const data: CreateOfferDto = {
			...inputs,
			requirements: requirementsJson,
			latitude: 0,
			longitude: 0,
		};
		if (
			!data.title ||
			!data.description ||
			!data.category ||
			!data.location ||
			!data.requirements
		) {
			Alert.alert('Error', 'Please fill all fields');
			return;
		}

		if (
			data.salaryLower && !isNaN(data.salaryLower) && data.salaryLower < 0 ||
			data.salaryUpper && !isNaN(data.salaryUpper) && data.salaryUpper < 0 ||
			data.salaryLower && data.salaryUpper && !isNaN(data.salaryLower) && !isNaN(data.salaryUpper) && data.salaryLower > data.salaryUpper
		) {
			Alert.alert('Error', 'Invalid salary');
			return;
		}

		if (data.salaryLower) {
			data.salaryLower = Number(data.salaryLower);
		} else {
			data.salaryLower = null;
		}

		if (data.salaryUpper) {
			data.salaryUpper = Number(data.salaryUpper);
		} else {
			data.salaryUpper = null;
		}

		const { latitude, longitude } = await geocodeAddress(data.location);

		data['latitude'] = latitude;
		data['longitude'] = longitude;

		try {
			await Offers.create(data, await Storage.getItem('accessToken')
			);
			Alert.alert('Success', 'Offer posted successfuly', [
				{
					text: 'OK',
					onPress: () => navigation.replace('Profile'),
				},
			]);
		} catch (err) {
			console.log(err);
			// Alert.alert('Error', err);
		}
	};
	return (
		<KeyboardAvoidingView style={style.container}>
			<ScrollView contentContainerStyle={style.inputContainer}>
				<TextInput
					placeholder='title'
					value={inputs['title'] || ''}
					onChangeText={(text) => handleChange('title', text)}
					style={style.input}
				/>
				<TextInput
					placeholder='description'
					multiline={true}
					numberOfLines={4}
					value={inputs['description'] || ''}
					onChangeText={(text) => handleChange('description', text)}
					style={style.input}
				/>
				<Dropdown 
					style={style.inputDropdown}
					options={Object.values(Category)}
					onSelect={(category) => handleChange('category', category)}
					label='Select category'
				/>
				<Text>Requirements</Text>
				<ScrollView
					style={style.inputRequirementsContainer}
				>
					{requirementsInputs.map((input, index) => (
						<View
							key={`input-${index}`}
							style={style.inputRequirementsRow}
						>
							<TextInput
							value={input.key}
							onChangeText={(text) => handleRequirementInputChange(text, index, 'key')}
							placeholder={'Requirement'}
							style={style.inputRequirementsText}
							/>
							<View style={style.inputRequirementsValue}>
								<Button onPress={() => decrementValue(index)}>-</Button>
								<Text>{input.value}</Text>
								<Button onPress={() => incrementValue(index)}>+</Button>
							</View>
						</View>
						))}
					<Button
						mode='contained'
						onPress={handleAddRequirement}
						labelStyle={style.buttonText}
						style={style.buttonAddRequirement}
					>
						+
					</Button>
				</ScrollView>
				<TextInput
					placeholder='location'
					value={inputs['location'] || ''}
					onChangeText={(text) => handleChange('location', text)}
					style={style.input}
				/>
				<TextInput
					placeholder='Salary Lower'
					value={inputs['salaryLower'] || ''}
					onChangeText={(text) => handleChange('salaryLower', text)}
					style={style.input}
					inputMode='numeric'
				/>
				<TextInput
					placeholder='Salary Upper'
					value={inputs['salaryUpper'] || ''}
					onChangeText={(text) => handleChange('salaryUpper', text)}
					style={style.input}
					inputMode='numeric'
				/>
				<Button
					mode='contained'
					onPress={handleCreateOffer}
					labelStyle={style.buttonText}
					style={style.button}
				>
					Create Offer
				</Button>
			</ScrollView>
		</KeyboardAvoidingView>
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
		buttonAddRequirement: {
			borderWidth: 3,
			borderRadius: 50,
			borderColor: colors.primary,
			padding: 2.5,
			margin: 10,
			alignSelf: 'center',
		},
		inputContainer: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		inputRequirementsContainer: {
			width: '80%',
			flexDirection: 'column',
			minHeight: 120,
			maxHeight: 200,
		},
		inputRequirementsRow: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginVertical: 5,
		},
		inputRequirementsText: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
		},
		inputRequirementsValue: {
			width: 'auto',
			flexDirection: 'row',
			alignItems: 'center',
		},
		input: {
			margin: 10,
			height: 40,
			width: '80%',
		},
		inputDropdown: {
			alignItems: 'center',
			width: '85%',
			flexDirection: 'row',
		},
	});

export default CreateOffer;
