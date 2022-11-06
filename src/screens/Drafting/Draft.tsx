import React, { ReactElement } from 'react';
import { Text, View, Pressable, Switch } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { styles } from './styles';
import { Job } from '../../types/types';
import { createJob } from '../../firebase/firestore/job';
import { ScrollView } from 'react-native-gesture-handler';
import FormInput from '../../components/JobCard/FormInput';
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

  // const submit: any = async () => {
  //   const job: Job = {
  //     date: new Date(),
  //     companyName: 'company',
  //     address: '123',
  //     contactPerson: 'contact',
  //     phone: '123-456-7890',
  //     jobPosition: 'pos',
  //     languageRequirement: 'req',
  //     workingHours: '1',
  //     workingDays: '1',
  //     salary: parseFloat(salary),
  //     probationPeriod: '',
  //     employeeBenefit: '',
  //     otherInfo: ''
  //   };
  //   await createJob(job);
  //   setModalVisible(!modalVisible);
  // };

  type FormValues = () => {
    date: String;
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const { ...methods } = useForm();

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
          <View>
            <View>
              <Switch
                onValueChange={() => setDateIsEnabled(!dateIsEnabled)}
                value={dateIsEnabled}
              />
              <Text>Date</Text>
            </View>
            <FormInput name="date" label="date" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setCompanyNameIsEnabled(!companyNameIsEnabled)}
                value={companyNameIsEnabled}
              />
              <Text>Company Name</Text>
            </View>
            <FormInput name="companyName" label="companyName" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setAddressIsEnabled(!addressIsEnabled)}
                value={addressIsEnabled}
              />
              <Text>Address</Text>
            </View>
            <FormInput name="address" label="address" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setContactPersonIsEnabled(!contactPersonIsEnabled)}
                value={contactPersonIsEnabled}
              />
              <Text>Contact Person</Text>
            </View>
            <FormInput name="contactPerson" label="contactPerson" />?
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setPhoneIsEnabled(!phoneIsEnabled)}
                value={phoneIsEnabled}
              />
              <Text>Phone</Text>
            </View>
            <FormInput name="phone" label="phone" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setJobPositionIsEnabled(!jobPositionIsEnabled)}
                value={jobPositionIsEnabled}
              />
              <Text>Job Position</Text>
            </View>
            <FormInput name="jobPosition" label="jobPosition" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setLangaugeReqIsEnabled(!languageReqIsEnabled)}
                value={languageReqIsEnabled}
              />
              <Text>Language Requirement</Text>
            </View>
            <FormInput name="languageReq" label="languageReq" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setWorkingHoursIsEnabled(!workingHoursIsEnabled)}
                value={workingHoursIsEnabled}
              />
              <Text>Working hours/day</Text>
            </View>
            <FormInput name="workingHours" label="workingHours" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setWorkingDaysIsEnabled(!workingDaysIsEnabled)}
                value={workingDaysIsEnabled}
              />
              <Text>Working days/week</Text>
            </View>
            <FormInput name="workingDays" label="workingDays" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setSalaryIsEnabled(!salaryIsEnabled)}
                value={salaryIsEnabled}
              />
              <Text>Salary</Text>
            </View>
            <FormInput name="salary" label="salary" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setProbationPeriodIsEnabled(!probationPeriodIsEnabled)}
                value={probationPeriodIsEnabled}
              />
              <Text>Probation Period (If any)</Text>
            </View>
            <FormInput name="probationPeriod" label="probationPeriod" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setEmployeeBenefitIsEnabled(!employeeBenefitIsEnabled)}
                value={employeeBenefitIsEnabled}
              />
              <Text>Employee Benefit (If any)</Text>
            </View>
            <FormInput name="employeeBenefit" label="employeeBenefit" />
          </View>

          <View>
            <View>
              <Switch
                onValueChange={() => setOtherInfoIsEnabled(!otherInfoIsEnabled)}
                value={otherInfoIsEnabled}
              />
              <Text>Other Information</Text>
            </View>
            <FormInput name="otherInfo" label="otherInfo" />
          </View>
        </FormProvider>
      </ScrollView>
      <Button title="Post" style={styles.button} onPress={methods.handleSubmit(onSubmit)} />
      <Button title="Back" style={styles.button} onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default DraftScreen;
