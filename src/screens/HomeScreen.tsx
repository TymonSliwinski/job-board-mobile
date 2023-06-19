import { useEffect, useState } from 'react';
import Searchbar from '../components/molecules/Searchbar'
import Header from "../components/atoms/Header";
import OfferList from '../components/organisms/OfferList';
import Offers from '../api/offers';


const HomeScreen = ({ navigation }) => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        (async () => {
            setOffers(await Offers.getAll());
        })();
    }, []);
    return (
        <>
            <Header navigation={navigation} />
            <Searchbar setOffers={setOffers} />
            <OfferList navigation={navigation} offers={offers}/>
        </>
    );
};

export default HomeScreen;
