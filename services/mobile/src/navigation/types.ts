import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  VideoUpload: undefined;
  IncidentList: undefined;
  IncidentDetail: { incidentId: string };
  CreateIncident: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type VideoUploadScreenProps = NativeStackScreenProps<RootStackParamList, 'VideoUpload'>;
export type IncidentListScreenProps = NativeStackScreenProps<RootStackParamList, 'IncidentList'>;
export type IncidentDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'IncidentDetail'>;
export type CreateIncidentScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateIncident'>;
