import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Step4({submitHandler, data}) {
  const { handleSubmit } = useForm({ defaultValues: { ...data } });

  const priceData = {
    'Monthly': {
      'Arcade': 9,
      'Advanced': 12,
      'Pro': 15,
      'Online service': 1,
      'Larger storage': 2,
      'Customizable profile': 2,
      'suffixStr': '/mo',
      'billingTypeStr': 'month',
    },
    'Yearly': {
      'Arcade': 90,
      'Advanced': 120,
      'Pro': 150,
      'Online service': 10,
      'Larger storage': 20,
      'Customizable profile': 20,
      'suffixStr': '/yr',
      'billingTypeStr': 'year',
    }
  };

  let initialCost = priceData[data.billingType][data.subscriptionType];
  let totalCost = initialCost;
  if (data['AddOn-Online service']) totalCost += priceData[data.billingType]['Online service'];
  if (data['AddOn-Larger storage']) totalCost += priceData[data.billingType]['Larger storage'];
  if (data['AddOn-Customizable profile']) totalCost += priceData[data.billingType]['Customizable profile']; 

  const getCostStr = (value) => `$${value}${priceData[data.billingType].suffixStr}`;

  return (
    <>
      <h1 className='text-[#02295a] text-xl font-bold mt-1'>Finishing Up</h1>
      <p className='mt-2 mb-4 text-md text-[#9699ab]'>Double-check everything looks OK before confirming.</p>

      <div className='bg-[#f0f6ff] rounded-lg mt-6 p-3'>
        <div className='flex flex-row justify-between items-center'>
          <div>
            <p className='text-[#02295a] font-bold text-sm'>{data.subscriptionType} ({data.billingType})</p>
            <p className='text-[#9699ab] font-bold text-sm underline'><a href="/Step2">Change</a></p>
          </div>
          <p className='text-[#02295a] font-bold text-sm'>{getCostStr(initialCost)}</p>
        </div>
        <hr className='mt-4'></hr>
        { data['AddOn-Online service'] && 
          <div className='flex flex-row justify-between items-center mt-4'>
            <p className='text-[#9699ab] font-bold text-sm'>Online service</p>
            <p className='text-[#02295a] font-bold text-sm'>+{getCostStr(priceData[data.billingType]['Online service'])}</p>
          </div>
        }
        { data['AddOn-Larger storage'] && 
          <div className='flex flex-row justify-between items-center mt-4'>
            <p className='text-[#9699ab] font-bold text-sm'>Larger storage</p>
            <p className='text-[#02295a] font-bold text-sm'>+{getCostStr(priceData[data.billingType]['Larger storage'])}</p>
          </div>
        }
        { data['AddOn-Customizable profile'] && 
          <div className='flex flex-row justify-between items-center mt-4'>
            <p className='text-[#9699ab] font-bold text-sm'>Customizable profile</p>
            <p className='text-[#02295a] font-bold text-sm'>+{getCostStr(priceData[data.billingType]['Customizable profile'])}</p>
          </div>
        }
      </div>
      
      <div className='flex flex-row justify-between items-center mt-6 px-3'>
        <p className='text-[#9699ab] font-bold text-sm'>Total (per {priceData[data.billingType].billingTypeStr})</p>
        <p className='text-[#473dff] font-bold text-md'>{getCostStr(totalCost)}</p>
      </div>

      <form id='hook-form' onSubmit={handleSubmit(submitHandler)}></form>
    </>
  );
}
