import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { Offer } from '../../types/Offer';
import Requirements from '../atoms/Requirements';
import { Storage, parseSalary } from '../../helpers';
import { Company, UserType } from '../../types/User';
import Offers from '../../api/offers';

interface IOffer {
    navigation: any;
	offer: Offer;
}

const OfferDetails = (props: React.PropsWithChildren<IOffer>) => {
	const { navigation, offer } = props;
	
	const [company, setCompany] = useState<Company>();
	const [picture, setPicture] = useState('data:image/jpeg;base64,');
	const [userType, setUserType] = useState('');

	useEffect(() => {
		(async () => {
			const companies = await Storage.getItem('companies');
			setCompany(companies[offer.companyId]);

			const pictures = await Storage.getItem('companyPictures');
			let picture = pictures[offer.companyId];
			if (!picture.includes('data:image/jpeg;base64,')) {
				picture = `data:image/jpeg;base64,${picture}`;
			}
			setPicture(picture);
			
			const userType = await Storage.getItem('userType');
			setUserType(userType);
		})();
	}, []);

	const theme = useTheme();
	const style = styles(theme.colors);

	return (
		<View style={style.container}>
			<View style={style.header}>
				<Image style={style.image} source={{ uri: picture }} />
				<View style={style.titleContainer}>
					<Text style={style.title}>{offer.title}</Text>
					<Text style={style.companyName}>{company?.name}</Text>
					<Text style={style.location}>{offer.location}</Text>
					<Text style={style.salary}>{parseSalary(offer.salaryLower, offer.salaryUpper)}</Text>
				</View>
			</View>
			<View style={style.separator} />
			<View style={style.body}>
				<Requirements requirements={offer.requirements} />
				<Text style={style.descriptionTitle}>Description</Text>
				<View style={style.separator} />
				<ScrollView scrollEnabled={true}>
					<Text style={style.description}>{offer.description}</Text>
				</ScrollView>
			</View>
			<View style={style.footer}>
				{
					userType === UserType.DEVELOPER &&
                    <Button
                        mode='contained'
                        style={style.button}
                        labelStyle={style.buttonText}
                        onPress={() => navigation.navigate('Apply', { offer })}
                    >
                        Apply
                    </Button>
				}
				{
					userType === UserType.COMPANY && offer.companyId === company.id &&
					<Button
						mode='contained'
						style={style.button}
						labelStyle={style.buttonText}
						onPress={async () => { await Offers.delete(offer.id, await Storage.getItem('accessToken')); navigation.navigate('Home'); } }
					>
						Delete Offer
					</Button>
				}
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
		},
		header: {
			display: 'flex',
			flexDirection: 'row',
			margin: 10,
		},
		image: {
			height: 100,
			width: 100,
			margin: 10,
		},
		titleContainer: {
			flex: 1,
			flexDirection: 'column',
			paddingHorizontal: 10,
			justifyContent: 'space-between',
		},
		title: {
			color: colors.primary,
			fontFamily: 'Montserrat-Bold',
			fontSize: 24,
		},
		companyName: {
			color: colors.primary,
			fontSize: 18,
		},
		location: {
			color: colors.backdrop,
			fontSize: 18,
		},
		salary: {
			color: '#72CA49',
			fontFamily: 'Montserrat',
			fontSize: 14,
		},
		separator: {
			borderBottomColor: colors.backdrop,
			borderBottomWidth: 1,
			margin: 10,
		},
		descriptionTitle: {
			color: colors.primary,
			fontFamily: 'Montserrat-Bold',
			fontSize: 18,
			textAlign: 'center',
			marginTop: 10,
		},
		// descriptionContainer: {
		//     flex: 1,
		//     flexDirection: 'column',
		// },
		description: {
			fontFamily: 'Montserrat',
			fontSize: 14,
			margin: 10,
		},
		body: {
			flex: 1,
			margin: 10,
		},
		footer: {
			margin: 10,
		},
		button: {
			color: colors.tertiary,
			width: '60%',
			alignSelf: 'center',
			margin: 10,
		},
		buttonText: {
			fontSize: 18,
			fontFamily: 'Montserrat-Bold',
			padding: 5,
		},
	});

export default OfferDetails;
