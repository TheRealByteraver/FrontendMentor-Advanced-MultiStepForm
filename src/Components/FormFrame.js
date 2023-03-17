// This component draws the little page nrs in their circle, with a description
import PageNumbers from "./PageNumbers";

// This component proves the 'Go Back' and 'Next' / 'Confirm' buttons at the form's bottom
import GoBackNextButtonGroup from './GoBackNextButtonGroup';

const FormFrame = ({formHook, pageNr, setPageNr, submitData, children}) => {
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

            {/* All the inputs for each step will be rendered here: */}
            {children}

          </div>

          {/* Make sure that the user can scroll down to the bottom of the form */}
          <div className='w-full h-[700px]'></div>
          
          <GoBackNextButtonGroup {...{ formHook, pageNr, setPageNr, nrOfPages, submitData }} />
        </div>
      </div>
    </div>
  );
}

export default FormFrame;