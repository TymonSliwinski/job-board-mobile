import Header from '../components/atoms/Header';
import OfferDetails from '../components/organisms/OfferDetails';



const OfferScreen = ({ navigation, route }) => {
    const { offer, picture, company } = route.params;
    return (
        <>
            <Header navigation={navigation} />
            <OfferDetails navigation={navigation} offer={offer} picture={picture} company={company} />
        </>
    );
};

export default OfferScreen;
