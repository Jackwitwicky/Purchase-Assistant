import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Compare({route}) {
  const metricType = route.params.metric_type;
  const metricTypeUnit = metricType === 'weight' ? 'g' : 'ml';

  const [modalVisible, setModalVisible] = useState(false);

  const [smallPrice, setSmallPrice] = useState('');
  const [smallPriceError, setSmallPriceError] = useState('');

  const [smallMetric, setSmallMetric] = useState('');
  const [smallMetricError, setSmallMetricError] = useState('');

  const [largePrice, setLargePrice] = useState('');
  const [largePriceError, setLargePriceError] = useState('');

  const [largeMetric, setLargeMetric] = useState('');
  const [largeMetricError, setLargeMetricError] = useState('');

  const [smallShPerGram, setSmallShPerGram] = useState(0.0);
  const [largeShPerGram, setLargeShPerGram] = useState(0.0);
  const [betterItem, setBetterItem] = useState('Smaller');
  const [itemDifferenceRate, setItemDifferenceRate] = useState(0);

  const compareItems = () => {
    if (validateFields()) {
      let computedSmallShPerMetric = smallPrice / smallMetric;
      let computedLargeShPerMetric = largePrice / largeMetric;
      setSmallShPerGram(smallPrice / smallMetric);
      setLargeShPerGram(largePrice / largeMetric);
      console.log('The smallSh is: ', smallShPerGram);
      console.log('The largeSh is: ', largeShPerGram);

      if (computedSmallShPerMetric < computedLargeShPerMetric) {
        console.log('smaller is better');
        setBetterItem('Smaller');
        setItemDifferenceRate(
          (computedLargeShPerMetric - computedSmallShPerMetric) * 100,
        );
      } else {
        console.log('larger is better');
        setBetterItem('Larger');
        setItemDifferenceRate(
          (computedSmallShPerMetric - computedLargeShPerMetric) * 100,
        );
      }

      setModalVisible(true);
    } else {
      console.log('We have errors!');
    }
  };

  const validateFields = () => {
    let isInputValid = true;

    if (smallPrice == null || smallPrice < 1) {
      setSmallPriceError('Small Price is invalid');
      isInputValid = false;
    } else {
      setSmallPriceError('');
    }

    if (smallMetric == null || smallMetric < 1) {
      setSmallMetricError(`Small ${metricType} is invalid`);
      isInputValid = false;
    } else {
      setSmallMetricError('');
    }

    if (largePrice == null || largePrice < 1) {
      setLargePriceError('Large Price is invalid');
      isInputValid = false;
    } else {
      setLargePriceError('');
    }

    if (largeMetric == null || largeMetric < 1) {
      setLargeMetricError(`Large ${metricType} is invalid`);
      isInputValid = false;
    } else {
      setLargeMetricError('');
    }

    return isInputValid;
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Comparison Report</Text>
                  <Text style={styles.itemSummary}>
                    Smaller item is: Ksh {smallShPerGram.toFixed(2)}/
                    {metricTypeUnit}
                  </Text>
                  <Text style={styles.itemSummary}>
                    Larger item is: Ksh {largeShPerGram.toFixed(2)}/
                    {metricTypeUnit}
                  </Text>

                  <Text style={{marginVertical: 20}}>It is better to buy:</Text>

                  <Text style={styles.betterItemText}>
                    The {betterItem} Item
                  </Text>
                  <Text style={{marginVertical: 20}}>with a rate of: </Text>

                  <Text style={styles.betterItemText}>
                    {itemDifferenceRate.toFixed(2)}%
                  </Text>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>CLOSE REPORT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text style={styles.smallItemHeading}>
              Enter smaller item details
            </Text>

            <Input
              placeholder="price"
              errorStyle={{color: 'red'}}
              errorMessage={smallPriceError}
              value={smallPrice.toString()}
              onChangeText={(value) => setSmallPrice(value)}
              keyboardType="number-pad"
              leftIcon={<Icon name="currency-usd" size={24} color="black" />}
            />

            <Input
              placeholder={metricType}
              errorStyle={{color: 'red'}}
              errorMessage={smallMetricError}
              value={smallMetric.toString()}
              onChangeText={(value) => setSmallMetric(value)}
              keyboardType="number-pad"
              leftIcon={
                metricType === 'weight' ? (
                  <Icon name="weight" size={24} color="black" />
                ) : (
                  <Icon name="water" size={24} color="black" />
                )
              }
            />

            <Text style={styles.vsText}>VS</Text>

            <Text style={styles.smallItemHeading}>
              Enter large item details
            </Text>

            <Input
              placeholder="price"
              errorStyle={{color: 'red'}}
              errorMessage={largePriceError}
              value={largePrice.toString()}
              onChangeText={(value) => setLargePrice(value)}
              keyboardType="number-pad"
              leftIcon={<Icon name="currency-usd" size={24} color="black" />}
            />

            <Input
              placeholder={metricType}
              errorStyle={{color: 'red'}}
              errorMessage={largeMetricError}
              value={largeMetric.toString()}
              onChangeText={(value) => setLargeMetric(value)}
              keyboardType="number-pad"
              leftIcon={
                metricType === 'weight' ? (
                  <Icon name="weight" size={24} color="black" />
                ) : (
                  <Icon name="water" size={24} color="black" />
                )
              }
            />

            <Button
              containerStyle={{marginTop: 20}}
              title="COMPARE"
              onPress={() => compareItems()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Compare;

const styles = StyleSheet.create({
  betterItemText: {
    fontWeight: '700',
    fontSize: 30,
  },
  container: {
    flexDirection: 'column',
    padding: 16,
  },
  itemSummary: {
    marginVertical: 6,
  },
  smallItemHeading: {
    paddingBottom: 16,
  },
  vsText: {
    fontSize: 24,
    fontWeight: '700',
    padding: 10,
    alignSelf: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    marginVertical: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
});
