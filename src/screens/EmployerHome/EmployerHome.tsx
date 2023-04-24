import React, { useEffect, useState } from 'react';
import useFirestoreListener from "react-firestore-listener"
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Logo from '../../assets/cnsc-logo.png';
import JobCard from '../../components/JobCard/JobCard';
import { FeedStackScreenProps } from '../../types/navigation';
import { Job } from '../../types/types';
import styles from './styles';

