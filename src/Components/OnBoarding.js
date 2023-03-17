import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"; 

// This component draws the little page nrs in their circle, with a description
import PageNumbers from "./PageNumbers";

// This component proves the 'Go Back' and 'Next' / 'Confirm' buttons at the form's bottom
import GoBackNextButtonGroup from './GoBackNextButtonGroup';

// Import each input group of the multi-step form
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const OnBoarding = ({submitHandler: submitData}) => {
  const nrOfPages = 4;

  const stepTitles = [
    {
      header: 'Personal info',
      description: 'Please provide your name, email address, and phone number.',
    },
    {
      header: 'Select your plan',
      description: 'You have the option of monthly or yearly billing.',
    },
    {
      header: 'Pick add-ons',
      description: 'Add-ons help enhance your gaming experience.',
    },
    {
      header: 'Finishing Up',
      description: 'Double-check everything looks OK before confirming.',
    },
  ];

  const addOnOptions = [
    { id: 0, title: 'Online service', description: 'Access to multiplayer games', monthly: '+$1/mo', yearly: '+$10/yr' },
    { id: 1, title: 'Larger storage', description: 'Extra 1TB of cloud save', monthly: '+$2/mo', yearly: '+$20/yr' },
    { id: 2, title: 'Customizable profile', description: 'Custom theme on your profile', monthly: '+$2/mo', yearly: '+$20/yr' }
  ];

  const schema = yup.object().shape({
    fullName: yup.string().required('The Name field is required'), // custom error message
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

  // subscriptionTypes = ['Arcade', 'Advanced', 'Pro']
  const [subscriptionType, setSubscriptionType] = useState(defaultFormValues.subscriptionType); 

  // billingTypes = ['Monthly', 'Yearly']
  const [billingType, setBillingType] = useState(defaultFormValues.billingType);

  return (
    // background, center child
    <div className='bg-[#eef5ff] h-full lg:h-screen lg:flex lg:justify-center lg:items-center'>

      {/* main container */}
      <div className='h-full relative lg:shadow-lg lg:w-[1000px] lg:h-[564px] lg:rounded-lg lg:bg-white lg:p-4'>

        {/* page numbers with background image */}
        <PageNumbers nrOfPages={nrOfPages} activePage={pageNr} />

        {/* Form & button group container */}
        <div className='h-full lg:overflow-hidden lg:pb-4 lg:relative lg:mr-20 lg:pl-20'>

          {/* form with title and description */}
          <div className='-mt-[4.8rem] mx-4 p-6 bg-white rounded-lg shadow-lg lg:shadow-none lg:mt-2 lg:mx-0'> 

            {pageNr <= nrOfPages && 
              <>
                <h1 className='text-[#02295a] text-xl font-bold mt-1'>{stepTitles[pageNr - 1].header}</h1>
                <p className='mt-2 text-md text-[#9699ab]'>{stepTitles[pageNr - 1].description}</p>
              </>
            }

            <form 
              id='hook-form'
              // onSubmit={handleSubmit(submitHandler)} // not used
              >
              {(pageNr === 1) && <Step1 {...{formHook}} />}
              {(pageNr === 2) && <Step2 {...{formHook, billingType, setBillingType, subscriptionType, setSubscriptionType}} /> }
              {(pageNr === 3) && <Step3 {...{formHook, billingType, addOnOptions }} /> }
              {(pageNr === 4) && <Step4 {...{formHook, billingType, subscriptionType, addOnOptions, setPageNr }} /> }
              {(pageNr === 5) && <Step5 />}
            </form>
          </div>

          {/* Make sure that the user can scroll down to the bottom of the form */}
          <div className='w-full h-[700px]'></div>

          <GoBackNextButtonGroup {...{ formHook, pageNr, setPageNr, nrOfPages, submitData }} />
        </div>
      </div>
    </div>
  );
}

export default OnBoarding;