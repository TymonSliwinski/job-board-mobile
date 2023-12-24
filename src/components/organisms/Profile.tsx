import * as React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
} from 'react-native';
import { useTheme, Button, Text, List, Portal, Modal } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import ApplicationStatus from '../atoms/ApplicationStatus';
import Auth from '../../api/auth';
import Application from '../../api/application';
import { Storage } from '../../helpers';
import { UserType } from '../../types/User';
import {
	CompanyApplication,
	DeveloperApplication,
	application,
} from '../../types/Application';
import { ApplicationStatus as Status } from '../../types/Application';

const Profile = ({ nagivation }) => {
	const theme = useTheme();
	const style = styles(theme.colors);

	const [newStatus, setNewStatus] = React.useState('');

	const [userType, setUserType] = React.useState('');
	const [applications, setApplications] = React.useState([]);

	const [selectedApplication, setSelectedApplication] = React.useState<application>();

	const [visible, setVisible] = React.useState(false);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	React.useEffect(() => {
		const getUserType = async () => {
			const userType = await Storage.getItem('userType');
			setUserType(userType);
		};
		const getApplications = async () => {
			const applications = await Application.getAll(
				await Storage.getItem('accessToken')
			);
			setApplications(applications);
		};
		getUserType();
		getApplications();
	}, [newStatus]);

	const resolveApplication = async (id: number, status: Status) => {
		const response = await Application.resolveStatus(
			id,
			status,
			await Storage.getItem('accessToken')
		);
		setNewStatus(response);
	};

	return (
		<View style={style.container}>
			<Text variant='headlineMedium'>Applications</Text>
			<View style={style.applicationContainer}>
				{userType === UserType.COMPANY && applications && (
					<>
					<Portal>
						<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={style.modalStyle}>
							<View style={style.infoContainer}>
								<Text variant='headlineMedium'>{selectedApplication?.developer.firstName}{' '}{selectedApplication?.developer.lastName}</Text>
								<Text variant='headlineSmall'>{selectedApplication?.developer.user.email}</Text>
								<Text variant='bodyMedium'>{selectedApplication?.description}</Text>
							</View>
							<View style={style.footer}>
								<Button style={style.button} mode='contained' onPress={() => {resolveApplication(selectedApplication.id, Status.ACCEPTED); hideModal()}}>
									Accept
								</Button>
								<Button style={style.button} mode='contained' onPress={() => {resolveApplication(selectedApplication.id, Status.REJECTED); hideModal()}}>
									Reject
								</Button>
							</View>
						</Modal>
					</Portal>
					<List.AccordionGroup>
							{applications.map((application: CompanyApplication) => {
								return (
									<List.Accordion
										key={application.id}
										title={application.title}
										id={application.id}
										left={() => <Text>({application.Application.length})</Text>}
										>
										{application.Application.map(
											(application: application, index) => (
												<List.Item
													key={index}
													title={
														application.developer.firstName +
														' ' +
														application.developer.lastName}
													description={application.developer.user.email}
													onPress={() => { setSelectedApplication(application); showModal();}}
													left={() => <Text>{new Date(application.createdAt).toLocaleDateString()}</Text>}
													right={() => (
														<ApplicationStatus
															status={application.status} />
													)} />
											)
										)}
									</List.Accordion>
								);
							})}
						</List.AccordionGroup></>
				)}
				{userType === UserType.DEVELOPER && applications && (
					<FlatList
						data={applications}
						renderItem={({ item }) => (
							<List.Item
								title={item.offer.title}
								description={item.offer.company.name}
								onPress={() => {
									nagivation.navigate('Offer', {
										offer: item.offer,
										company: item.offer.company,
									});
								}}
								left={() => (
									<Text>
										{new Date(item.createdAt).toLocaleDateString()}
									</Text>
								)}
								right={() => (
									<ApplicationStatus
										status={item.status}
									/>
								)}
							/>
						)}
						keyExtractor={(application) => `${application.id}`}
					/>
				)}
			</View>
			<View style={style.footer}>
				{userType === UserType.COMPANY && (
					<Button
						mode='contained'
						labelStyle={style.buttonText}
						style={style.button}
						onPress={() => {
							nagivation.replace('CreateOffer');
						}}
					>
						Add Offer
					</Button>
				)}
				<Button
					mode='contained'
					labelStyle={style.buttonText}
					style={style.button}
					onPress={() => {
						Auth.logout();
						Storage.removeItem('accessToken');
						Storage.removeItem('refreshToken');
						nagivation.replace('Home');
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
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: 10,
		},
		modalStyle: {
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: colors.background,
			height: '60%',
			width: '80%',
			alignSelf: 'center',
			alignContent: 'center',
			padding: 10,
		},
		offerContainer: {
			flex: 1,
			flexDirection: 'column',
		},
		applicationContainer: {
			flex: 1,
			flexDirection: 'column',
		},
		infoContainer: {
			flex: 1,
			flexDirection: 'column',
		},
		footer: {
			display: 'flex',
			alignSelf: 'center',
			flexDirection: 'row',
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
