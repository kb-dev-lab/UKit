import React from 'react';
import styles from '../../StyleWelcome';
import { View } from 'react-native';

export default ({ pageNumber, maxPage, theme }) => {

    const circleFill = [];
    for (let i = 0; i < pageNumber; i++) {
        circleFill.push(<View key={i} style={styles[theme].circleFill} />);
    };

    const circleEmpty = [];
    for (let i = 0; i < maxPage - pageNumber; i++) {
        circleEmpty.push(<View key={i+pageNumber} style={styles[theme].circleEmpty} />)    
    };

	return (
		<View style={styles[theme].pageDots}>
            {circleFill}
            {circleEmpty}
		</View>
	);
};
