import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Step3({submitHandler, data}) {
  const { handleSubmit, register } = useForm({ defaultValues: { ...data } });
  const [addOnsChecked, setAddOnsChecked] = useState([false, false, false]); // whether checkboxes are checked or not

  const isMonthlyBilling = (data.billingType === 'Monthly');
  const addOnOptions = [
    { id: 0, title: 'Online service', description: 'Access to multiplayer games', monthly: '+$1/mo', yearly: '+$10/yr' },
    { id: 1, title: 'Larger storage', description: 'Extra 1TB of cloud save', monthly: '+$2/mo', yearly: '+$20/yr' },
    { id: 2, title: 'Customizable profile', description: 'Custom theme on your profile', monthly: '+$2/mo', yearly: '+$20/yr' }
  ];

  function clickHandler(index) {
    setAddOnsChecked(prevState => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  }

  return (
    <>
      <h1 className='text-[#02295a] text-xl font-bold mt-1'>Pick add-ons</h1>
      <p className='mt-2 mb-4 text-md text-[#9699ab]'>Add-ons help enhance your gaming experience.</p>
      <form id='hook-form' onSubmit={handleSubmit(submitHandler)}>

      { 
        addOnOptions.map((addOnOption, index) => {
          const price = isMonthlyBilling ? addOnOption.monthly : addOnOption.yearly;
          const htmlId = `AddOn-${addOnOption.title}`;
          const styling = addOnsChecked[index]
            ? 'bg-[#eef5ff] border border-[#473dff]'
            : 'border border-[#d6d9e6]';

          return (
            <label 
              className={`w-full h-min p-3 flex flex-row justify-start items-center my-3 border rounded-lg ${styling} hover:cursor-pointer`}
              key={htmlId}
              htmlFor={htmlId}
            >

              <input                    
                className='w-5 h-5 hover:cursor-pointer'
                onClick={() => clickHandler(index)}
                {...register(htmlId)}
                type='checkbox'
                value={addOnsChecked[index]}
                id={htmlId}
              />

              <div className='w-auto ml-3'>
                <p className='font-bold text-md text-[#02295a] leading-5'>{addOnOption.title}</p>
                <p className='font-medium text-xs text-[#9699ab] leading-5'>{addOnOption.description}</p>
              </div>

              <p className='ml-auto text-sm text-[#473dff] leading-5'>{price}</p>
            </label>
          );
        })
      }
      </form>
    </>
  );
}
