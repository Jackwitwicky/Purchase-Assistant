import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function CompareVolume(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const [smallQuantity, setSmallQuantity] = useState(1);
  const [smallQuantityError, setSmallQuantityError] = useState('');

  const [smallPrice, setSmallPrice] = useState('');
  const [smallPriceError, setSmallPriceError] = useState('');

  const [smallWeight, setSmallWeight] = useState('');
  const [smallWeightError, setSmallWeightError] = useState('');

  const [largeQuantity, setLargeQuantity] = useState(1);
  const [largeQuantityError, setLargeQuantityError] = useState('');

  const [largePrice, setLargePrice] = useState('');
  const [largePriceError, setLargePriceError] = useState('');

  const [largeWeight, setLargeWeight] = useState('');
  const [largeWeightError, setLargeWeightError] = useState('');

  const [smallShPerGram, setSmallShPerGram] = useState(0.0);
  const [largeShPerGram, setLargeShPerGram] = useState(0.0);
  const [betterItem, setBetterItem] = useState('Smaller');
  const [itemDifferenceRate, setItemDifferenceRate] = useState(0);

  const compareItems = () => {
    console.log('I will run the comparison sequence!!');
    if (validateFields()) {
      let computedSmallShPerGram = smallPrice / smallWeight;
      let computedLargeShPerGram = largePrice / largeWeight;
      setSmallShPerGram(smallPrice / smallWeight);
      setLargeShPerGram(largePrice / largeWeight);
      console.log('The smallSh is: ', smallShPerGram);
      console.log('The largeSh is: ', largeShPerGram);

      if (computedSmallShPerGram < computedLargeShPerGram) {
        console.log('smaller is better');
        setBetterItem('Smaller');
        setItemDifferenceRate(
          (computedLargeShPerGram - computedSmallShPerGram) * 100,
        );
      } else {
        console.log('larger is better');
        setBetterItem('Larger');
        setItemDifferenceRate(
          (computedSmallShPerGram - computedLargeShPerGram) * 100,
        );
      }

      setModalVisible(true);
    } else {
      console.log('We have errors!');
    }
  };

  const validateFields = () => {
    let isInputValid = true;

    if (smallQuantity == null || smallQuantity < 1) {
      setSmallQuantityError('Small Quantity is invalid');
      isInputValid = false;
    } else {
      setSmallQuantityError('');
    }

    if (smallPrice == null || smallPrice < 1) {
      setSmallPriceError('Small Price is invalid');
      isInputValid = false;
    } else {
      setSmallPriceError('');
    }

    if (smallWeight == null || smallWeight < 1) {
      setSmallWeightError('Small Weight is invalid');
      isInputValid = false;
    } else {
      setSmallWeightError('');
    }

    if (largeQuantity == null || largeQuantity < 1) {
      setLargeQuantityError('Large Quantity is invalid');
      isInputValid = false;
    } else {
      setLargeQuantityError('');
    }

    if (largePrice == null || largePrice < 1) {
      setLargePriceError('Large Price is invalid');
      isInputValid = false;
    } else {
      setLargePriceError('');
    }

    if (largeWeight == null || largeWeight < 1) {
      setLargeWeightError('Large Weight is invalid');
      isInputValid = false;
    } else {
      setLargeWeightError('');
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
                    Smaller item is: Ksh {smallShPerGram.toFixed(2)}/g
                  </Text>
                  <Text style={styles.itemSummary}>
                    Larger item is: Ksh {largeShPerGram.toFixed(2)}/g
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
              placeholder="quantity"
              errorStyle={{color: 'red'}}
              errorMessage={smallQuantityError}
              value={smallQuantity.toString()}
              onChangeText={(value) => setSmallQuantity(value)}
              keyboardType="number-pad"
              leftIcon={<Icon name="stack-overflow" size={24} color="black" />}
            />

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
              placeholder="weight"
              errorStyle={{color: 'red'}}
              errorMessage={smallWeightError}
              value={smallWeight.toString()}
              onChangeText={(value) => setSmallWeight(value)}
              keyboardType="number-pad"
              leftIcon={<Icon name="weight" size={24} color="black" />}
            />

            <Text style={styles.vsText}>VS</Text>

            <Text style={styles.smallItemHeading}>
              Enter large item details
            </Text>

            <Input
              placeholder="quantity"
              errorStyle={{color: 'red'}}
              errorMessage={largeQuantityError}
              value={largeQuantity.toString()}
              onChangeText={(value) => setLargeQuantity(value)}
              keyboardType="number-pad"
              leftIcon={<Icon name="stack-overflow" size={24} color="black" />}
            />

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
              placeholder="weight"
              errorStyle={{color: 'red'}}
              errorMessage={largeWeightError}
              value={largeWeight.toString()}
              onChangeText={(value) => setLargeWeight(value)}
              keyboardType="number-pad"
              leftIcon={<Icon name="weight" size={24} color="black" />}
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

export default CompareVolume;

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
