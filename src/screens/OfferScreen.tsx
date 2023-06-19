import Header from '../components/atoms/Header';
import OfferDetails from '../components/organisms/OfferDetails';



const OfferScreen = ({ navigation, route }) => {
    const { offer, picture, company, salaryString } = route.params;
    return (
        <>
            <Header navigation={navigation} />
            <OfferDetails navigation={navigation} offer={offer} picture={picture} company={company} salaryString={salaryString} />
        </>
    );
};

export default OfferScreen;
