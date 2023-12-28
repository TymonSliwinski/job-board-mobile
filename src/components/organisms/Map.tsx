import MapView, { Marker } from 'react-native-maps';
import { Offer } from '../../types/Offer';


interface IOffersMap {
    navigation: any;
    offers: Offer[];
}

const OffersMap = (props: React.PropsWithChildren<IOffersMap>) => {
    const { navigation, offers } = props;

    return (
        <MapView
            style={{ width: '100%', height: '100%' }}
            // initialRegion={{
            //     latitude: 52.237049,
            //     longitude: 21.017532,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            // }}
        >
            {offers.map((offer) => (
                <Marker
                    key={offer.id}
                    coordinate={{
                        latitude: offer.latitude,
                        longitude: offer.longitude,
                    }}
                    title={offer.title}
                    description={offer.description}
                    onCalloutPress={ () => navigation.navigate('Offer', { offer }) }
                />
            ))}
        </MapView>
    );
};

export default OffersMap;
