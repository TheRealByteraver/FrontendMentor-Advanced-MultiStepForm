import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Input = forwardRef((props, ref) => {
  return (
    <>
      <label className='text-[#02295a] text-sm font-medium inline-block mt-4'>{props.label}</label>
      <input className='border border-[#9699ab] w-full h-10 my-2 mt-0 rounded p-2'
        ref={ref} 
        {...props}>
        {props.children}
      </input>
    </>
  );
});

export default function Step1({submitHandler, data}) {
  const schema = yup.object().shape({
    fullName: yup.string().required('The name field is required'), // custom error message
    emailAddress: yup.string().email('Your email address is not valid').required('The email address field is required'),
    phoneNumber: yup.number().positive().integer().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { onChange, onBlur, name, ref } = register('fullName');  // unnecessary for short version

  return (
    <>
      <h1 className='text-[#02295a] text-2xl font-bold mt-1'>Personal info</h1>
      <p className='mt-2 text-lg text-[#9699ab]'>Please provide your name, email address, and phone number.</p>
      <form 
        id='hook-form'
        onSubmit={handleSubmit(submitHandler)}>
        <Input 
          // {...register('Name')} // is the same as:
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
          // end of verbose version of ...register('Name') 

          placeholder="e.g. Stephen King"
          defaultValue={data.fullName} 
          label='Name' />
        <p>{errors.fullName?.message}</p>
        {errors.fullName && <p>Please enter your name.</p>}

        <Input {...register('emailAddress', { required: true })} 
          placeholder="e.g. stephenking@lorem.com" 
          defaultValue={data.emailAddress} 
          label='Email Address' />
        <p>{errors.emailAddress?.message}</p>
        {errors.emailAddress && <p>Email address is required.</p>}

        <Input {...register('phoneNumber', { pattern: /\d+/ })} 
          placeholder="e.g. +1 234 567 890" 
          defaultValue={data.phoneNumber} 
          label='Phone Number' />
        {errors.phoneNumber && <p>Please enter a valid phone number.</p>}
      </form>
    </>
  );
}