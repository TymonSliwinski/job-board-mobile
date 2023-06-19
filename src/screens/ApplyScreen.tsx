import Header from '../components/atoms/Header';
import Apply from '../components/organisms/Apply';

const ApplyScreen = ({ navigation, route }) => {
    const { offer } = route.params;
    return (
        <>
            <Header navigation={navigation} />
            <Apply navigation={navigation} offer={offer} />
        </>
    );
}

export default ApplyScreen;
