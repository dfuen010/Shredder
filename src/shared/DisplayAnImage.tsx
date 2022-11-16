import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 50,
    },
    tinyLogo: {
        width: 300,
        height: 300,
        alignSelf: 'center',
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