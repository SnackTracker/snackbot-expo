import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('a', scanned);
    setScanned(true);
    console.log('b', scanned);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

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
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        type={BarCodeScanner.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // barCodeTypes={[BarCodeScanner.Constants.BarCodeType.upc_e]}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button
        style={{
          position: 'absolute',
          bottom: '-5rem'
          }}
          title={'Tap to Scan Again' }
          onPress={() => setScanned(false)}
        />}
    </View>
  );
}