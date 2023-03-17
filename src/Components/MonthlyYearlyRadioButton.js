const MonthlyYearlyRadioButton = ({formHook, billingType, setBillingType}) => {
  const { register } = formHook;
  return (
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
  );
}

export default MonthlyYearlyRadioButton;