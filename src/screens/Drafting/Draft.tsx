import React, { ReactElement, useReducer, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  Switch,
  Modal,
  SafeAreaView,
} from 'react-native';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { Job } from '../../types/types';
import { createJob } from '../../firebase/firestore/job';
import FormInput from '../../components/JobPostFormInput/JobPostFormInput';
import StyledButton from '../../components/StyledButton/StyledButton';

type FieldViewProps = {
  title: string;
  placeholder: string;
  field: Field;
  toggle: (field: Field) => void;
  enabled: boolean;
  required: boolean;
  formState: ReturnType<typeof useForm>['formState'];
};
function FieldView({
  title,
  placeholder,
  field,
  toggle,
  enabled,
  required,
  formState,
}: FieldViewProps): ReactElement {
  return (
    <>
      <View style={styles.formTop}>
        <Switch
          onValueChange={() => toggle(field)}
          value={enabled}
          trackColor={{ false: '#767577', true: '#000000' }}
        />
        <Text style={styles.formText}>
          {title}
          {required ? '*' : ''}
        </Text>
      </View>
      <FormInput
        name={field}
        label={field}
        placeholder={placeholder}
        rules={required ? { required: `${title} is required!` } : {}}
      />
      {formState.errors[field] != null && <Text>Please check {title}.</Text>}
    </>
  );
}

const CATEGORIES: string[] = [
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

const FIELDS = [
  'date',
  'companyName',
  'address',
  'contactPerson',
  'phone',
  'jobPosition',
  'languageRequirement',
  'workingHours',
  'workingDays',
  'salary',
  'probationPeriod',
  'employeeBenefit',
  'otherInfo',
] as const;

type Field = (typeof FIELDS)[number];
type FormValues = {
  [key in Field]: string;
};

type EnabledFieldsState = {
  [key in Field]: boolean;
};
function enabledFieldsReducer(
  state: EnabledFieldsState,
  fieldToToggle: Field,
): EnabledFieldsState {
  return {
    ...state,
    [fieldToToggle]: !state[fieldToToggle],
  };
}

type DraftScreenProps = {
  navigation: { navigate: (to: string) => void; goBack: () => void };
};
function DraftScreen({ navigation }: DraftScreenProps): ReactElement {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [enabledFields, toggle] = useReducer(
    enabledFieldsReducer,
    Object.fromEntries(FIELDS.map(f => [f, true])) as EnabledFieldsState,
  );

  const [successModalVisibile, setSuccessModalVisible] = useState(false);
  const [modalJobText, setModalJobText] = useState('');

  const formMethods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const map = new Map<string, boolean>();
    FIELDS.forEach(field => {
      map.set(field, enabledFields[field]);
    });
    const job: Partial<Job> = {
      visible: Object.fromEntries(map),
    };
    FIELDS.forEach(field => {
      job[field] = data[field] || '';
    });
    try {
      await createJob(job, 'notApprovedJobs');
      setModalJobText(data.jobPosition);
      setSuccessModalVisible(true);
      formMethods.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.form}>
        <View style={styles.formContainer}>
          <View style={styles.top}>
            <Text style={styles.formTitle}>Job Post Draft</Text>
            <Text style={{ fontSize: 12, fontFamily: 'DMSans_400Regular' }}>
              Use the toggle to determine what information you want displayed in
              your public job posting.
            </Text>
          </View>
          <FormProvider {...formMethods}>
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
              items={CATEGORIES.map(c => ({ label: c, value: c }))}
              setOpen={setOpen}
              setValue={setCategory}
              listMode="SCROLLVIEW"
              containerStyle={{ width: '100%', marginBottom: 10, height: '3%' }}
              textStyle={{ fontFamily: 'DMSans_500Medium' }}
            />

            <FieldView
              title="Date"
              placeholder="MM/DD/YYYY"
              field="date"
              toggle={toggle}
              enabled={enabledFields.date}
              required
              formState={formMethods.formState}
            />

            <FieldView
              title="Company Name"
              placeholder="Lucky Dim Sum"
              field="companyName"
              toggle={toggle}
              enabled={enabledFields.companyName}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Address"
              placeholder="2400 Durant Ave., Berkeley, CA"
              field="address"
              toggle={toggle}
              enabled={enabledFields.address}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Contact Person"
              placeholder="Amelia Bedelia"
              field="contactPerson"
              toggle={toggle}
              enabled={enabledFields.contactPerson}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Phone"
              placeholder="(510) xxx - xxxx"
              field="phone"
              toggle={toggle}
              enabled={enabledFields.phone}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Job Position"
              placeholder="Waiter, waitress"
              field="jobPosition"
              toggle={toggle}
              enabled={enabledFields.jobPosition}
              required
              formState={formMethods.formState}
            />

            <FieldView
              title="Language Requirement"
              placeholder="Cantonese, English"
              field="languageRequirement"
              toggle={toggle}
              enabled={enabledFields.languageRequirement}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Working Hours/Day"
              placeholder="4 - 8 hrs/day"
              field="workingHours"
              toggle={toggle}
              enabled={enabledFields.workingHours}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Working Days/Week"
              placeholder="3 - 5 days/week"
              field="workingDays"
              toggle={toggle}
              enabled={enabledFields.workingDays}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Salary"
              placeholder="$36/hr"
              field="salary"
              toggle={toggle}
              enabled={enabledFields.salary}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Probation Period"
              placeholder="None"
              field="probationPeriod"
              toggle={toggle}
              enabled={enabledFields.probationPeriod}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Employee Benefit"
              placeholder="Insurance, paid leave, etc."
              field="employeeBenefit"
              toggle={toggle}
              enabled={enabledFields.employeeBenefit}
              required={false}
              formState={formMethods.formState}
            />

            <FieldView
              title="Other Information"
              placeholder="Looking for XYZ, etc."
              field="otherInfo"
              toggle={toggle}
              enabled={enabledFields.otherInfo}
              required={false}
              formState={formMethods.formState}
            />
          </FormProvider>
          <View style={styles.bottomButtons}>
            <Pressable style={[styles.buttons, { backgroundColor: '#94613D' }]}>
              <Text style={styles.buttonText}>Save to Drafts</Text>
            </Pressable>
            <Pressable
              onPress={formMethods.handleSubmit(onSubmit)}
              style={[styles.buttons, { backgroundColor: '#CC433C' }]}
            >
              <Text style={styles.buttonText}>Post Job</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
                navigation.navigate('Draft');
              }}
            />
            <StyledButton
              text="VIEW JOB FEED"
              textStyle={{}}
              buttonStyle={{ width: '100%' }}
              onPress={() => {
                navigation.goBack();
                setSuccessModalVisible(false);
                navigation.navigate('Feed');
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
    </SafeAreaView>
  );
}

export default DraftScreen;
