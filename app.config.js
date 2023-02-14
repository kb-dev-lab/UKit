import 'dotenv/config';

export default {
	name: 'Ukit',
	description: 'Ukit, a companion app for student of University of Bordeaux',
	slug: 'Ukit',
	privacy: 'public',
	githubUrl: 'https://github.com/kb-dev/UKit',
	platforms: ['ios', 'android'],
	version: '4.1.0',
	orientation: 'portrait',
	primaryColor: '#006F9F',
	icon: './assets/icons/ios.png',
	owner: 'kbdev',
	splash: {
		image: './assets/icons/splash.png',
		backgroundColor: '#009de0',
		resizeMode: 'contain',
	},
	ios: {
		icon: './assets/icons/ios.png',
		supportsTablet: true,
		bundleIdentifier: 'com.bordeaux.ukit',
		config: {
			googleMapsApiKey: 'AIzaSyB5JDcHP9k40e0ozKCSA9ObjPYusnhETBI',
			usesNonExemptEncryption: false,
		},
		infoPlist: {
			NSRemindersUsageDescription:
				'This app needs access to the calendar in order to create events from your schedule',
			UIBackgroundModes: ['fetch'],
		},
	},
	android: {
		package: 'com.bordeaux1.emplois',
		config: {
			googleMaps: {
				apiKey: 'AIzaSyD8qcNLeWqiyS5KK4hWiCkznZkD3GbhFrI',
			},
		},
		adaptiveIcon: {
			foregroundImage: './assets/icons/android_foreground.png',
			backgroundImage: './assets/icons/android_background.png',
		},
		permissions: ['READ_CALENDAR', 'WRITE_CALENDAR'],
		versionCode: 61,
	},
	androidStatusBar: {
		barStyle: 'light-content',
		backgroundColor: '#009ee0',
	},
	assetBundlePatterns: ['**/*'],
	updates: {
		enabled: false,
	},
	extra: {
		eas: {
			projectId: "2a05b568-4dc7-4e7b-bcec-eb00ed808aee"
		},
		sentryDSN: process.env.SENTRY_DSN,
	},
};
