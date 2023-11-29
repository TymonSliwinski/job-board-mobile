import { StyleSheet, View, Text } from 'react-native';
import { ApplicationStatus as Status } from '../../types/Application';
import { useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';

interface IApplicationStatusProps {
    status: Status;
}

const ApplicationStatus = (props: React.PropsWithChildren<IApplicationStatusProps>) => {

    const theme = useTheme();
    const style = styles(theme.colors);

    let color: string;

    switch (props.status) {
        case Status.ACCEPTED:
            color = 'green';
            break;
        case Status.REJECTED:
            color = 'red';
            break;
        case Status.PENDING:
            color = 'orange';
            break;
    }

    return (
        <View style={style.container}>
            <Text style={{...style.text, color }}>{props.status}</Text>
        </View>
    );
}

const styles = (colors: MD3Colors) => StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    text: {
        fontFamily: "Montserrat",
        fontSize: 20,
    },
});

export default ApplicationStatus;
