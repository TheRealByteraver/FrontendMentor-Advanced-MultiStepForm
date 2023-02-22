import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';


const Input = forwardRef((props, ref) => {
  return (
    <input className='border border-[#9699ab] w-full h-10 my-2 mt-0 rounded p-2'
      ref={ref} 
      {...props}>
      {props.children}
    </input>
  );
});

export default function Step1({submitHandler, data}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <h1 className='text-[#02295a] text-2xl font-bold mt-1'>Personal info</h1>
      <p className='mt-2 text-lg text-[#9699ab]'>Please provide your name, email address, and phone number.</p>
      <form 
        id='hook-form'
        onSubmit={handleSubmit(submitHandler)}
      >
        <label className='text-[#02295a] text-sm font-medium inline-block mt-4'>Name</label>
        <Input {...register('Name')}
          placeholder="e.g. Stephen King"
          defaultValue={data.Name} 
        />

        <label className='text-[#02295a] text-sm font-medium inline-block mt-2'>Email Address</label>
        <Input {...register('EmailAddress', { required: true })} 
          placeholder="e.g. stephenking@lorem.com" 
          defaultValue={data.EmailAddress} 
        />
        {errors.EmailAddress && <p>Email address is required.</p>}

        <label className='text-[#02295a] text-sm font-medium inline-block mt-2'>Phone Number</label>
        <Input {...register('PhoneNumber', { pattern: /\d+/ })} 
          placeholder="e.g. +1 234 567 890" 
          defaultValue={data.PhoneNumber} 
        />
        {errors.PhoneNumber && <p>Please enter a valid phone number.</p>}
      </form>
    </>
  );
}