import Header from '../components/atoms/Header';
import CreateOffer from '../components/organisms/CreateOffer';



const CreateOfferScreen = ({ navigation, route }) => {
    return (
        <>
            <Header navigation={navigation} />
            <CreateOffer navigation={navigation} />
        </>
    );
};

export default CreateOfferScreen;
