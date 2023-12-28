import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/src/types";
import { Offer } from "../../types/Offer";
import { parseSalary } from '../../helpers';

interface IOffer {
    offer: Offer;
    navigation: any;
    picture: string;
    company: any;
}

const OfferTile = (props: React.PropsWithChildren<IOffer>) => {
    const { offer, navigation, picture, company } = props;

    const theme = useTheme();
    const style = styles(theme.colors);
    const salaryString = parseSalary(offer.salaryLower, offer.salaryUpper);


    const uri = !picture?.includes('data:image/jpeg;base64,') ? `data:image/jpeg;base64,${picture}` : picture;
    return (
        <TouchableOpacity style={style.container}
            onPress={() => navigation.navigate('Offer', { offer })}
            >
            <Image
                style={style.image}
                source={{ uri: uri }}
            />
            <View style={style.infoContainer}>
                <Text style={style.title}>{offer.title}</Text>
                <Text style={style.salary}>{salaryString}</Text>
                <Text style={style.location}>{company?.name} - {offer.location}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = (colors: MD3Colors) => StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        elevation: 30,
        flexDirection: 'row',
        height: 94,
        marginVertical: 5,
        marginHorizontal: 6,
        paddingVertical: 7,
        paddingHorizontal: 11,
        shadowColor: '#202020',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    image: {
        height: 70,
        width: 70,
        margin: 5,
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 20,
        maxWidth: 250,
        maxHeight: 30,
        // marginVertical: 5,
    },
    salary: {
        color: '#72CA49',
        fontFamily: 'Montserrat',
        fontSize: 14,
    },
    location: {
        color: colors.secondary,
        fontFamily: 'Montserrat',
        fontSize: 14,
        // marginVertical: 5,
    },
});

export default OfferTile;

