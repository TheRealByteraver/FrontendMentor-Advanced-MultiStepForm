export default function Step5() {

  return (
    <div className='flex flex-col justify-center items-center lg:mt-20'>
      <div className='mt-6'>
        <img className='' src={`${process.env.PUBLIC_URL}/assets/images/icon-thank-you.svg`} alt='' />  
      </div>
      <h1 className='text-[#02295a] text-xl font-bold mt-6'>Thank you!</h1>
      <p className='text-[#9699ab] text-center mt-2 mb-8'>
        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
      </p>
    </div>
  );
}
