import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Keyboard, TextInput } from "react-native";
import { useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/src/types";
import FiltersModal from "./FiltersModal";
import Offers from "../../api/offers";
import { Filters } from "../../types/Offer";

const search = async (filters: Filters) => {
	try {
		return await Offers.getAll(filters);
	} catch (err) {
		return [];
	}
}

interface ISearchbarProps {
    setOffers: Function;
}

const Searchbar = (props: React.PropsWithChildren<ISearchbarProps>) => {
    const { setOffers } = props;

	const theme = useTheme();
	const style = styles(theme.colors);

	const [text, onChangeText] = React.useState("");
	const [filters, setFilters] = React.useState({});
	const [modalVisible, setModalVisible] = React.useState(false);

	return (
		<View style={style.container}>
			<FiltersModal setFilters={setFilters} modalVisible={modalVisible} setModalVisible={setModalVisible} />
			<View style={style.inputContainer}>
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Image
                        source={require("../../assets/icons/filter.png")}
                        style={style.icon}
                    />
                </TouchableOpacity>
				<TextInput
					placeholder="Search"
					style={[style.input, theme.fonts.titleLarge]}
					onChangeText={onChangeText}
				/>
                <TouchableOpacity
                    onPress={async () => { setOffers(await search({ text })); Keyboard.dismiss() }}
                    >
                    <Image
                        source={require("../../assets/icons/magnifying-glass.png")}
                        style={style.iconGlass}
                    />
                </TouchableOpacity>
			</View>
		</View>
	);
};

const styles = (colors: MD3Colors) =>
	StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: "row",
			height: 60,
			justifyContent: "space-around",
			backgroundColor: colors.primary,
			alignItems: "center",
		},
		inputContainer: {
			backgroundColor: '#FFFFFF',
			display: "flex",
			flexDirection: "row",
			height: "80%",
			alignItems: "center",
			width: "95%",
		},
		input: {
			backgroundColor: '#FFFFFF',
			height: "100%",
			flexGrow: 1,
		},
		icon: {
			height: 30,
			marginHorizontal: 5,
			width: 40,
		},
		iconGlass: {
			height: 35,
			width: 35,
			marginHorizontal: 10,
		},
	});

export default Searchbar;
