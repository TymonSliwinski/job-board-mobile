import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/src/types";

const Header = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme.colors);
	return (
        <View style={style.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                >
            <Text style={[theme.fonts.default, style.headingText]}>
                Job {"\n"}board
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ margin: 9 }}
                onPress={() => navigation.navigate('Profile')}
                >
                <Image
                    source={require("../../assets/icons/user.png")}
                    style={style.iconStyle}
                />
            </TouchableOpacity>
        </View>
	);
};

const styles = (colors: MD3Colors) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: "row",
			justifyContent: "space-between",
			height: 60,
			backgroundColor: colors.primary,
		},
		headingText: {
			fontFamily: "Montserrat-Bold",
			fontSize: 30,
			color: colors.tertiary,
			lineHeight: 24,
			paddingTop: 12,
			paddingLeft: 8,
		},
		iconStyle: {
			width: 40,
			height: 35,
			tintColor: colors.secondary,
		},
	});

export default Header;
