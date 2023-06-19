import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import OfferTile from '../molecules/OfferTile';
import { Offer } from '../../types/Offer';
import { Storage } from '../../helpers';

interface IOffersProps {
	offers: Offer[];
	navigation: any;
}

const OfferList = (props: React.PropsWithChildren<IOffersProps>) => {
	const { offers, navigation } = props;
	const [pictures, setPictures] = useState({});
	const [companies, setCompanies] = useState({});

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
				<FlatList
					style={style.container}
					data={offers}
					renderItem={({ item }) => (
							<OfferTile
								navigation={navigation}
								offer={item}
								pictures={pictures}
								company={companies[item.companyId]}
							/>
					)}
					keyExtractor={(offer) => `${offer.id}`}
				/>
			)}
		</>
	);
};

const styles = (colors: MD3Colors) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
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
