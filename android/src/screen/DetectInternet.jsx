import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  // State to track if the device has internet access
  const [isConnected, setIsConnected] = useState(null);
  const [isInternetReachable, setIsInternetReachable] = useState(false);

  useEffect(() => {
    // Function to check internet reachability (pinging an external server)
    const checkInternetReachability = async () => {
      try {
        const response = await fetch('https://www.google.com', { method: 'HEAD' });
        if (response.ok) {
          setIsInternetReachable(true); // Internet is reachable
        } else {
          setIsInternetReachable(false); // Internet is not reachable
        }
      } catch (error) {
        setIsInternetReachable(false); // Error means no internet
      }
    };

    // Listen for network connectivity changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        // Check internet reachability only when connected to a network
        checkInternetReachability();
      } else {
        setIsInternetReachable(false); // No network, so no internet
      }
    });

    // Initial internet check if already connected
    if (isConnected) {
      checkInternetReachability();
    }

    // Cleanup on unmount
    return () => unsubscribe();
  }, [isConnected]);

  // Render status message based on connection and internet availability
  const renderStatus = () => {
    if (isConnected === null) {
      return <Text style={styles.statusText}>Checking...</Text>;
    }
    if (!isConnected) {
      return <Text style={styles.statusText}>No Internet</Text>;
    }
    return isInternetReachable ? (
      <Text style={[styles.statusText, styles.online]}>Back Online</Text>
    ) : (
      <Text style={[styles.statusText, styles.offline]}>No Internet</Text>
    );
  };

  return (
    <View style={styles.container}>
      {renderStatus()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  online: {
    color: 'green',
  },
  offline: {
    color: 'red',
  },
});

export default App;
