import React from 'react';
import styles from '../../StyleWelcome';
import { View } from 'react-native';

export default ({ pageNumber, maxPage }) => {

    const circleFill = [];
    for (let i = 0; i < pageNumber; i++) {
        circleFill.push(<View key={i} style={styles('circleFill')} />);
    };

    const circleEmpty = [];
    for (let i = 0; i < maxPage - pageNumber; i++) {
        circleEmpty.push(<View key={i+pageNumber} style={styles('circleEmpty')} />)    
    };

	return (
		<View style={styles('pageDots')}>
            {circleFill}
            {circleEmpty}
		</View>
	);
};
