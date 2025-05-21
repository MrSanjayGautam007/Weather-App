import React from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar } from 'react-native';

const StatusBarBG = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Background Image */}
      <ImageBackground
        source={require('../images/imageSpace.jpg')} // Image URL or local image
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {/* StatusBar Styling */}
        <StatusBar 
          barStyle="light-content" // Use 'dark-content' if the image is light-colored
          translucent={true} // Makes the status bar translucent
          backgroundColor="transparent" // Background color of status bar (transparent to blend with image)
        />

        {/* Your content */}
        <View style={styles.content}>
          <Text style={styles.text}>Hello, World!</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default StatusBarBG;
