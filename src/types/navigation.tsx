import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  AdminRegisterScreen: { phoneNumber: string };
  EmployerRegisterScreen: { phoneNumber: string };
  AdminSigninScreen: undefined;
  PhoneNumberScreen: undefined;
  SigninScreen: undefined;
  VerificationScreen: { verificationId: string; phoneNumber: string };
  UserTypeScreen: { verificationId: string, verificationCode: string, phoneNumber: string };
  WelcomeScreen: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type ApprovalStackParamList = {
  ApprovalScreen: undefined;
};

export type ApprovalStackScreenProps<T extends keyof ApprovalStackParamList> =
  NativeStackScreenProps<ApprovalStackParamList, T>;

export type DraftStackParamList = {
  DraftScreen: undefined;
  FeedScreen: undefined;
};

export type DraftStackScreenProps<T extends keyof DraftStackParamList> =
  NativeStackScreenProps<DraftStackParamList, T>;

export type FeedStackParamList = {
  FeedScreen: undefined;
};

export type FeedStackScreenProps<T extends keyof FeedStackParamList> =
  NativeStackScreenProps<FeedStackParamList, T>;

export type SignoutStackParamList = {
  SignoutScreen: undefined;
  AccessScreen: undefined;
};

export type SignoutStackScreenProps<T extends keyof SignoutStackParamList> =
  NativeStackScreenProps<SignoutStackParamList, T>;

export type BookmarksStackParamList = {
  BookmarksScreen: undefined;
};

export type BookmarksStackScreenProps<T extends keyof BookmarksStackParamList> =
  NativeStackScreenProps<BookmarksStackParamList, T>;

export type BottomTabParamList = {
  Feed: undefined;
  Draft: undefined;
  Approval: undefined;
  Signout: undefined;
  Bookmarks: undefined;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  MaterialBottomTabNavigationProp<BottomTabParamList, T>;
