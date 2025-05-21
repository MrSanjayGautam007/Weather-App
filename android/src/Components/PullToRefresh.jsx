import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, RefreshControl, StyleSheet } from 'react-native';

const PullToRefresh = () => {
    const [data, setData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Fetch data function
    const fetchData = async () => {
        setIsRefreshing(true);
        try {
            // Simulate a data fetch with a timeout
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const result = await response.json();
            setData(result); // Replace with your actual data
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Handle the pull-to-refresh action
    const onRefresh = () => {
        fetchData(); // Refresh data when pull-to-refresh is triggered
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()} // Adjust this as per your data
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing} // The state that controls the refresh spinner
                        onRefresh={onRefresh} // The function triggered when the user pulls to refresh
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default PullToRefresh;


{/* <RefreshControl
  refreshing={isRefreshing}
  onRefresh={onRefresh}
  tintColor="#0000ff" // Color of the spinner
  title="Refreshing..."
  titleColor="#ff0000" // Color of the title text
/> */}


// <ScrollView
//   refreshControl={
//     <RefreshControl
//       refreshing={isRefreshing}
//       onRefresh={onRefresh}
//     />
//   }
// >
//   {/* Your content here */}
// </ScrollView>