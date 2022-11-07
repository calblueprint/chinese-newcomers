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
import navigation from '../../navigation';

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
    companyName: string;
    address: string;
    contactPerson: string;
    phone: string;
    jobPosition: string;
    languageRequirement: string;
    workingHours: string;
    workingDays: string;
    salary: string;
    probationPeriod: string;
    employeeBenefit: string;
    otherInfo: string;
  }
  const { ...methods } = useForm();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const map = new Map<string, boolean>();
    map.set('date', dateIsEnabled);
    map.set('companyName', companyNameIsEnabled);
    map.set('address', addressIsEnabled);
    map.set('contactPerson', contactPersonIsEnabled);
    map.set('phone', phoneIsEnabled);
    map.set('jobPosition', jobPositionIsEnabled);
    map.set('languageRequirement', languageReqIsEnabled);
    map.set('workingHours', workingHoursIsEnabled);
    map.set('workingDays', workingDaysIsEnabled);
    map.set('salary', salaryIsEnabled);
    map.set('probationPeriod', probationPeriodIsEnabled);
    map.set('employeeBenefit', employeeBenefitIsEnabled);
    map.set('otherInfo', otherInfoIsEnabled);
    const job: Job = {
      id: 'id',
      date: data.date,
      companyName: data.companyName,
      address: data.address,
      contactPerson: data.contactPerson,
      phone: data.phone,
      jobPosition: data.jobPosition,
      languageRequirement: data.languageRequirement,
      workingHours: data.workingHours,
      workingDays: data.workingDays,
      salary: data.salary,
      probationPeriod: data.probationPeriod,
      employeeBenefit: data.employeeBenefit,
      otherInfo: data.otherInfo,
      visible: map
    };
    console.log(job);
    await createJob(job);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>#refid</Text>
        <Text>Temp</Text>
        <Text>
          All fields are required. The toggle allows you to choose whether the information is
          displayed publicly, except when marked with *.
        </Text>
      </View>
      <ScrollView style={styles.form}>
        <FormProvider {...methods}>
          <View style={styles.formTop}>
            <Switch onValueChange={() => setDateIsEnabled(!dateIsEnabled)} value={dateIsEnabled} />
            <Text style={styles.formText}>Date*</Text>
          </View>
          <FormInput name="date" label="date" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setCompanyNameIsEnabled(!companyNameIsEnabled)}
              value={companyNameIsEnabled}
            />
            <Text style={styles.formText}>Company Name</Text>
          </View>
          <FormInput name="companyName" label="companyName" placeholder=" Lucky Dim Sum" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setAddressIsEnabled(!addressIsEnabled)}
              value={addressIsEnabled}
            />
            <Text style={styles.formText}>Address</Text>
          </View>
          <FormInput name="address" label="address" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setContactPersonIsEnabled(!contactPersonIsEnabled)}
              value={contactPersonIsEnabled}
            />
            <Text style={styles.formText}>Contact Person</Text>
          </View>
          <FormInput name="contactPerson" label="contactPerson" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setPhoneIsEnabled(!phoneIsEnabled)}
              value={phoneIsEnabled}
            />
            <Text style={styles.formText}>Phone</Text>
          </View>
          <FormInput name="phone" label="phone" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setJobPositionIsEnabled(!jobPositionIsEnabled)}
              value={jobPositionIsEnabled}
            />
            <Text style={styles.formText}>Job Position*</Text>
          </View>
          <FormInput name="jobPosition" label="jobPosition" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setLangaugeReqIsEnabled(!languageReqIsEnabled)}
              value={languageReqIsEnabled}
            />
            <Text style={styles.formText}>Language Requirement*</Text>
          </View>
          <FormInput name="languageRequirement" label="languageRequirement" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setWorkingHoursIsEnabled(!workingHoursIsEnabled)}
              value={workingHoursIsEnabled}
            />
            <Text style={styles.formText}>Working hours/day</Text>
          </View>
          <FormInput name="workingHours" label="workingHours" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setWorkingDaysIsEnabled(!workingDaysIsEnabled)}
              value={workingDaysIsEnabled}
            />
            <Text style={styles.formText}>Working days/week</Text>
          </View>
          <FormInput name="workingDays" label="workingDays" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setSalaryIsEnabled(!salaryIsEnabled)}
              value={salaryIsEnabled}
            />
            <Text style={styles.formText}>Salary</Text>
          </View>
          <FormInput name="salary" label="salary" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setProbationPeriodIsEnabled(!probationPeriodIsEnabled)}
              value={probationPeriodIsEnabled}
            />
            <Text style={styles.formText}>Probation Period (if any)</Text>
          </View>
          <FormInput name="probationPeriod" label="probationPeriod" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setEmployeeBenefitIsEnabled(!employeeBenefitIsEnabled)}
              value={employeeBenefitIsEnabled}
            />
            <Text style={styles.formText}>Employee Benefit (if any)</Text>
          </View>
          <FormInput name="employeeBenefit" label="employeeBenefit" />

          <View style={styles.formTop}>
            <Switch
              onValueChange={() => setOtherInfoIsEnabled(!otherInfoIsEnabled)}
              value={otherInfoIsEnabled}
            />
            <Text style={styles.formText}>Other Information</Text>
          </View>
          <FormInput name="otherInfo" label="otherInfo" />
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
