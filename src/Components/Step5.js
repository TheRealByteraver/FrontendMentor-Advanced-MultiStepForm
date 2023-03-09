import { useForm } from 'react-hook-form';

export default function Step5({submitHandler, data}) {
  const { handleSubmit } = useForm({ defaultValues: { ...data } });

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='mt-12'>
          <img 
            className='' 
            src='/assets/images/icon-thank-you.svg' alt=''
          />  
        </div>
        <h1 className='text-[#02295a] text-xl font-bold mt-6'>Thank you!</h1>
        <p className='text-[#9699ab] text-center my-6'>
          Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
        </p>
      </div>
      <form id='hook-form' onSubmit={handleSubmit(submitHandler)}></form>
    </>
  );
}
