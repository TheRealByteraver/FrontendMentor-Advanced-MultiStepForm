import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Input = forwardRef((props, ref) => {

  return (
    <>
      <label className='text-[#02295a] text-sm font-medium inline-block mt-4 mb-1'>{props.label}</label>
      { props.error && 
        <p className='float-right text-[#ed3548] text-sm font-bold inline-block mt-4'>
          {props.error.message}
        </p>
      }
      
      <input 
        className={`border outline-none w-full h-10 my-2 mt-0 rounded p-2 hover:cursor-pointer
                    ${props.error ? 'border-[#ed3548]' : 'blur:border-[#9699ab] focus:border-[#473dff]'} 
            `}
        ref={ref} 
        {...props}>
        {props.children}
      </input>
    </>
  );
});

export default function Step1({submitHandler, data}) {
  const schema = yup.object().shape({
    fullName: yup.string().required('The Name field is required'), // custom error message
    emailAddress: yup.string().email('Your email address is not valid').required('An email address is required'),
    phoneNumber: yup.number().typeError('Please enter a valid phone number').positive('').integer().required('A phone number is required'),
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
      <h1 className='text-[#02295a] text-xl font-bold mt-1'>Personal info</h1>
      <p className='mt-2 text-md text-[#9699ab]'>Please provide your name, email address, and phone number.</p>
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

          placeholder='e.g. Stephen King'
          defaultValue={data.fullName} 
          label='Name' 
          error={errors.fullName}
        />

        <Input {...register('emailAddress', { required: true })} 
          placeholder='e.g. stephenking@lorem.com' 
          defaultValue={data.emailAddress} 
          label='Email Address'
          error={errors.emailAddress} 
        />

        <Input {...register('phoneNumber', { pattern: /\d+/ })} 
          placeholder='e.g. 1 234 567 890'
          defaultValue={data.phoneNumber} 
          label='Phone Number' 
          error={errors.phoneNumber} 
        />
      </form>
    </>
  );
}