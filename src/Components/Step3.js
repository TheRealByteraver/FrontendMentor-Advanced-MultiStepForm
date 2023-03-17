const Step3 = ({formHook, addOnOptions, billingType}) => {
  const { watch, register } = formHook;

  return addOnOptions.map((addOnOption, index) => {
      const price = (billingType === 'Monthly') ? addOnOption.monthly : addOnOption.yearly;
      const htmlId = `${addOnOption.title}`;
      const styling = watch(addOnOptions[index].title)
        ? 'bg-[#eef5ff] border border-[#473dff]'
        : 'border border-[#d6d9e6]';

      return (
        <label 
          className={`w-full h-min p-3 flex flex-row justify-start items-center my-3 border rounded-lg ${styling} hover:cursor-pointer`}
          key={htmlId}
          htmlFor={htmlId}>
          <input                    
            className='w-5 h-5 hover:cursor-pointer'
            {...register(htmlId)}
            type='checkbox'
            id={htmlId} />
          <div className='w-auto ml-3'>
            <p className='font-bold text-md text-[#02295a] leading-5'>{addOnOption.title}</p>
            <p className='font-medium text-xs text-[#9699ab] leading-5'>{addOnOption.description}</p>
          </div>
          <p className='ml-auto text-sm text-[#473dff] leading-5'>{price}</p>
        </label>
      );
    });
}

export default Step3;