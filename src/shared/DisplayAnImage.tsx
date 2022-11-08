import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 75,
        paddingLeft: 110,
        paddingRight: 70,
        paddingBottom: 50
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
    logo: {
        width: 66,
        height: 58,
    },
});

const DisplayAnImage = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={require('../../Shared/Images/My_project.png')}
            />
        </View>
    );
}

export default DisplayAnImage;