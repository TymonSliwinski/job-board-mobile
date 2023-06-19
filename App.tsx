import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font/build/FontHooks';
import AppLoading from 'expo-app-loading';
import theme from './src/constants/theme';
import Navigation from './src/navigation/Tabs';
import { Storage, getCompaniesById, getCompanyPictures } from './src/helpers';

export default function App() {
	let [fontsLoaded] = useFonts({
		Montserrat: require('./src/assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
	});
	React.useEffect(() => {
		(async () => {
			await Storage.setItem('companyPictures', await getCompanyPictures());
			await Storage.setItem('companies', await getCompaniesById());
		})();
	}, []);
	if (!fontsLoaded) {
		return <AppLoading />;
	}
	theme.fonts = configureFonts({ config: { fontFamily: 'Montserrat' } });

	return (
		<SafeAreaProvider>
			<PaperProvider theme={theme}>
				<StatusBar style="light" translucent={false} />
				<Navigation />
			</PaperProvider>
		</SafeAreaProvider>
	);
}
