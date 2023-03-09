import { useState } from "react";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

function PageNumbers({nrOfPages, activePage}) {
  const stepTitles = ['Your info', 'Select plan', 'Add-ons', 'Summary'];
  const pages = [];

  if (activePage > nrOfPages) activePage = nrOfPages; // little hack for last "thank you page" which is page #5

  for (let i = 1; i <= nrOfPages; i++) {
    const colors = (i === activePage) ? 'text-black bg-[#bfe2fd] border-none' : 'text-white border-white';
    pages.push(
      <li key={`key-${i}`}
        className='lg:border-0 text-white 
        lg:flex lg:justify-start lg:items-center h-16'>
        <div className={`font-bold border rounded-full h-8 w-8 mx-2 flex justify-center items-center 
            ${colors}`}
        >{i}
        </div>
        <div className='hidden lg:inline-block'>
          <h2 className='text-[#9699ab] text-xs '>STEP {i}</h2>
          <p className='text-white uppercase font-medium text-sm tracking-widest'>{stepTitles[i - 1]}</p>
        </div>
      </li>
    );
  }

  return (
    <ul className="bg-[url('/public/assets/images/bg-sidebar-mobile.svg')] bg-no-repeat bg-[100%_auto] w-full h-44 flex flex-row justify-center pt-8
    lg:bg-[url('/public/assets/images/bg-sidebar-desktop.svg')] lg:w-64 lg:h-full lg:float-left lg:flex-col lg:justify-start lg:pl-4 lg:pt-4
    ">
      {pages}
    </ul>    
  );
}

export default function OnBoarding() {
  const [page, setPage] = useState(1); 
  const [formData, setFormData] = useState({
    subscriptionType: 'Arcade',
    billingType: 'Monthly'
  });

  const nrOfPages = 4;

  function submitHandler(data) {
    setFormData(prevFormData => {
      console.log('form data is now:', { ...prevFormData, ...data });
      return {
        ...prevFormData,
        ...data
      };
    });
    setPage(page + 1);
  }
  
  return (
    // background, center child
    <div className='bg-[#eef5ff] h-full lg:h-screen lg:flex lg:justify-center lg:items-center'>

      {/* main container */}
      <div className='
        h-full relative
        lg:shadow-lg lg:w-[1000px] lg:h-[564px] lg:rounded-lg lg:bg-white lg:p-4'>

        {/* page numbers with background image */}
        <PageNumbers nrOfPages={nrOfPages} activePage={page} />

        {/* Form & button group container */}
        <div className='h-full lg:overflow-hidden lg:pb-4 lg:relative lg:mr-20 lg:pl-20'>

          {/* form with title and description */}
          <div className='-mt-[4.8rem] mx-4 p-6 bg-white rounded-lg shadow-lg lg:shadow-none lg:mt-2 lg:mx-0'> 
            {/* border-2 border-sky-500 */}
            {(page === 1) && <Step1 submitHandler={submitHandler} data={formData} />}
            {(page === 2) && <Step2 submitHandler={submitHandler} data={formData} />}
            {(page === 3) && <Step3 submitHandler={submitHandler} data={formData} />}
            {(page === 4) && <Step4 submitHandler={submitHandler} data={formData} />}
            {(page === 5) && <Step5 submitHandler={submitHandler} data={formData} />}
          </div>

          {/* Make sure that the user can scroll down to the bottom of the form */}
          <div className='w-full h-[500px]'></div>

          {/* "Go Back" and "Next Step" buttons container */}
          { (page < 5) &&
            <div className='bg-white w-full h-16 flex flex-row items-center fixed lg:absolute bottom-0 p-3 lg:bottom-4 lg:pl-2 lg:pr-[104px]'>
              
              {/* "Go Back" button */}
              {(page !== 1) && 
                <button onClick={() => setPage(page - 1)}
                  className='text-gray-500 bg-white font-medium pl-2 py-3 hover:cursor-pointer lg:pl-4'>
                  Go Back
                </button>
              }

              {/* "Next Step" button */}
              <button 
                type='submit'
                form='hook-form'
                className={`text-white ${(page === nrOfPages) ? 'bg-[#473dff]' : 'bg-[#02295a]'} px-4 py-2 ml-auto rounded hover:cursor-pointer lg:rounded-lg`}>
                {(page === nrOfPages) ? 'Confirm' : 'Next Step'}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}