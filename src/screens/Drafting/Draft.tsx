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
          {/* <View style={styles.formTop}>
            <Switch onValueChange={() => setDateIsEnabled(!dateIsEnabled)} value={dateIsEnabled} />
            <Text style={styles.formText}>Date*</Text>
          </View> */}
          <FormInput name="date" label="date" placeholder=" 10/27/2022" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setCompanyNameIsEnabled(!companyNameIsEnabled)}
              value={companyNameIsEnabled}
            />
            <Text style={styles.formText}>Company Name</Text>
          </View> */}
          <FormInput name="companyName" label="companyName" placeholder=" Lucky Dim Sum" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setAddressIsEnabled(!addressIsEnabled)}
              value={addressIsEnabled}
            />
            <Text style={styles.formText}>Address</Text>
          </View> */}
          <FormInput name="address" label="address" placeholder=" 2400 Durant Ave., Berkeley, CA" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setContactPersonIsEnabled(!contactPersonIsEnabled)}
              value={contactPersonIsEnabled}
            />
            <Text style={styles.formText}>Contact Person</Text>
          </View> */}
          <FormInput name="contactPerson" label="contactPerson" placeholder=" Amelia Bedelia" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setPhoneIsEnabled(!phoneIsEnabled)}
              value={phoneIsEnabled}
            />
            <Text style={styles.formText}>Phone</Text>
          </View> */}
          <FormInput name="phone" label="phone" placeholder=" (510) xxx - xxxx" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setJobPositionIsEnabled(!jobPositionIsEnabled)}
              value={jobPositionIsEnabled}
            />
            <Text style={styles.formText}>Job Position*</Text>
          </View> */}
          <FormInput name="jobPosition" label="jobPosition" placeholder=" Waiter, waitress" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setLangaugeReqIsEnabled(!languageReqIsEnabled)}
              value={languageReqIsEnabled}
            />
            <Text style={styles.formText}>Language Requirement*</Text>
          </View> */}
          <FormInput
            name="languageRequirement"
            label="languageRequirement"
            placeholder=" Cantonese, English"
          />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setWorkingHoursIsEnabled(!workingHoursIsEnabled)}
              value={workingHoursIsEnabled}
            />
            <Text style={styles.formText}>Working hours/day</Text>
          </View> */}
          <FormInput name="workingHours" label="workingHours" placeholder=" 4 - 8 hrs/day" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setWorkingDaysIsEnabled(!workingDaysIsEnabled)}
              value={workingDaysIsEnabled}
            />
            <Text style={styles.formText}>Working days/week</Text>
          </View> */}
          <FormInput name="workingDays" label="workingDays" placeholder=" 3 - 5 days/week" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setSalaryIsEnabled(!salaryIsEnabled)}
              value={salaryIsEnabled}
            />
            <Text style={styles.formText}>Salary</Text>
          </View> */}
          <FormInput name="salary" label="salary" placeholder=" $36/hr" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setProbationPeriodIsEnabled(!probationPeriodIsEnabled)}
              value={probationPeriodIsEnabled}
            />
            <Text style={styles.formText}>Probation Period (if any)</Text>
          </View> */}
          <FormInput name="probationPeriod" label="probationPeriod" placeholder=" None" />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setEmployeeBenefitIsEnabled(!employeeBenefitIsEnabled)}
              value={employeeBenefitIsEnabled}
            />
            <Text style={styles.formText}>Employee Benefit (if any)</Text>
          </View> */}
          <FormInput
            name="employeeBenefit"
            label="employeeBenefit"
            placeholder=" Insurance, paid leave, etc."
          />

          {/* <View style={styles.formTop}>
            <Switch
              onValueChange={() => setOtherInfoIsEnabled(!otherInfoIsEnabled)}
              value={otherInfoIsEnabled}
            />
            <Text style={styles.formText}>Other Information</Text>
          </View> */}
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
