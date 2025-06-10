import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const openSettings = () => {
  Linking.openSettings().catch(() => Alert.alert('Unable to open settings'));
};

export const checkLocationPermission = async (): Promise<boolean> => {
  const perm =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const status = await check(perm);
  console.log('status:::', status);

  return status === RESULTS.GRANTED;
};

export const requestLocationPermission = async (): Promise<boolean> => {
  const perm =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const result = await request(perm);
  if (result === RESULTS.GRANTED) return true;

  Alert.alert(
    'Permission Required',
    'Location access is needed. Please allow it in Settings.',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Open Settings', onPress: openSettings},
    ],
    {cancelable: true},
  );
  return false;
};
