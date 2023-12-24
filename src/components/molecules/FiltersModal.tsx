import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Text, Button, Modal, Portal, TextInput } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { Filters, Category } from '../../types/Offer';
import Dropdown from './Dropdown';
import Slider from '../atoms/Slider';

interface IFiltersProps {
    filters: Filters;
    setFilters: Function;
    modalVisible: boolean;
    setModalVisible: Function;
    search: Function;
}

const FiltersModal = (props: React.PropsWithChildren<IFiltersProps>) => {
    const { filters, setFilters, modalVisible, setModalVisible, search } = props;


    const theme = useTheme();
    const style = styles(theme.colors);

    const onSalaryChange = useCallback((low: number, high: number) => {
        handleChange('salaryLower', low);
        handleChange('salaryUpper', high);
    }, [])

    const handleChange = (name: string, value: any) =>
        setFilters((prevState: Filters) => ({
            ...prevState,
            [name]: value,
        }));

    const handleReset = async () => {
        setFilters({});
        setModalVisible(!modalVisible);
        await search({});
    }

    const handleOK = async () => {
        setFilters((prevState: Filters) => {
            return prevState;
        })
        setModalVisible(!modalVisible);
        await search(filters)
    }

    return (
        <Portal>
            <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(!modalVisible)}
            contentContainerStyle={style.container}
            >
            <Text variant='headlineMedium'>Filters</Text>
            <ScrollView style={style.filtersContainer} >
                <View style={style.filter}>
                    <Text variant='titleMedium'>Category</Text>
                    <Dropdown 
                        style={style.inputDropdown}
                        options={Object.values(Category)}
                        value={filters['category'] || ''}
                        onSelect={(category) => handleChange('category', category)}
                        label='Select category'
                    />
                </View>
                <View style={style.filter}>
                    <Text variant='titleMedium'>Salary range</Text>
                    <Slider
                        rangeLower={0}
                        rangeUpper={100000}
                        step={500}
                        floatingLabel={true}
                        onChange={onSalaryChange}
                    />
                    <View style={style.sliderLabelsContainer}>
                        <Text>{0}</Text>
                        <Text>{100000}</Text>
                    </View>
                </View>
                <View style={style.filter}>
                    <Text variant='titleMedium'>Location</Text>
                    <TextInput
                        placeholder='Location'
                        value={filters['location'] || ''}
                        onChangeText={(text) => handleChange('location', text)}
                    />
                </View>
                <View style={style.filter}>
                    <Text variant='titleMedium'>Tech stack</Text>
                    <TextInput
                        placeholder='Tech stack'
                        value={filters['requirements'] || ''}
                        onChangeText={(text) => handleChange('requirements', text)}
                    />
                </View>
            </ScrollView>
            <View style={style.buttonsContainer}>
                <Button contentStyle={{width: 100}} buttonColor={theme.colors.primary} mode={'contained'} onPress={handleReset}>
                    Reset
                </Button>
                <Button contentStyle={{width: 100}} buttonColor={theme.colors.primary} mode={'contained'} onPress={handleOK}>
                    OK
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
        alignContent: 'center',
        padding: 10,
    },
    filtersContainer: {
        flex: 1,
        padding: 5,
    },
    filter: {
        marginVertical: 5,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    sliderLabelsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputDropdown: {
        alignItems: 'center',
        flexDirection: 'row',
    },
})

export default FiltersModal;