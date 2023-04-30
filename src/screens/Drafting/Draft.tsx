import { Timestamp } from 'firebase/firestore';
import React, { ReactElement, useState, useContext } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, Pressable, Switch, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/JobPostFormInput/JobPostFormInput';
import StyledButton from '../../components/StyledButton/StyledButton';
import { GetText } from '../../context/AuthContext';
import { createJob } from '../../firebase/firestore/job';
import { DraftStackScreenProps } from '../../types/navigation';
import { Job } from '../../types/types';
import styles from './styles';
import { AuthContext } from '../../context/AuthContext';
import { addCreatedJobs } from '../../firebase/firestore/employer';

function DraftScreen({
  navigation,
}: DraftStackScreenProps<'DraftScreen'>): ReactElement {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const categories: string[] = [
    'factory',
    'caretaker',
    'restaurant',
    'construction',
    'sales',
    'driver',
    'education',
    'finance',
    'management',
    'IT',
    'other',
  ];

  // const [dateIsEnabled, setDateIsEnabled] = React.useState(true);
  const [companyNameIsEnabled, setCompanyNameIsEnabled] = React.useState(true);
  const [addressIsEnabled, setAddressIsEnabled] = React.useState(true);
  const [contactPersonIsEnabled, setContactPersonIsEnabled] =
    React.useState(true);
  const [phoneIsEnabled, setPhoneIsEnabled] = React.useState(true);
  const [jobPositionIsEnabled, setJobPositionIsEnabled] = React.useState(true);
  const [languageReqIsEnabled, setLangaugeReqIsEnabled] = React.useState(true);
  const [workingHoursIsEnabled, setWorkingHoursIsEnabled] =
    React.useState(true);
  const [workingDaysIsEnabled, setWorkingDaysIsEnabled] = React.useState(true);
  const [salaryIsEnabled, setSalaryIsEnabled] = React.useState(true);
  const [probationPeriodIsEnabled, setProbationPeriodIsEnabled] =
    React.useState(true);
  const [employeeBenefitIsEnabled, setEmployeeBenefitIsEnabled] =
    React.useState(true);
  const [otherInfoIsEnabled, setOtherInfoIsEnabled] = React.useState(true);

  const [successModalVisibile, setSuccessModalVisible] = React.useState(false);
  const [modalJobText, setModalJobText] = React.useState('');

  interface FormValues {
    // date: Date;
    creator: string;
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
    category: string;
    otherInfo: string;
  }
  const { ...methods } = useForm<FormValues>();
  const { userObject } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const map = new Map<string, boolean>();
    map.set('date', true);
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
    const job: Partial<Job> = {
      date: new Timestamp(new Date().getTime() / 1000, 0),
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
      category,
      otherInfo: data.otherInfo || '',
      visible: Object.fromEntries(map),
    };
    try {
      if (userObject === null) {
        console.log('User not found');
      } else {
        await createJob(job, 'notApprovedJobs', userObject?.id);
        console.log("created job");
      }
      setModalJobText(data.jobPosition);
      setSuccessModalVisible(true);
      await createJob(job, 'notApprovedJobs');
      methods.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.form}>
        <View style={styles.formContainer}>
          <View style={styles.top}>
            <Text style={{ fontSize: 12, fontFamily: 'DMSans_400Regular' }}>
              {GetText('Toggles determine what information is displayed')}
            </Text>
          </View>
          <FormProvider {...methods}>
            <View style={styles.formTop}>
              <Text
                style={[styles.formText, { marginLeft: 0, marginBottom: 4 }]}
              >
                Category
              </Text>
            </View>
            <DropDownPicker
              open={open}
              value={category}
              items={categories.map(c => ({ label: c, value: c }))}
              setOpen={setOpen}
              setValue={setCategory}
              listMode="SCROLLVIEW"
              containerStyle={{ width: '100%', marginBottom: 10, height: '3%' }}
              textStyle={{ fontFamily: 'DMSans_500Medium' }}
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() =>
                  setJobPositionIsEnabled(!jobPositionIsEnabled)
                }
                value={jobPositionIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>{GetText('Job Position')}</Text>
            </View>
            <FormInput
              name="jobPosition"
              label="jobPosition"
              placeholder="Waiter, waitress"
              rules={{ required: 'Job Position is required!' }}
            />
            {methods.formState.errors.jobPosition != null && (
              <Text>Please check the Job Position.</Text>
            )}

            <View style={styles.formTop}>
              <Switch
                onValueChange={() => setPhoneIsEnabled(!phoneIsEnabled)}
                value={phoneIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>{GetText('Phone')}</Text>
            </View>
            <FormInput
              name="phone"
              label="phone"
              placeholder="(510) xxx - xxxx"
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() => setAddressIsEnabled(!addressIsEnabled)}
                value={addressIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>{GetText('Address/Location')}</Text>
            </View>
            <FormInput
              name="address"
              label="address"
              placeholder="2400 Durant Ave., Berkeley, CA"
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() =>
                  setLangaugeReqIsEnabled(!languageReqIsEnabled)
                }
                value={languageReqIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>
                {GetText('Language Requirement')}
              </Text>
            </View>
            <FormInput
              name="languageRequirement"
              label="languageRequirement"
              placeholder="Cantonese, English"
              rules={{ required: 'Language Requirement is required!' }}
            />
            {methods.formState.errors.languageRequirement != null && (
              <Text>Please check the Language Requirement.</Text>
            )}

            <View style={styles.formTop}>
              <Switch
                onValueChange={() =>
                  setCompanyNameIsEnabled(!companyNameIsEnabled)
                }
                value={companyNameIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>{GetText('Company Name')}</Text>
            </View>
            <FormInput
              name="companyName"
              label="companyName"
              placeholder="Lucky Dim Sum"
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() =>
                  setContactPersonIsEnabled(!contactPersonIsEnabled)
                }
                value={contactPersonIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>{GetText('Contact Person')}</Text>
            </View>
            <FormInput
              name="contactPerson"
              label="contactPerson"
              placeholder="Amelia Bedelia"
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() =>
                  setWorkingHoursIsEnabled(!workingHoursIsEnabled)
                }
                value={workingHoursIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>
                {GetText('Working hours/day')}
              </Text>
            </View>
            <FormInput
              name="workingHours"
              label="workingHours"
              placeholder="4 - 8 hrs/day"
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() =>
                  setWorkingDaysIsEnabled(!workingDaysIsEnabled)
                }
                value={workingDaysIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>
                {GetText('Working days/week')}
              </Text>
            </View>
            <FormInput
              name="workingDays"
              label="workingDays"
              placeholder="3 - 5 days/week"
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() => setSalaryIsEnabled(!salaryIsEnabled)}
                value={salaryIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>{GetText('Salary')}</Text>
            </View>
            <FormInput name="salary" label="salary" placeholder="$36/hr" />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() =>
                  setProbationPeriodIsEnabled(!probationPeriodIsEnabled)
                }
                value={probationPeriodIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>{GetText('Probation Period')}</Text>
            </View>
            <FormInput
              name="probationPeriod"
              label="probationPeriod"
              placeholder="None"
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() =>
                  setEmployeeBenefitIsEnabled(!employeeBenefitIsEnabled)
                }
                value={employeeBenefitIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>{GetText('Employee Benefit')}</Text>
            </View>
            <FormInput
              name="employeeBenefit"
              label="employeeBenefit"
              placeholder="Insurance, paid leave, etc."
            />

            <View style={styles.formTop}>
              <Switch
                onValueChange={() => setOtherInfoIsEnabled(!otherInfoIsEnabled)}
                value={otherInfoIsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
              />
              <Text style={styles.formText}>
                {GetText('Other Information')}
              </Text>
            </View>
            <FormInput
              name="otherInfo"
              label="otherInfo"
              placeholder="Looking for XYZ, etc."
            />
          </FormProvider>
          <View style={styles.bottomButtons}>
            <Pressable style={[styles.buttons, { backgroundColor: '#94613D' }]}>
              <Text style={styles.buttonText}>{GetText('Save Draft')}</Text>
            </Pressable>
            <Pressable
              onPress={methods.handleSubmit(onSubmit)}
              style={[styles.buttons, { backgroundColor: '#CC433C' }]}
            >
              <Text style={styles.buttonText}>{GetText('Post Job')}</Text>
            </Pressable>
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* <Button title="Back" style={styles.button} onPress={() => navigation.navigate('Home')} /> */}
      <Modal visible={successModalVisibile} transparent animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              Congratulations! You&apos;ve submitted a job posting for{' '}
              {modalJobText}.
            </Text>

            <StyledButton
              text="POST ANOTHER JOB"
              textStyle={{ color: '#CC433C' }}
              buttonStyle={{ backgroundColor: 'white', width: '100%' }}
              onPress={() => {
                navigation.goBack();
                setSuccessModalVisible(false);
                navigation.navigate('DraftScreen');
              }}
            />
            <StyledButton
              text="VIEW JOB FEED"
              textStyle={{}}
              buttonStyle={{ width: '100%' }}
              onPress={() => {
                navigation.goBack();
                setSuccessModalVisible(false);
                navigation.navigate('FeedScreen');
              }}
            />
            <Pressable
              onPress={() => setSuccessModalVisible(false)}
              style={styles.modalX}
            >
              <Text>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default DraftScreen;
