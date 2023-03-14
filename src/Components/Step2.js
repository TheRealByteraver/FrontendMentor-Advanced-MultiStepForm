import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Step2({submitHandler, data}) {
  const { handleSubmit, register } = useForm({ defaultValues: { ...data } });

  // subscriptionTypes = ['Arcade', 'Advanced', 'Pro']
  const [subscriptionType, setSubscriptionType] = useState(data.subscriptionType); 

  // billingTypes = ['Monthly', 'Yearly']
  const [billingType, setBillingType] = useState(data.billingType);

  const billingOptions = [
    { type: 'Arcade', monthly: '$9/mo', yearly: '$90/yr', image: `${process.env.PUBLIC_URL}/assets/images/icon-arcade.svg` },
    { type: 'Advanced', monthly: '$12/mo', yearly: '$120/yr', image: `${process.env.PUBLIC_URL}/assets/images/icon-advanced.svg` },
    { type: 'Pro', monthly: '$15/mo', yearly: '$150/yr', image: `${process.env.PUBLIC_URL}/assets/images/icon-pro.svg` },
  ];

  return (
    <>
      <h1 className='text-[#02295a] text-xl font-bold mt-1'>Select your plan</h1>
      <p className='mt-2 mb-4 text-md text-[#9699ab]'>You have the option of monthly or yearly billing.</p>
      <form id='hook-form' onSubmit={handleSubmit(submitHandler)}>

        {/* Arcade / Advanced / Pro choice block */}
        <div className='lg:flex lg:flex-row lg:justify-between'>
          { 
            billingOptions.map(billingOption => {
              const styling = (subscriptionType === billingOption.type) ? 'border-[#473dff] bg-[#eef5ff]' : 'border-[#d6d9e6]';
              const price = (billingType === 'Monthly') ? billingOption.monthly : billingOption.yearly;
              return (
                <label 
                  className={`inline-block w-full h-min p-3 my-1.5 border rounded-lg ${styling} hover:cursor-pointer lg:w-[31%]`}
                  onClick={() => {setSubscriptionType(billingOption.type)}}
                  key={billingOption.type}
                  htmlFor={billingOption.type}>

                  <img className='float-left' src={billingOption.image} alt='' />          
                  <input                    
                    className='hidden'
                    {...register('subscriptionType')}
                    type='radio'
                    value={billingOption.type}
                    id={billingOption.type}
                  />
                  <div className='w-auto ml-[50px] lg:ml-0 lg:mt-24'>
                    <p className='font-bold text-sm text-[#02295a] leading-4 lg:leading-5'>{billingOption.type}</p>
                    <p className='text-sm text-[#9699ab] leading-5'>{price}</p>
                    { 
                      (billingType === 'Yearly') && 
                      <p className='font-bold text-xs lg:leading-5 text-[#02295a]'>2 months free</p> 
                    }
                  </div>                
                </label>
              );
            })
          }
        </div>

        {/* Monthly / Yearly radio button */}
        <div className='text-center mt-4 text-sm font-bold bg-[#eef5ff] rounded-md p-3'>
          <div>
            <label 
              className={`w-1/4 mr-6 ${(billingType === 'Monthly' ? 'text-[#02295a]' : 'text-[#9699ab]')} hover:cursor-pointer`}
              htmlFor='Monthly'>Monthly</label>
            <div className='inline -mt-[1px] pt-[2px] rounded-[12px] h-[26px] w-54px px-1 bg-[#02295a]'>
              <input 
                className='text-[#02295a] appearance-none rounded-full w-3 h-3 checked:bg-white hover:cursor-pointer' 
                onClick={() => {setBillingType('Monthly')}}
                type='radio' id='Monthly' {...register('billingType')} value='Monthly' 
              />
              <input 
                className='text-[#02295a] appearance-none rounded-full w-3 h-3 checked:bg-white hover:cursor-pointer' 
                onClick={() => {setBillingType('Yearly')}}
                type='radio' id='Yearly' {...register('billingType')} value='Yearly' 
              />
            </div>
            <label 
              className={`w-1/4 ml-6 ${(billingType === 'Yearly' ? 'text-[#02295a]' : 'text-[#9699ab]')} hover:cursor-pointer`} 
              htmlFor='Yearly'>Yearly</label>
          </div>
        </div>
      </form>
    </>
  );
}
