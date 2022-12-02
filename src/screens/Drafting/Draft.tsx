import React, { ReactElement } from 'react';
import { Text, View, Pressable, Switch } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { styles } from './styles';
import { Job } from '../../types/types';
import { createJob } from '../../firebase/firestore/job';
import { ScrollView } from 'react-native-gesture-handler';
import FormInput from '../../components/JobPostFormInput/JobPostFormInput';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const auth = getAuth();

const DraftScreen = ({ navigation }: any): ReactElement => {
  const { user } = useAuthentication();

  const [dateIsEnabled, setDateIsEnabled] = React.useState(false);
  const [companyNameIsEnabled, setCompanyNameIsEnabled] = React.useState(false);
  const [addressIsEnabled, setAddressIsEnabled] = React.useState(false);
  const [contactPersonIsEnabled, setContactPersonIsEnabled] = React.useState(false);
  const [phoneIsEnabled, setPhoneIsEnabled] = React.useState(false);
  const [jobPositionIsEnabled, setJobPositionIsEnabled] = React.useState(false);
  const [languageReqIsEnabled, setLangaugeReqIsEnabled] = React.useState(false);
  const [workingHoursIsEnabled, setWorkingHoursIsEnabled] = React.useState(false);
  const [workingDaysIsEnabled, setWorkingDaysIsEnabled] = React.useState(false);
  const [salaryIsEnabled, setSalaryIsEnabled] = React.useState(false);
  const [probationPeriodIsEnabled, setProbationPeriodIsEnabled] = React.useState(false);
  const [employeeBenefitIsEnabled, setEmployeeBenefitIsEnabled] = React.useState(false);
  const [otherInfoIsEnabled, setOtherInfoIsEnabled] = React.useState(false);

  interface FormValues {
    date: string;
    dateIsEnabled: boolean;
    companyName: string;
    companyIsEnabled: boolean;
    address: string;
    addressIsEnabled: boolean;
    contactPerson: string;
    contactIsEnabled: boolean;
    phone: string;
    phoneIsEnabled: boolean;
    jobPosition: string;
    jobPositionIsEnabled: boolean;
    languageRequirement: string;
    languageRequirementIsEnabled: boolean;
    workingHours: string;
    workingHoursIsEnabled: boolean;
    workingDays: string;
    workingDaysIsEnabled: boolean;
    salary: string;
    salaryIsEnabled: boolean;
    probationPeriod: string;
    probationPeriodIsEnabled: boolean;
    employeeBenefit: string;
    employeeBenefitIsEnabled: boolean;
    otherInfo: string;
    otherInfoIsEnabled: boolean;
  }
  const { ...methods } = useForm();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const map = new Map<string, boolean>();
    map.set('date', data.dateIsEnabled);
    map.set('address', data.addressIsEnabled);
    map.set('contactPerson', data.contactIsEnabled);
    map.set('phone', data.phoneIsEnabled);
    map.set('jobPosition', data.jobPositionIsEnabled);
    map.set('languageRequirement', data.languageRequirementIsEnabled);
    map.set('workingHours', data.workingHoursIsEnabled);
    map.set('workingDays', data.workingDaysIsEnabled);
    map.set('salary', data.salaryIsEnabled);
    map.set('probationPeriod', data.probationPeriodIsEnabled);
    map.set('employeeBenefit', data.employeeBenefitIsEnabled);
    map.set('otherInfo', data.otherInfoIsEnabled);
    const job: Partial<Job> = {
      date: data.date || '',
      companyName: data.companyName || '',
      address: data.address || '',
      contactPerson: data.contactPerson || '',
      phone: data.phone || '',
      jobPosition: data.jobPosition || '',
      languageRequirement: data.languageRequirement || '',
      workingHours: data.workingHours || '',
      workingDays: data.workingDays || '',
      salary: data.salary || '',
      probationPeriod: data.probationPeriod || '',
      employeeBenefit: data.employeeBenefit || '',
      otherInfo: data.otherInfo || '',
      visible: Object.fromEntries(map)
    };
    try {
      await createJob(job);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <View style={styles.top}>
          <Text style={styles.refId}>#refid</Text>
          <Text style={styles.formTitle}>Temp</Text>
          <Text style={{ fontSize: 12 }}>
            All fields are required. The toggle allows you to choose whether the information is
            displayed publicly, except when marked with *.
          </Text>
        </View>
        <FormProvider {...methods}>
          <FormInput name="date" label="date" placeholder=" 10/27/2022" />
          <FormInput name="companyName" label="companyName" placeholder=" Lucky Dim Sum" />
          <FormInput name="address" label="address" placeholder=" 2400 Durant Ave., Berkeley, CA" />
          <FormInput name="contactPerson" label="contactPerson" placeholder=" Amelia Bedelia" />
          <FormInput name="phone" label="phone" placeholder=" (510) xxx - xxxx" />
          <FormInput name="jobPosition" label="jobPosition" placeholder=" Waiter, waitress" />
          <FormInput
            name="languageRequirement"
            label="languageRequirement"
            placeholder=" Cantonese, English"
          />
          <FormInput name="workingHours" label="workingHours" placeholder=" 4 - 8 hrs/day" />
          <FormInput name="workingDays" label="workingDays" placeholder=" 3 - 5 days/week" />
          <FormInput name="salary" label="salary" placeholder=" $36/hr" />
          <FormInput name="probationPeriod" label="probationPeriod" placeholder=" None" />
          <FormInput
            name="employeeBenefit"
            label="employeeBenefit"
            placeholder=" Insurance, paid leave, etc."
          />
          <FormInput name="otherInfo" label="otherInfo" placeholder=" Looking for XYZ, etc." />
        </FormProvider>
        <View style={styles.bottomButtons}>
          <Pressable style={[styles.buttons, { backgroundColor: '#94613D' }]}>
            <Text style={styles.buttonText}>Save to Drafts</Text>
          </Pressable>
          <Pressable
            onPress={methods.handleSubmit(onSubmit)}
            style={[styles.buttons, { backgroundColor: '#CC433C' }]}>
            <Text style={styles.buttonText}>Post Job</Text>
          </Pressable>
        </View>
      </ScrollView>
      {/* <Button title="Back" style={styles.button} onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
};

export default DraftScreen;
