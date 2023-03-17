// Radio button providing the choice between 'Monthly' and 'Yearly' invoicing on Step 2 of the form
import MonthlyYearlyRadioButton from './MonthlyYearlyRadioButton';

const Step2 = ({formHook, billingType, setBillingType, subscriptionType, setSubscriptionType}) => {
  const { register } = formHook;

  const billingOptions = [
    { type: 'Arcade', monthly: '$9/mo', yearly: '$90/yr', image: `${process.env.PUBLIC_URL}/assets/images/icon-arcade.svg` },
    { type: 'Advanced', monthly: '$12/mo', yearly: '$120/yr', image: `${process.env.PUBLIC_URL}/assets/images/icon-advanced.svg` },
    { type: 'Pro', monthly: '$15/mo', yearly: '$150/yr', image: `${process.env.PUBLIC_URL}/assets/images/icon-pro.svg` },
  ];  

  return (
    <>
      {/* 'Arcade / Advanced / Pro' choice block */}
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
      <MonthlyYearlyRadioButton {...{formHook, billingType, setBillingType}} />
    </>
  );
}

export default Step2;