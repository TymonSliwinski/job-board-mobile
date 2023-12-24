import { View } from 'react-native';
import React from 'react';
import { Button, Menu, TextInput} from 'react-native-paper';

interface IDropdownProps {
    value?: any;
    options: any[];
    label: string;
    onSelect: (option: any) => void;
    style?: any;
}

const Dropdown = (props: React.PropsWithChildren<IDropdownProps>) => {
    const { value, options, label, onSelect, style } = props;

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
                <TextInput
                    style={{ margin: 8, flex: 1 }}
                    label={label}
                    value={option || value}
                    editable={false}
                    />
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
            </View>
	);
};

export default Dropdown;
