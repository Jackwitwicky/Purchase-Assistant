import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Home({route, navigation}) {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.weightContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Compare', {metric_type: 'weight'})
              }>
              <Card
                containerStyle={[
                  styles.itemCategoryIcon,
                  {backgroundColor: 'coral'},
                ]}
                wrapperStyle={styles.cardWrapperStyle}>
                <MaterialCommunityIcons name="weight" size={55} color="black" />
              </Card>
            </TouchableOpacity>

            <Text style={styles.categoryText}>Weight</Text>
          </View>

          <View style={styles.volumeContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Compare', {metric_type: 'volume'})
              }>
              <Card
                containerStyle={styles.itemCategoryIcon}
                wrapperStyle={styles.cardWrapperStyle}>
                <MaterialCommunityIcons name="water" size={55} color="black" />
              </Card>
            </TouchableOpacity>
            <Text style={styles.categoryText}>Volume</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemCategoryIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'cyan',
    justifyContent: 'center',
  },
  cardWrapperStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  weightContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  volumeContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  categoryText: {
    marginTop: 16,
    fontSize: 16,
  },
});
