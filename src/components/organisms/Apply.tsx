import * as React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import Application from '../../api/application';
import { Storage } from '../../helpers';
import { Offer } from '../../types/Offer';

interface IApply {
    navigation: any;
    offer: Offer;
}


const Apply = (props: React.PropsWithChildren<IApply>) => {
    const { navigation, offer } = props;
    
    const theme = useTheme();
    const style = styles(theme.colors);
    
    const [text, setText] = React.useState('');

    const handleApply = async (offerId: number, text: string) => {
        const accessToken = await Storage.getItem('accessToken');
    
        const response = await Application.apply(offerId, text, accessToken);
        let title: string, message: string;
        if (response === true) {
            title = 'Success';
            message = 'You have successfully applied for this offer';
        } else {
            title = 'Error';
            message = response;
        }
        Alert.alert(title, message, [
            {
                text: 'OK',
                onPress: () => {
                    navigation.goBack();
                },
            },
        ],
        { cancelable: false }
        );
    };
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.title}>You are applying for</Text>
                <Text style={style.subTitle}>{offer.title}</Text>
            </View>
            <View style={style.body}>
                <Text>Write a short message to the employer</Text>
                <View style={style.separator} />
                <TextInput
                    label="Message"
                    value={text}
                    onChangeText={setText}
                    style={style.input}
                    multiline={true}
                />
            </View>
            <View style={style.separator} />
            <View style={style.footer}>

                <Button
                    mode="contained"
                    labelStyle={style.buttonText}
                    style={style.button}
                    onPress={() => {
                        handleApply(offer.id, text);
                    }}
                >
                    Apply
                </Button>
            </View>
        </View>
    );
};

const styles = (colors: MD3Colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        alignItems: 'center',
        margin: 10,
        padding: 10,
    },
    title: {
        fontSize: 18,
    },
    subTitle: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
    },
    separator: {
        borderBottomColor: colors.backdrop,
        borderBottomWidth: 1,
        margin: 10,
    },
    body: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
    },
    footer: {
        margin: 10,
    },
    button: {
        color: colors.tertiary,
        width: '60%',
        alignSelf: 'center',
        margin: 10,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        padding: 5,
    },
    input: {
        margin: 10,
    },

});

export default Apply;
