import {Platform} from 'react-native';

export const SERVICE_URL =
  Platform.OS === 'ios' ? 'http://localhost:3030' : 'http://10.0.2.2:3030';
