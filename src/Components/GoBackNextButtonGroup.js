
const GoBackNextButtonGroup = ({formHook, pageNr, setPageNr, nrOfPages, submitData}) => {
  const { trigger, getValues } = formHook;
  return (
    <>
      {/* "Go Back" and "Next Step" buttons container */}
      { (pageNr < 5) &&
        <div className='bg-white w-full h-16 flex flex-row items-center fixed lg:absolute bottom-0 p-3 lg:bottom-4 lg:pl-2 lg:pr-[104px]'>
          
          {/* "Go Back" button */}
          {(pageNr !== 1) && 
            <button onClick={() => setPageNr(pageNr - 1)}
              className='text-gray-500 bg-white font-medium pl-2 py-3 hover:cursor-pointer lg:pl-4'>
              Go Back
            </button>
          }

          {/* "Next Step" button */}
          <button 
            type='button'
            onClick={async () => {
              const result = await trigger();
              if (result) {
                if (pageNr === nrOfPages) {
                  submitData(getValues());
                }
                setPageNr(pageNr + 1);
              }
            }}
            // form='hook-form'
            className={`text-white ${(pageNr === nrOfPages) ? 'bg-[#473dff]' : 'bg-[#02295a]'} px-4 py-2 ml-auto rounded hover:cursor-pointer lg:rounded-lg`}>
            {(pageNr === nrOfPages) ? 'Confirm' : 'Next Step'}
          </button>
        </div>
      }
    </>
  );
}

export default GoBackNextButtonGroup;