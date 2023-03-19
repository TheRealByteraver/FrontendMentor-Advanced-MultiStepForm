import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"; 

// Import the encapsulating layout for the multi step form:
import FormFrame from './FormFrame';

// Import each input group of the multi-step form
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const OnBoarding = ({submitHandler: submitData}) => {

  const addOnOptions = [
    { id: 0, title: 'Online service', description: 'Access to multiplayer games', monthly: '+$1/mo', yearly: '+$10/yr' },
    { id: 1, title: 'Larger storage', description: 'Extra 1TB of cloud save', monthly: '+$2/mo', yearly: '+$20/yr' },
    { id: 2, title: 'Customizable profile', description: 'Custom theme on your profile', monthly: '+$2/mo', yearly: '+$20/yr' }
  ];

  // custom error messages
  const schema = yup.object().shape({
    fullName: yup.string().required('The Name field is required'), 
    emailAddress: yup.string().email('Your email address is not valid').required('An email address is required'),
    phoneNumber: yup.number().typeError('Please enter a valid phone number').positive('').integer().required('A phone number is required'),
  });

  const defaultFormValues = {
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    subscriptionType: 'Arcade',
    billingType: 'Monthly',
    'Online service': false,
    'Larger storage': false,
    'Customizable profile': false,
  };

  const formHook = useForm({
    mode: 'onChange', 
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema),
  });

  // keep track of which step/ page we are on in the multi step form
  const [pageNr, setPageNr] = useState(1); 

  return (
    <FormFrame {...{formHook, pageNr, setPageNr, submitData}} >
      <form>
        {(pageNr === 1) && <Step1 formHook={formHook} />}
        {(pageNr === 2) && <Step2 formHook={formHook} /> }
        {(pageNr === 3) && <Step3 {...{formHook, addOnOptions }} /> }
        {(pageNr === 4) && <Step4 {...{formHook, addOnOptions, setPageNr }} /> }
        {(pageNr === 5) && <Step5 />}
      </form>
    </FormFrame>
  );
}

export default OnBoarding;