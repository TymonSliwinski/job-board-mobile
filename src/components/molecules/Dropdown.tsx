import { View } from 'react-native';
import React from 'react';
import { Button, Menu, TextInput} from 'react-native-paper';

interface IDropdownProps {
    options: any[];
    label: string;
    onSelect: (option: any) => void;
    style?: any;
}

const Dropdown = (props: React.PropsWithChildren<IDropdownProps>) => {
    const { options, label, onSelect, style } = props;

	const [visible, setVisible] = React.useState(false);
    const [option, setOption] = React.useState();

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	const handleItemSelect = (option) => {
        setOption(option);
		onSelect(option);
		closeMenu();
	};

	return (
            <View style={style}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Select</Button>}
                >
                    {
                        options.map((option) => (
                            <Menu.Item
                                key={option}
                                onPress={() => handleItemSelect(option)}
                                title={option}
                            />
                        )
                    )}
                </Menu>
                <TextInput
                    style={{ margin: 8, flex: 1 }}
                    label={label}
                    value={option}
                    editable={false}
                    />
            </View>
	);
};

export default Dropdown;
