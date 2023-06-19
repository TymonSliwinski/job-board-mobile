import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from '../screens/ProfileScreen';
import OfferScreen from "../screens/OfferScreen";
import ApplyScreen from '../screens/ApplyScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name='Offer' component={OfferScreen} />
                <Stack.Screen name='Apply' component={ApplyScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Navigation;