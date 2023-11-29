import { StyleSheet, TextInput as RNTextInput, InputModeOptions } from "react-native";
import { useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/src/types";


interface ITextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    style?: any;
    multiline?: boolean;
    numberOfLines?: number;
    editable?: boolean;
    inputMode?: InputModeOptions;
}

const TextInput = (props: React.PropsWithChildren<ITextInputProps>) => {
    const { placeholder, value, onChangeText, secureTextEntry, style, multiline, numberOfLines, editable, inputMode } = props;
    const theme = useTheme();
    const styles = getStyles(theme.colors);

    return (
        <RNTextInput
            style={[styles.input, style, multiline ? { height: 100 } : {}]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={editable}
            inputMode={inputMode ?? 'text'}
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
