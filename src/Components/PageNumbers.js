
const PageNumbers = ({activePage}) => {
  const stepTitles = ['Your info', 'Select plan', 'Add-ons', 'Summary'];
  const nrOfPages = stepTitles.length;
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

export default PageNumbers;