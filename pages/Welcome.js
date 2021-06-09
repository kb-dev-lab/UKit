import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 35,
        paddingVertical: 10,
        marginHorizontal: 32,
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 100,
        elevation: 2,
    },
    buttonText: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 18,
        color: "#31C7E6",
        alignSelf: "center",
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
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 30,
    },
    circleFill: {
        elevation: 2,
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    circleEmpty: {
        elevation: 2,
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: '#3CD0E7',
        borderColor: '#FFFFFF',
        borderWidth: 2,
    },
    whiteCardContainer: {
        marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 32,
    },
    whiteCard: {
        width: '100%',
        height: '25%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        justifyContent: 'center',
    },
    whiteCardText: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 18,
        position: 'absolute',
        top: 2,
        left: 5,
    },
    whiteCardButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderColor: '#04A0E1',
        borderWidth: 3,
        marginHorizontal: 100,
    },
    whiteCardButtonText: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 16,
        alignSelf: "center",
    }
});

class FirstWelcomePage extends React.Component {

    render() {

        return (
            <View style={{ flex: 1, }}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#009DE0', '#45D7E8']}
                    start={{ x: 0.05, y: 0.05 }}
                    end={{ x: 0.95, y: 0.95 }}
                >
                    <Text
                        style={styles.mainText}
                    >
                        Bienvenue !
                    </Text>
                    <Text
                        style={styles.secondaryText}
                    >
                        Avant d’utiliser l’application, nous avons quelques réglages à faire.
                    </Text>
                    <TouchableOpacity onPress={() => console.log("PRESSED")} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Commencer</Text>
                    </TouchableOpacity>
                    <View
                        style={styles.pageDots}
                    >
                        <View style={styles.circleFill} />
                        <View style={styles.circleEmpty} />
                        <View style={styles.circleEmpty} />
                        <View style={styles.circleEmpty} />
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

class SecondWelcomePage extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, }}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#009DE0', '#45D7E8']}
                    start={{ x: 0.05, y: 0.05 }}
                    end={{ x: 0.95, y: 0.95 }}
                >

                    <View style={styles.whiteCardContainer}>
                        <View style={styles.whiteCard}>

                            <Text style={styles.whiteCardText}>Quel est ton année ?</Text>

                            <TouchableOpacity onPress={() => console.log("PRESSED")} style={styles.whiteCardButton}>
                                <Text style={styles.whiteCardButtonText}>Licence 1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => console.log("PRESSED")} style={styles.whiteCardButton}>
                                <Text style={styles.whiteCardButtonText}>Licence 2</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => console.log("PRESSED")} style={styles.whiteCardButton}>
                                <Text style={styles.whiteCardButtonText}>Licence 3</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.whiteCard}>

                            <Text style={styles.whiteCardText}>À quel semestre es-tu ?</Text>

                        </View>

                        <View style={styles.whiteCard}>

                            <Text style={styles.whiteCardText}>Quel est ton groupe ?</Text>

                        </View>

                    </View>

                    <TouchableOpacity onPress={() => console.log("PRESSED")} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Suivant</Text>
                    </TouchableOpacity>
                    <View
                        style={styles.pageDots}
                    >
                        <View style={styles.circleFill} />
                        <View style={styles.circleFill} />
                        <View style={styles.circleEmpty} />
                        <View style={styles.circleEmpty} />
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

export default props => {

    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SecondWelcomePage />
        );
    }
};