import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import RNRangeSlider from 'rn-range-slider';

const Label = ({ text, ...restProps }) => {
	const styles = StyleSheet.create({
		root: {
			alignItems: 'center',
			padding: 8,
			backgroundColor: '#4499ff',
			borderRadius: 4,
		},
		text: {
			fontSize: 16,
			color: '#fff',
		},
	});
    return (
        <View style={styles.root} {...restProps}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const Notch = (props) => {
    const styles = StyleSheet.create({
        root: {
            width: 8,
            height: 8,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: '#4499ff',
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderTopWidth: 8,
        },
    });
    return <View style={styles.root} {...props} />;
};

const Rail = () => {
    const styles = StyleSheet.create({
        root: {
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: '#7f7f7f',
        }
    });
    return (
        <View style={styles.root}/>
    );
};

const RailSelected = () => {
	const styles = StyleSheet.create({
		root: {
			height: 4,
			backgroundColor: '#4499ff',
			borderRadius: 2,
		},
	});
	return <View style={styles.root} />;
};


const Thumb = () => {
    const THUMB_RADIUS = 12;
    const styles = StyleSheet.create({
        root: {
            width: THUMB_RADIUS * 2,
            height: THUMB_RADIUS * 2,
            borderRadius: THUMB_RADIUS,
            borderWidth: 2,
            borderColor: '#7f7f7f',
            backgroundColor: '#ffffff',
        },
    });
    return <View style={styles.root} />;
};


interface ISliderProps {
	rangeLower: number;
	rangeUpper: number;
	step: number;
	floatingLabel: boolean;
    onChange: (low: number, high: number) => void;
}

const Slider = (props: React.PropsWithChildren<ISliderProps>) => {
	const theme = useTheme();
	const style = styles(theme.colors);

	const { rangeLower, rangeUpper, step, onChange, floatingLabel } = props;

	const [low, setLow] = useState(rangeLower);
	const [high, setHigh] = useState(rangeUpper);
	const [min, setMin] = useState(rangeLower);
	const [max, setMax] = useState(rangeUpper);

	const renderThumb = useCallback(() => <Thumb />, []);
	const renderRail = useCallback(() => <Rail />, []);
	const renderRailSelected = useCallback(() => <RailSelected />, []);
	const renderLabel = useCallback((value) => <Label text={value} />, []);
	const renderNotch = useCallback(() => <Notch />, []);

	return (
		<RNRangeSlider
			style={style.slider}
			min={min}
			max={max}
			step={step}
			disableRange={false}
			floatingLabel={floatingLabel}
			renderThumb={renderThumb}
			renderRail={renderRail}
			renderRailSelected={renderRailSelected}
			renderLabel={renderLabel}
			renderNotch={renderNotch}
			onValueChanged={onChange}
		/>
	);
};

const styles = (colors: MD3Colors) =>
	StyleSheet.create({
		slider: {},
	});

export default Slider;
