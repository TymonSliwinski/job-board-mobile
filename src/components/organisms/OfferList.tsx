import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import OfferTile from '../molecules/OfferTile';
import { Offer } from '../../types/Offer';
import { Storage } from '../../helpers';
import OffersMap from './Map';

interface IOffersProps {
	offers: Offer[];
	navigation: any;
}

const OfferList = (props: React.PropsWithChildren<IOffersProps>) => {
	const { offers, navigation } = props;
	const [pictures, setPictures] = useState({});
	const [companies, setCompanies] = useState({});
	const [mapVisible, setMapVisible] = useState(false);

	useEffect(() => {
		(async () => {
			const pictures = await Storage.getItem('companyPictures');
			const companies = await Storage.getItem('companies');
			setPictures((oldPictures) => {
				return {
					...oldPictures,
					...pictures,
				};
			});
			setCompanies((oldCompanies) => {
				return {
					...oldCompanies,
					...companies,
				};
			});
		})();
	}, []);
	const theme = useTheme();
	const style = styles(theme.colors);
	return (
		<>
			{offers.length === 0 ? (
				<Text style={style.text}>No offers found</Text>
			) : (
				<>
					<View style={style.main}>
						{mapVisible && (
							<OffersMap navigation={navigation} offers={offers} />
						)}
						<FlatList
							style={style.container}
							data={offers}
							renderItem={({ item }) => (
									<OfferTile
										navigation={navigation}
										offer={item}
										picture={pictures[item.companyId]}
										company={companies[item.companyId]}
									/>
							)}
							keyExtractor={(offer) => `${offer.id}`}
						/>
					</View>
					<Button mode='contained' style={style.button} onPress={() => setMapVisible(!mapVisible)}>{ mapVisible ? 'List' : 'Map'}</Button>
				</>
			)}
		</>
	);
};

const styles = (colors: MD3Colors) =>
	StyleSheet.create({
		main: {
			flex: 1,
		},
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		button: {
			position: 'absolute',
			bottom: 0,
            borderWidth: 3,
            borderRadius: 50,
            borderColor: colors.primary,
			padding: 2.5,
            margin: 10,
			width: '25%',
			alignSelf: 'center',
		},
		text: {
			color: colors.primary,
			marginTop: 20,
			fontFamily: 'Montserrat',
			fontSize: 24,
			textAlign: 'center',
		},
	});

export default OfferList;
