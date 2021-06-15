import { StyleSheet } from 'react-native';
import SettingsManager from './utils/SettingsManager';

const lightTheme = StyleSheet.create({
	buttonContainer: {
		backgroundColor: '#ffffff',
		borderRadius: 35,
		paddingVertical: 10,
		marginHorizontal: 32,
		marginVertical: 16,
		elevation: 8,
	},
	buttonText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 18,
		color: '#31C7E6',
		alignSelf: 'center',
	},
	mainText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 40,
		alignSelf: 'center',
		color: '#FFFFFF',
		marginTop: 150,
	},
	secondaryText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 20,
		alignSelf: 'center',
		color: '#FFFFFF',
		marginRight: 32,
		marginLeft: 32,
		textAlign: 'center',
		marginTop: 100,
	},
	pageDots: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 150,
		marginVertical: 16,
	},
	circleFill: {
		width: 15,
		height: 15,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
	},
	circleEmpty: {
		width: 15,
		height: 15,
		borderRadius: 10,
		backgroundColor: 'transparent',
		borderColor: '#FFFFFF',
		borderWidth: 2,
	},
	whiteCardContainer: {
		display: 'flex',
		flexShrink: 1,
	},
	whiteCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 16,
		marginHorizontal: 16,
		marginVertical: 16,
		elevation: 8,
	},
	whiteCardText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 18,
		marginBottom: 16,
		color: '#000000'
	},
	whiteCardButton: {
		backgroundColor: '#FFFFFF',
		borderRadius: 14,
		borderColor: '#04A0E1',
		borderWidth: 3,
		padding: 6,
		marginRight: 8,
		marginBottom: 8,
	},
	whiteCardButtonSelected: {
		backgroundColor: '#04A0E1',
		borderRadius: 14,
		borderColor: '#04A0E1',
		borderWidth: 3,
		padding: 6,
		marginRight: 8,
		marginBottom: 8,
	},
	whiteCardButtonText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 16,
		alignSelf: 'center',
		color: '#000000',
	},
	whiteCardButtonTextSelected: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 16,
		alignSelf: 'center',
		color: '#ffffff',
	},
	whiteCardGroupButton: {
		backgroundColor: '#FFFFFF',
		borderRadius: 14,
		borderColor: '#04A0E1',
		borderWidth: 3,
		padding: 6,
		marginRight: 8,
		marginBottom: 8,
		flex: 1,
	},
	whiteCardGroupText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 16,
	},
	greyBottomText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 12,
		marginTop: 8,
		marginHorizontal: 10,
		color: '#00000088',
	},
});

const darkTheme = StyleSheet.create({
	buttonContainer: {
		backgroundColor: '#674669',
		borderRadius: 35,
		paddingVertical: 10,
		marginHorizontal: 32,
		marginVertical: 16,
		elevation: 8,
	},
	buttonText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 18,
		color: '#FFFFFF',
		alignSelf: 'center',
	},
	mainText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 40,
		alignSelf: 'center',
		color: '#FFFFFF',
		marginTop: 150,
	},
	secondaryText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 20,
		alignSelf: 'center',
		color: '#FFFFFF',
		marginRight: 32,
		marginLeft: 32,
		textAlign: 'center',
		marginTop: 100,
	},
	pageDots: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 150,
		marginVertical: 16,
	},
	circleFill: {
		width: 15,
		height: 15,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
	},
	circleEmpty: {
		width: 15,
		height: 15,
		borderRadius: 10,
		backgroundColor: 'transparent',
		borderColor: '#FFFFFF',
		borderWidth: 2,
	},
	whiteCardContainer: {
		display: 'flex',
		flexShrink: 1,
	},
	whiteCard: {
		backgroundColor: '#674669',
		borderRadius: 16,
		padding: 16,
		marginHorizontal: 16,
		marginVertical: 16,
		elevation: 8,
	},
	whiteCardText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 18,
		marginBottom: 16,
		color: '#FFFFFF'
	},
	whiteCardButton: {
		backgroundColor: '#674669',
		borderRadius: 14,
		borderColor: '#FFFFFF',
		borderWidth: 3,
		padding: 6,
		marginRight: 8,
		marginBottom: 8,
	},
	whiteCardButtonSelected: {
		backgroundColor: '#FFFFFF',
		borderRadius: 14,
		borderColor: '#FFFFFF',
		borderWidth: 3,
		padding: 6,
		marginRight: 8,
		marginBottom: 8,
	},
	whiteCardButtonText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 16,
		alignSelf: 'center',
		color: '#FFFFFF',
	},
	whiteCardButtonTextSelected: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 16,
		alignSelf: 'center',
		color: '#674669',
	},
	whiteCardGroupButton: {
		backgroundColor: '#674669',
		borderRadius: 14,
		borderColor: '#FFFFFF',
		borderWidth: 3,
		padding: 6,
		marginRight: 8,
		marginBottom: 8,
		flex: 1,
	},
	whiteCardGroupText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 16,
		color: '#FFFFFF'
	},
	greyBottomText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 12,
		marginTop: 8,
		marginHorizontal: 10,
		color: '#FFFFFF88',
	},
});

export default (styleArg) => {
	if (SettingsManager.getTheme() === 'dark') {
		return darkTheme[styleArg]
	}
	return lightTheme[styleArg]
}

export const GradientColor = () => SettingsManager.getTheme() === 'dark' ? ['#200F21', '#713775'] : ['#009DE0', '#45D7E8'];
export const PlaceholderTextColor = () => SettingsManager.getTheme() === 'dark' ? '#FFFFFF88' : '#00000088';