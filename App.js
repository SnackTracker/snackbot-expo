import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [count, setCount] = useState(1)
  const [opacity, setOpacity] = useState(0)

  const [dietCoke, setDietCoke] = useState(2)
  const [lunaBar, setLunaBar] = useState(11)
  const [sourPatchKids, setSourPatchKids] = useState(7)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    console.log('EFFECT HAPPENING NOW')
    // setTimeout(()=>{
    //   setOpacity(0)
    // }, 1500);
    // alert(`this is an alert`);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('SCANN BEGIN', data)
    setScanned(true);
    if (data === '0049000061055') {
      setDietCoke(dietCoke - 1)
      setCount(dietCoke)
      console.log(`YOUVE SCANNED A DIET COKE! REMAINING: ${dietCoke}`)
    } else if (data === '0722252103406') {
      setLunaBar(lunaBar - 1)
      setCount(lunaBar)
      console.log(`YOUVE SCANNED A LUNA BAR! REMAINING: ${lunaBar}`)
    } else if (data === '0070462098501') {
      setSourPatchKids(sourPatchKids - 1)
      setCount(sourPatchKids)
      console.log(`YOUVE SCANNED A BAG OF SOUR PATCH KIDS! REMAINING: ${sourPatchKids}`)
    }
    setOpacity(.8)
    setTimeout(()=>{
      setOpacity(0)
    }, 1500);
    console.log(count)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const revertScan = () => {
    console.log('revert');
    scanned = false;
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.screen}>
      <BarCodeScanner
        type={BarCodeScanner.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // barCodeTypes={[BarCodeScanner.Constants.BarCodeType.upc_e]}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={{
        position: 'absolute',
        textAlign: 'center',
        color: 'white', 
        fontSize: 300, 
        width: '100%',
        bottom: '50%',
        opacity
      }}>{count}</Text>
      <Text style={{
        position: 'absolute',
        textAlign: 'center',
        color: 'white', 
        fontSize: 55, 
        width: '100%',
        bottom: '47%',
        opacity
      }}>REMAINING</Text>
      {scanned && <Button
        style={styles.button}
          title={'Tap to Scan Again' }
          onPress={() => setScanned(false)}
        />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  // count: {
  //   position: 'absolute',
  //   textAlign: 'center',
  //   color: 'white', 
  //   fontSize: 300, 
  //   width: '100%',
  //   bottom: '50%',
  //   opacity: .8
  // },
  // label: {
  //   position: 'absolute',
  //   textAlign: 'center',
  //   color: 'white', 
  //   fontSize: 55, 
  //   width: '100%',
  //   bottom: '47%',
  //   opacity: .8
  // },
  button: {
    position: 'absolute',
    bottom: '-5rem'
  }
})