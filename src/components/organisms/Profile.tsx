import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/src/types";
import Auth from "../../api/auth";
import { Storage } from "../../helpers";
import Application from '../../api/application';
import { UserType } from '../../types/User';
import { CompanyApplication, DeveloperApplication, application } from '../../types/Application';

const Profile = ({ nagivation }) => {
	const theme = useTheme();
	const style = styles(theme.colors);

    const [userType, setUserType] = React.useState('');
	const [applications, setApplications] = React.useState([]);
    React.useEffect(() => {
        const getUserType = async () => {
            const userType = await Storage.getItem('userType');
            setUserType(userType);

        }
		const getApplications = async () => {
			const applications = await Application.getAll(await Storage.getItem('accessToken'));
			setApplications(applications);
		}
        getUserType();
		getApplications();
    }, []);

	const listCompanyApplications = (applications: application[]) => applications.map(application => {
		return (
			<View style={style.applicationContainer}>
			<View style={style.infoContainer}>
				<Text>{application.developer.firstName} {application.developer.lastName}</Text>
				<Text>{application.developer.user.email}</Text>
			</View>
			<View style={style.resolveButton}>
				<Text>X</Text>
				<Text>Y</Text>
			</View>
			</View>
		)
	});

	return (
		<View style={style.container}>
			<Text>Profile</Text>
			<ScrollView>
				{
					userType === UserType.COMPANY &&
					applications && applications.map((application: CompanyApplication) => {
						return (
							<View style={style.offerContainer}>
								<Text>{application.offerTitle}</Text>
								{/* {listCompanyApplications(application.applications)} */}
							</View>
						)
					})
				}
				{
					userType === UserType.DEVELOPER &&
					applications.map((application: DeveloperApplication) => {
						return (
							<View style={style.applicationContainer}>
								<Text>{application.offer.title} @ {application.offer.company.name}</Text>
								<Text>{application.status}</Text>
							</View>
						)
					})
				}
			</ScrollView>

			<View style={style.footer}>
				<Button
					mode="contained"
					labelStyle={style.buttonText}
					style={style.button}
					onPress={() => {
						Auth.logout();
						Storage.removeItem('accessToken');
						Storage.removeItem('refreshToken');
						nagivation.replace("Home");
					}}
				>
					Logout
				</Button>
			</View>
		</View>
	);
};

const styles = (colors: MD3Colors) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background,
			flex: 1,
			flexDirection: "column",
			justifyContent: "center",
			padding: 10,
		},
		offerContainer: {
			flex: 1,
			flexDirection: 'column'
		},
		applicationContainer: {
			flex: 1,
			flexDirection: 'row',
		},
		infoContainer: {
			flex: 1,
			flexDirection: 'column',
		},
		resolveButton: {
			flex: 1,
			flexDirection: 'row'
		},
		footer: {
			display: "flex",
			alignSelf: 'flex-end',
		},
		button: {
			borderWidth: 3,
			borderRadius: 50,
			borderColor: colors.primary,
			padding: 2.5,
			margin: 10,
		},
		buttonText: {
			fontSize: 20,
		},
	});

export default Profile;
