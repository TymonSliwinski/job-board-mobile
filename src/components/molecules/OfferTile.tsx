import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/src/types";
import { Offer } from "../../types/Offer";

interface IOffer {
    offer: Offer;
    navigation: any;
    pictures: object;
    company: any;
}

const parseSalary = (salaryLower: number, salaryUpper: number): string => {
    if (salaryLower || salaryUpper) {
        if (salaryLower && !salaryUpper) {
            return `From ${salaryLower}`;
        } else if (!salaryLower && salaryUpper) {
            return `Up to ${salaryUpper}`;
        }
        return `${salaryLower} - ${salaryUpper}`;
    }
    return 'Salary undisclosed';
};

const OfferTile = (props: React.PropsWithChildren<IOffer>) => {
    const { offer, navigation, pictures, company } = props;

    const theme = useTheme();
    const style = styles(theme.colors);
    const salaryString = parseSalary(offer.salaryLower, offer.salaryUpper);
    return (
        <TouchableOpacity style={style.container}
            onPress={() => navigation.navigate('Offer', { offer, picture: pictures[offer.companyId], company, salaryString })}
            >
            <Image
                style={style.image}
                source={{ uri: (!pictures[offer.companyId].includes('data:image/jpeg;base64,') ? `data:image/jpeg;base64,${pictures[offer.companyId]}` : pictures[offer.companyId]) }}
            />
            <View style={style.infoContainer}>
                <Text style={style.title}>{offer.title}</Text>
                <Text style={style.salary}>{salaryString}</Text>
                <Text style={style.location}>{company.name} - {offer.location}</Text>
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
        height: 60,
        width: 60,
        margin: 10,
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

