import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { experience } from "../../constants/filtersValues";

type Level = "1" | "2" | "3" | "4" | "5";

interface IRequirement {
	skill: string;
	level: Level;
}

interface IRequirements {
	requirements: object;
}

const LevelDots = (props: React.PropsWithChildren<{ level: Level }>) => {
	const { level } = props;
	const theme = useTheme();
	return (
		<View style={styles.levelDotsContainer}>
			{[...Array(5)].map((_, i) => {
				return (
					<View
						style={{
							...styles.levelDot,
							backgroundColor:
								i < parseInt(level)
									? theme.colors.tertiary
									: theme.colors.backdrop,
						}}
						key={i}
					></View>
				);
			})}
		</View>
	);
};

const Requirement = (props: React.PropsWithChildren<IRequirement>) => {
	const { skill, level } = props;

	return (
		<View style={styles.requirement}>
			<LevelDots level={level} />
			<Text style={styles.skill}>{skill}</Text>
			<Text>{experience[level]}</Text>
		</View>
	);
};

const Requirements = (props: React.PropsWithChildren<IRequirements>) => {
	const { requirements } = props;

	return (
		<View style={styles.container}>
			{Object.entries(requirements).map(([skill, level], i) => {
				return <Requirement skill={skill} level={level} key={i} />;
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	requirement: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	skill: {
		fontFamily: "Montserrat-Bold",
		fontSize: 16,
	},
	level: {
		fontFamily: "Montserrat",
		fontSize: 12,
	},
	levelDotsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	levelDot: {
		borderRadius: 10,
		marginRight: 2,
		height: 10,
		width: 10,
	},
});

export default Requirements;
