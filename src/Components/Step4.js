const Step4 = ({formHook, setPageNr, addOnOptions}) => {
  const { getValues } = formHook;

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

  const curPriceData = priceData[getValues('billingType')];
  const initialCost = () => curPriceData[getValues('subscriptionType')];
  
  const totalCost = () => {
    const formValues = getValues();
    let totalCost = initialCost();
    addOnOptions.forEach(addOnOption => {
      if (formValues[addOnOption.title]) {
        totalCost += curPriceData[addOnOption.title];
      }
    });
    return totalCost;
  }

  const getCostStr = (value) => `$${value}${curPriceData.suffixStr}`;

  return (
    <>
      <div className='bg-[#f0f6ff] rounded-lg mt-6 p-3'>
        <div className='flex flex-row justify-between items-center'>
          <div>
            <p className='text-[#02295a] font-bold text-sm'>{getValues('subscriptionType')} ({ getValues('billingType') })</p>
            <button 
              className='text-[#9699ab] font-bold text-sm underline hover:text-[#473dff]' 
              onClick={() => setPageNr(2)}>Change
            </button>
          </div>
          <p className='text-[#02295a] font-bold text-sm'>{getCostStr(initialCost())}</p>
        </div>
        <hr className='mt-4'></hr>
          {
            addOnOptions.map(addOnOption => getValues(addOnOption.title) &&
              <div key={addOnOption.title} className='flex flex-row justify-between items-center mt-4'>
                <p className='text-[#9699ab] font-bold text-sm'>{addOnOption.title}</p>
                <p className='text-[#02295a] font-bold text-sm'>+{getCostStr(curPriceData[addOnOption.title])}</p>
              </div>
            )
          }
      </div>
      
      <div className='flex flex-row justify-between items-center mt-6 px-3'>
        <p className='text-[#9699ab] font-bold text-sm'>Total (per {curPriceData.billingTypeStr})</p>
        <p className='text-[#473dff] font-bold text-md'>{getCostStr(totalCost())}</p>
      </div>
    </>
  );
}

export default Step4;