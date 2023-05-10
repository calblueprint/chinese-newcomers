import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  EmailPasswordRegisterScreen: { phoneNumber: string; userType: string };
  EmployerRegisterScreen: { phoneNumber: string };
  AdminSigninScreen: undefined;
  PhoneNumberScreen: { userType: string };
  SigninScreen: undefined;
  VerificationScreen: {
    verificationId: string;
    phoneNumber: string;
    userType: string;
  };
  UserTypeScreen: undefined;
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

export type EmployerStackParamList = {
  EmployerHome: undefined;
};

export type EmployerStackScreenProps<T extends keyof EmployerStackParamList> =
  NativeStackScreenProps<EmployerStackParamList, T>;

export type FeedStackParamList = {
  FeedScreen: undefined;
};

export type FeedStackScreenProps<T extends keyof FeedStackParamList> =
  NativeStackScreenProps<FeedStackParamList, T>;

export type AdminSettingsStackParamList = {
  AdminSettingsScreen: undefined;
  AccessScreen: undefined;
  EmployerApprovalScreen: undefined;
};

export type AdminSettingsStackScreenProps<
  T extends keyof AdminSettingsStackParamList,
> = NativeStackScreenProps<AdminSettingsStackParamList, T>;

export type BookmarksStackParamList = {
  BookmarksScreen: undefined;
};

export type BookmarksStackScreenProps<T extends keyof BookmarksStackParamList> =
  NativeStackScreenProps<BookmarksStackParamList, T>;

export type BottomTabParamList = {
  Feed: undefined;
  Draft: undefined;
  Approval: undefined;
  Bookmarks: undefined;
  Settings: undefined;
  Signout: undefined;
  EmployerHome: undefined;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  MaterialBottomTabNavigationProp<BottomTabParamList, T>;
