import { useState } from 'react';
import { useForm, Controller, Radio, RadioGroup, FormControlLabel } from 'react-hook-form';

export default function Step2({submitHandler, data}) {
  const { handleSubmit, register } = useForm(data);

  const subscriptionTypes = ['Arcade', 'Advanced', 'Pro'];
  const [subscriptionType, setSubscriptionType] = useState(data.subscriptionType); 
  const billingTypes = ['Monthly', 'Yearly'];
  const [billingType, setBillingType] = useState(data.billingType);

  const getBillingOptions = (subscriptionType) => {
    const billingOptions = {
      'Arcade'  : { 'Monthly': '$9/mo', 'Yearly': '$90/yr', image: '/assets/images/icon-arcade.svg' },
      'Advanced': { 'Monthly': '$12/mo', 'Yearly': '$120/yr', image: '/assets/images/icon-advanced.svg' },
      'Pro'     : { 'Monthly': '$15/mo', 'Yearly': '$150/yr', image: '/assets/images/icon-pro.svg' },
    };
  
    return Object.entries(billingOptions).map(billingOption => {
      const [key, value] = billingOption;
      const styling = (subscriptionType === key)
        ? 'border-red-600'
        : 'border-green-600';
  
      return (
        <label 
          className={`inline-block w-full h-24 p-3 border rounded-lg ${styling}`}
          onClick={(event) => {setSubscriptionType(key)}}
          key={key}
          htmlFor={key}>

          <img className='float-left' src={value.image} alt='' />          
          <input                    
            className='hidden'
            {...register('subscriptionType')}
            type='radio'
            value={key}
            id={key}
          />
          {key}
        </label>
      );
    })
  }

  return (
    <>
      <h1 className='text-[#02295a] text-2xl font-bold mt-1'>Select your plan</h1>
      <p className='mt-2 mb-4 text-lg text-[#9699ab]'>You have the option of monthly or yearly billing.</p>
      <form id='hook-form' onSubmit={handleSubmit(submitHandler)}>
        { getBillingOptions(subscriptionType) }
      </form>
    </>
  );
}

/*
        <button type="submit">Submit button</button>

const Radiobutton = forwardRef((props, ref) => {
  // console.log('radio props:', props);
  // console.log('ref:', ref);
  // const checkedCSS = props.checked ? 'border-[#02295a] bg-[#bfe2fd]' : '';
  return (
    <label 
      className='inline-block w-full h-24 p-3 border rounded-lg border-green-500
      
      '
      // style={{'label + input[type="radio"]:checked { border: 2px solid green; }'}}


        htmlFor={props.id}>
      <img className='float-left' 
        src='/assets/images/icon-arcade.svg' alt='' />

      <div className='ml-16 flex flex-col justify-between'>
        <h3 className='font-semibold text-lg'>{props.label}</h3>
        <p  className='font-semibold text-md text-[#9699ab]'>$90/yr</p>
        <p  className='font-semibold text-sm'>2 months free</p>
      </div>

      <input 
        className='w-0 h-0 display-none
        border rounded-lg border-[#9699ab] bg-white checked:border-[#02295a] checked:bg-[#fafbff]'
        type='radio' 
        ref={ref} 
        {...props}>
        {props.children}
      </input>
    </label>
  );
});

        <div>
          <Radiobutton {...register('billingType')}
            label='monthly' 
            id='monthly'
            value={'monthly'} 
            defaultChecked  />

          <Radiobutton {...register('billingType')} 
            label='yearly' 
            id='yearly'
            value={'yearly'} />          
        </div> 



  const radio = ({control} ) => {
    return (
      <Controller
        render={({ field }) => (
          <RadioGroup aria-label="subscriptionType" {...field}>
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel 
              value="male" 
              control={<Radio />} 
              label="Male" 
            />
          </RadioGroup>
        )}
        name="RadioGroup"
        control={control}
      />
    );
  }



        <Controller
          name="subscriptionType"
          control={control}
          render={({ field }) => <input type="radio" id='Arcade' value={'Arcade'} defaultChecked{...field} />}

        />

        <Controller
          name="subscriptionType"
          control={control}
          render={({ field }) => <input type="radio" id='Advanced' value={'Advanced'} defaultChecked{...field} />}

        />

        <Controller
          name="subscriptionType"
          control={control}
          render={({ field }) => <input type="radio" id='Pro' value={'Pro'} defaultChecked{...field} />}

        />


*/