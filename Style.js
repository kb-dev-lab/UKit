import Constants from 'expo-constants';

const colors = {
	red: '',
	white: '#FFF',
	green: '#4CAF50',
	gray: '#454545',
	lightblue: '#40C4FF',
	blue: '#006F9F',
	darkblue: '#0D47A1',
	darkred: '#D50000',
	backgroundGrey: '#E9E9EF',
};

const hintColors = {
	green: '#55da59',
	gray: '#9499a1AA',
};

const colors200 = {
	red: '#EF9A9A',
	pink: '#F48FB1',
	purple: '#CE93D8',
	deepPurple: '#B39DDB',
	indigo: '#9FA8DA',
	blue: '#90CAF9',
	lightBlue: '#81D4FA',
	cyan: '#80DEEA',
	teal: '#80CBC4',
	green: '#A5D6A7',
	lightGreen: '#C5E1A5',
	lime: '#E6EE9C',
	yellow: '#FFF59D',
	amber: '#FFE082',
	orange: '#FFCC80',
	deepOrange: '#FFAB91',
	brown: '#BCAAA4',
	grey: '#EEEEEE',
	blueGrey: '#B0BEC5',
};

const colors50 = {
	red: '#FFEBEE',
	pink: '#FCE4EC',
	purple: '#F3E5F5',
	deepPurple: '#EDE7F6',
	indigo: '#E8EAF6',
	blue: '#E3F2FD',
	lightBlue: '#E1F5FE',
	cyan: '#E0F7FA',
	teal: '#E0F2F1',
	green: '#E8F5E9',
	lightGreen: '#F1F8E9',
	lime: '#F9FBE7',
	yellow: '#FFFDE7',
	amber: '#FFF8E1',
	orange: '#FFF3E0',
	deepOrange: '#FBE9E7',
	brown: '#EFEBE9',
	grey: '#FAFAFA',
	blueGrey: '#ECEFF1',
};

const Theme = {
	primary: '#009ee0',
	secondary: '#0098c5',
	light: {
		primary: '#009ee0',
		courseBackground: '#F3F2F9',
		eventBackground: '#FFFFFF',
		eventBorder: '#3D3D3D',
		secondary: '#0098c5',
		selection: '#ededed',
		accentFont: 'darkred',
		font: '#202020',
		fontSecondary: '#4C5464',
		lightFont: '#F0F0F0',
		link: '#1565c0',
		icon: '#4C5464',
		border: '#CCCCCC',
		background: '#ffffff',
		greyBackground: '#F0F0F0',
		collapsableBackground: '#00000011',
		field: '#ffffff',
		sections: ['#009ee030', '#33b1e630', '#66c5ec30', '#007eb330', '#005f8630', '#003f5a30'],
		sectionsHeaders: ['#009ee0', '#33b1e6', '#66c5ec', '#007eb3', '#005f86', '#003f5a'],
		statusBar: '#006F9F',
		calendar: {
			sunday: '#CCCCCC',
			currentDay: '#EEEEEE',
			selection: '#009EE0',
		},
		settings: {
			switchThumbColor: {
				false: '#E3E3E3',
				true: '#4C5464',
			},
			switchTrackColor: {
				false: '#E3E3E3',
				true: '#E3E3E3',
			},
			background: {
				flex: 1,
				backgroundColor: '#F0F0F0',
			},
			separationText: {
				color: '#4C5464',
				fontSize: 18,
				fontWeight: 'bold',
				marginTop: 12,
				marginLeft: 12,
			},
			button: {
				backgroundColor: '#FFFFFF',
				borderRadius: 16,
				marginHorizontal: 12,
				marginTop: 16,
				paddingVertical: 16,
				flexDirection: 'row',
				alignContent: 'center',
			},
			buttonMainText: {
				fontWeight: '500',
				color: '#4C5464',
				fontSize: 18,
				marginHorizontal: 16,
				alignSelf: 'center',
			},
			buttonSecondaryText: {
				fontWeight: '500',
				color: '#838FA6',
				fontSize: 18,
				marginLeft: 'auto',
				alignSelf: 'center',
			},
			leftIcon: {
				marginLeft: 16,
				color: '#4C5464',
				alignSelf: 'center',
			},
			rightIcon: {
				alignSelf: 'center',
				color: '#4C5464',
				marginHorizontal: 4,
			},
			popup: {
				filters: {
					container: {
						flex: 1,
						flexGrow: 1,
						backgroundColor: '#FFFFFF',
						padding: 16,
						justifyContent: 'space-between',
					},
					header: {
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 8,
					},
					button: {
						backgroundColor: '#EAEAEC',
						padding: 8,
						borderRadius: 16,
						margin: 8,
						flexDirection: 'row',
						alignItems: 'center',
					},
					buttonText: {
						fontSize: 18,
						fontWeight: 'bold',
						color: '#4C5464',
					},
					iconColor: '#4C5464AA',
					footer: {
						marginTop: 16,
						justifyContent: 'flex-end',
						alignItems: 'flex-end',
						flexDirection: 'row',
						marginHorizontal: 4,
					},
				},
				background: {
					flex: 1,
					justifyContent: 'center',
					backgroundColor: '#000000B3',
				},
				container: {
					backgroundColor: '#FFFFFF',
					borderRadius: 20,
					padding: 16,
					marginHorizontal: 16,
					marginVertical: 50,
				},
				header: {
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
				textHeader: {
					fontWeight: 'bold',
					fontSize: 18,
					color: '#4C5464',
				},
				textDescription: {
					marginVertical: 8,
					fontSize: 16,
					color: '#4C5464C0',
				},
				buttonContainer: {
					flexDirection: 'row',
					justifyContent: 'space-around',
					marginTop: 50,
				},
				buttonSecondary: {
					flex: 1,
					backgroundColor: '#D2D4D8',
					borderRadius: 8,
					paddingVertical: 8,
					marginHorizontal: 4,
					alignItems: 'center',
				},
				buttonMain: {
					flex: 1,
					backgroundColor: '#4C5464',
					borderRadius: 8,
					paddingVertical: 8,
					marginHorizontal: 4,
					alignItems: 'center',
				},
				buttonTextSecondary: {
					fontSize: 18,
					color: '#777474',
				},
				buttonTextMain: {
					fontSize: 18,
					color: '#FFFFFF',
				},
				closeIcon: {
					color: '#D2D4D8',
				},
				radioContainer: {
					flexDirection: 'row',
					alignContent: 'center',
					marginTop: 16,
				},
				radioIconColor: '#4C5464',
				radioText: {
					fontSize: 18,
					marginLeft: 16,
					color: '#4C5464',
				},
				filterListContainer: {
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-around',
				},
				textInputContainer: {
					flexDirection: 'row',
					alignItems: 'center',
					marginHorizontal: 4,
					marginTop: 16,
					justifyContent: 'flex-end',
				},
				textInput: {
					borderWidth: 2,
					borderColor: '#4C5464',
					borderRadius: 16,
					padding: 8,
					paddingVertical: Platform.OS === 'ios' ? 8 : 4,
					flex: 1,
					marginRight: 4,
					color: '#4C5464',
				},
				textInputIconColor: '#4C5464',
				textInputPlaceholderColor: '#4C546455',
			},
		},
		courses: {
			// TP: Lime
			'#FFFF00': '#c0ca33',
			// Cours: Cyan
			'#00FFFF': '#00acc1',
			// Réunion de rentré: Blue Grey
			'#800040': '#546e7a',
			// Atelier: Blue Grey
			'#808000': '#546e7a',
			// TD Machine: Red
			'#800000': '#e53935',
			// Oraux: Orange
			'#8000FF': '#fb8c00',
			// TD: Green
			'#00FF00': '#43a047',
			// Cours/TD: Indigo
			'#400080': '#3949ab',
			// Others: Indigo
			default: '#3949ab',
		},
	},
	dark: {
		primary: '#200f21',
		courseBackground: '#451C47',
		eventBackground: '#674669',
		eventBorder: '#A192A2',
		secondary: '#C2BDC2',
		selection: '#00617E',
		accentFont: '#f9fbe7',
		font: '#C2BDC2',
		fontSecondary: '#D9D9D9',
		link: '#4fc3f7',
		lightFont: '#F0F0F0',
		icon: '#C2BDC2',
		border: '#372639',
		background: '#200f21',
		greyBackground: '#200f21',
		field: '#200f21',
		collapsableBackground: '#FFFFFF11',
		sections: ['#451c4730', '#6a496c30', '#8f779130', '#37163930', '#29112b30', '#1c0b1c30'],
		sectionsHeaders: ['#451c47', '#6a496c', '#8f7791', '#371639', '#29112b', '#1c0b1c'],
		statusBar: '#000000',
		calendar: {
			sunday: '#2f1230',
			currentDay: '#572159',
			selection: '#674669',
		},
		settings: {
			switchThumbColor: {
				false: '#4C5464',
				true: '#D9D9D9',
			},
			switchTrackColor: {
				false: '#451C47',
				true: '#451C47',
			},
			background: {
				flex: 1,
				backgroundColor: '#451C47',
			},
			separationText: {
				color: '#D9D9D9',
				fontSize: 18,
				fontWeight: 'bold',
				marginTop: 12,
				marginLeft: 12,
			},
			button: {
				backgroundColor: '#674669',
				borderRadius: 16,
				marginHorizontal: 12,
				marginTop: 16,
				paddingVertical: 16,
				flexDirection: 'row',
				alignContent: 'center',
			},
			buttonMainText: {
				fontWeight: '500',
				color: '#D9D9D9',
				fontSize: 18,
				marginHorizontal: 16,
				alignSelf: 'center',
			},
			buttonSecondaryText: {
				fontWeight: '500',
				color: '#B1A5B2',
				fontSize: 18,
				marginLeft: 'auto',
				alignSelf: 'center',
			},
			leftIcon: {
				marginLeft: 16,
				color: '#D9D9D9',
				alignSelf: 'center',
			},
			rightIcon: {
				alignSelf: 'center',
				color: '#D9D9D9',
				marginHorizontal: 4,
			},
			popup: {
				filters: {
					container: {
						flex: 1,
						flexGrow: 1,
						backgroundColor: '#451C47',
						padding: 16,
						justifyContent: 'space-between',
					},
					header: {
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 8,
					},
					button: {
						backgroundColor: '#674669',
						padding: 8,
						borderRadius: 16,
						margin: 8,
						flexDirection: 'row',
						alignItems: 'center',
					},
					buttonText: {
						fontSize: 18,
						fontWeight: 'bold',
						color: '#FFFFFFAA',
					},
					iconColor: '#FFFFFFAA',
					footer: {
						marginTop: 16,
						justifyContent: 'flex-end',
						alignItems: 'flex-end',
						flexDirection: 'row',
						marginHorizontal: 4,
					},
				},
				background: {
					flex: 1,
					justifyContent: 'center',
					backgroundColor: '#000000B3',
				},
				container: {
					backgroundColor: '#674669',
					borderRadius: 20,
					padding: 16,
					marginHorizontal: 16,
					marginVertical: 50,
				},
				header: {
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
				textHeader: {
					fontWeight: 'bold',
					fontSize: 18,
					color: '#FFFFFF',
				},
				textDescription: {
					marginVertical: 8,
					fontSize: 16,
					color: '#D9D1D9',
				},
				buttonContainer: {
					flexDirection: 'row',
					justifyContent: 'space-around',
					marginTop: 50,
				},
				buttonSecondary: {
					flex: 1,
					backgroundColor: '#B3A3B4',
					borderRadius: 8,
					paddingVertical: 8,
					marginHorizontal: 4,
					alignItems: 'center',
				},
				buttonMain: {
					flex: 1,
					backgroundColor: '#FFFFFF',
					borderRadius: 8,
					paddingVertical: 8,
					marginHorizontal: 4,
					alignItems: 'center',
				},
				buttonTextSecondary: {
					fontSize: 18,
					color: '#484148',
				},
				buttonTextMain: {
					fontSize: 18,
					color: '#404040',
				},
				closeIcon: {
					color: '#8D748E',
				},
				radioContainer: {
					flexDirection: 'row',
					alignContent: 'center',
					marginVertical: 8,
				},
				radioIconColor: '#D9D9D9',
				radioText: {
					fontSize: 18,
					marginLeft: 16,
					color: '#D9D9D9',
				},
				filterListContainer: {
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-around',
				},
				textInputContainer: {
					flexDirection: 'row',
					alignItems: 'center',
					marginHorizontal: 4,
					marginTop: 16,
					justifyContent: 'flex-end',
				},
				textInput: {
					borderWidth: 2,
					borderColor: '#D9D9D9',
					borderRadius: 16,
					padding: 8,
					paddingVertical: Platform.OS === 'ios' ? 8 : 4,
					flex: 1,
					marginRight: 4,
					color: '#D9D9D9',
				},
				textInputIconColor: '#D9D9D9',
				textInputPlaceholderColor: '#D9D9D955',
			},
		},
		courses: {
			// TP: Lime
			'#FFFF00': '#7c8500',
			// Cours: Cyan
			'#00FFFF': '#006064',
			// Réunion de rentré: Blue Grey
			'#800040': '#37474f',
			// Atelier: Blue Grey
			'#808000': '#37474f',
			// TD Machine: Red
			'#800000': '#b71c1c',
			// Oraux: Orange
			'#8000FF': '#e65100',
			// TD: Green
			'#00FF00': '#1b5e20',
			// Cours/TD: Indigo
			'#400080': '#283593',
			// Others: Indigo
			default: '#283593',
		},
	},
};

export default {
	fonts: {
		default: {
			fontFamily: 'system',
		},
	},
	colors,
	hintColors,
	backButton: {
		paddingLeft: 16,
		paddingRight: 32,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	about: {
		title: {
			fontWeight: 'bold',
			fontSize: 24,
		},
		view: {
			padding: 10,
		},
		content: {
			marginTop: 5,
			marginBottom: 15,
		},
	},
	stackNavigator: {
		headerStyle: {
			backgroundColor: Theme.primary,
		},
		headerTitleStyle: {
			color: colors.white,
			marginBottom: 20,
			marginTop: 20,
			fontSize: 22,
		},
		headerBackTitleStyle: {
			color: colors.white,
		},
		headerTintColor: colors.white,
	},
	containerView: {
		margin: 20,
		marginTop: 30,
	},
	list: {
		searchInputView: {
			flex: 0,
		},
		searchInput: {
			height: 40,
			paddingLeft: 5,
			color: 'white',
		},
		sectionList: {
			flex: 0,
		},
		sections: [
			{ backgroundColor: colors50.deepOrange },
			{ backgroundColor: colors50.pink },
			{ backgroundColor: colors50.lightBlue },
			{ backgroundColor: colors50.blueGrey },
			{ backgroundColor: colors50.green },
			{ backgroundColor: colors50.purple },
		],
		sectionHeaders: [
			{ backgroundColor: colors200.deepOrange },
			{ backgroundColor: colors200.pink },
			{ backgroundColor: colors200.lightBlue },
			{ backgroundColor: colors200.blueGrey },
			{ backgroundColor: colors200.green },
			{ backgroundColor: colors200.purple },
		],
		homeView: {
			flex: 1,
			backgroundColor: 'transparent',
		},
		view: {
			backgroundColor: 'transparent',
			borderWidth: 0,
			borderBottomColor: colors.gray,
			paddingHorizontal: 20,
			paddingVertical: 10,
			justifyContent: 'space-between',
		},
		sectionHeaderView: {
			backgroundColor: 'white',
			height: 40,
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'center',
			alignContent: 'center',
			borderBottomColor: colors.gray,
			borderRadius: 4,
			marginHorizontal: 8,
			marginTop: 8,
			shadowOpacity: 0.3,
			shadowColor: '#666',
			shadowOffset: {
				width: 0,
				height: 3,
			},
		},
		sectionHeaderTitle: {
			textAlign: 'center',
			fontSize: 18,
			fontWeight: 'bold',
			color: 'white',
		},
	},
	weekView: {
		dayTitle: {
			textAlign: 'center',
			fontSize: 18,
			fontWeight: 'bold',
		},
	},
	schedule: {
		course: {
			root: {
				flexDirection: 'column',
				padding: 8,
				borderWidth: 0,
				marginHorizontal: 12,
				marginVertical: 2,
				backgroundColor: '#EEEEEE',
			},
			row: {
				justifyContent: 'space-between',
				flexDirection: 'row',
			},
			hours: {
				borderRightWidth: 2,
				borderColor: colors.darkblue,
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignContent: 'center',
				alignItems: 'center',
				paddingRight: 8,
				paddingVertical: 2,
				flexShrink: 0,
				backgroundColor: 'transparent',
			},
			hoursText: {
				fontWeight: 'bold',
			},
			contentType: {
				// marginBottom: 16,
				alignSelf: 'stretch',
				flexDirection: 'row',
				justifyContent: 'space-between',
			},
			contentBlock: {
				flex: 1,
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				flexDirection: 'column',
				marginLeft: 8,
			},
			noCourse: {
				paddingVertical: 10,
				justifyContent: 'space-between',
			},
			noCourseText: {
				fontStyle: 'italic',
				textAlign: 'center',
				color: '#5d5d5d',
				fontWeight: 'bold',
			},
			title: {
				fontSize: 16,
				paddingTop: 0,
				textAlign: 'center',
				fontWeight: 'bold',
			},
			header: {
				flexDirection: 'column',
			},
			container: {
				flexDirection: 'column',
			},
			content: {
				flexWrap: 'wrap',
			},
			groupsContainer: {
				flexWrap: 'wrap',
				flexDirection: 'row',
			},
			iconHeader: {
				width: 18,
				height: 18,
				marginRight: 8,
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
			},
			groupsHeader: {},
			groupsContent: {
				alignSelf: 'stretch',
				flex: 1,
				flexDirection: 'column',
			},
			line: {
				flexDirection: 'row',
				justifyContent: 'flex-start',
				flexWrap: 'wrap',
			},
			centeredLine: {
				flexDirection: 'row',
				justifyContent: 'center',
				flexWrap: 'wrap',
			},
		},
		containerView: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
		titleView: {
			justifyContent: 'center',
			flexDirection: 'row',
			alignSelf: 'stretch',
			alignItems: 'center',
		},
		contentView: {
			flex: 1,
			alignSelf: 'stretch',
		},
		titleText: {
			fontSize: 24,
			fontWeight: 'bold',
			textAlign: 'center',
			paddingVertical: 8,
		},
		error: {
			fontSize: 20,
			textAlign: 'center',
			fontWeight: 'bold',
		},
	},
	statusBar: {
		backgroundColor: Theme.primary,
		height: Constants.statusBarHeight,
	},
	dayView: {},
	calendarList: {
		itemSize: 64,
		header: 38,
	},
	offline: {
		groups: {
			text: {
				textAlign: 'center',
				fontSize: 12,
				fontStyle: 'italic',
			},
		},
	},
	Theme,
};
