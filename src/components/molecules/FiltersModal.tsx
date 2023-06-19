import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Button, Modal, Portal } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { Filters } from '../../types/Offer';

interface IFiltersProps {
    setFilters: Function;
    modalVisible: boolean;
    setModalVisible: Function;
}

const FiltersModal = (props: React.PropsWithChildren<IFiltersProps>) => {
    const { setFilters, modalVisible, setModalVisible } = props;


    const theme = useTheme();
    const style = styles(theme.colors);

    return (
        <Portal>
            <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(!modalVisible)}
            contentContainerStyle={style.container}
            >
            <View style={style.filtersContainer}>
                <Text style={style.title}>Some Filter</Text>
            </View>
            <View style={style.buttonsContainer}>
                <Button contentStyle={{width: 100}} buttonColor={theme.colors.primary} mode={'contained'} onPress={() => setModalVisible(!modalVisible)}>
                    OK
                </Button>
                <Button contentStyle={{width: 100}} buttonColor={theme.colors.primary} mode={'contained'} onPress={() => setModalVisible(!modalVisible)}>
                    RESET
                </Button>
            </View>
            </Modal>
        </Portal>
    )
}

const styles = (colors: MD3Colors) => StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
        height: '60%',
        width: '80%',
        alignSelf: 'center',
        alignContent: 'center'
    },
    filtersContainer: {
        flex: 1,
        borderWidth: 2,
        padding: 15,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // height: 40,
        // marginVertical: 15,
        paddingVertical: 15,
        borderWidth: 2,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat',
    }
})

export default FiltersModal;