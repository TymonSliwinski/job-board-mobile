import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font/build/FontHooks';
import * as SplashScreen from 'expo-splash-screen';
import DefaultTheme from './src/constants/theme';
import Navigation from './src/navigation/Tabs';
import { Storage, getCompaniesById, getCompanyPictures } from './src/helpers';

export default function App() {
	const [fontsLoaded] = useFonts({
		Montserrat: require('./src/assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
	});

	React.useEffect(() => {
		const loadData = async () => {
			await Storage.setItem(
				'companyPictures',
				await getCompanyPictures()
			);
			await Storage.setItem('companies', await getCompaniesById());
		};

		SplashScreen.preventAutoHideAsync();

		loadData().then(() => {
			SplashScreen.hideAsync();
		});
	}, []);

	if (!fontsLoaded) {
		return null;
	}

	const theme = {
		...DefaultTheme,
		fonts: configureFonts({ config: { fontFamily: 'Montserrat' } }),
	};

	return (
		<SafeAreaProvider>
			<PaperProvider theme={theme}>
				<StatusBar style="light" translucent={false} />
				<Navigation />
			</PaperProvider>
		</SafeAreaProvider>
	);
}
