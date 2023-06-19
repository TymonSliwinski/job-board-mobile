import { View, StyleSheet, TextInput as RNTextInput } from "react-native";
import { useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/src/types";

interface ITextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    style?: any;
}

const TextInput = (props: React.PropsWithChildren<ITextInputProps>) => {
    const { placeholder, value, onChangeText, secureTextEntry, style } = props;
    const theme = useTheme();
    const styles = getStyles(theme.colors);

    return (
        <RNTextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    );
};

const getStyles = (colors: MD3Colors) => StyleSheet.create({
    input: {
        color: colors.primary,
        fontFamily: "Montserrat",
        fontSize: 24,
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        height: 24,
    },
});

export default TextInput;
