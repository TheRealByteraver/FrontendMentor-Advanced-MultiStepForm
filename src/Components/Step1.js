import Input from './ui/Input';

const Step1 = ({formHook}) => {
  const { register, formState: { errors } } = formHook;

  return (
    <>
      <Input {...register('fullName')}
        placeholder='e.g. Stephen King'
        label='Name'
        error={errors.fullName}
      />
      <Input {...register('emailAddress', { required: true })} 
        placeholder='e.g. stephenking@lorem.com' 
        label='Email Address'
        error={errors.emailAddress} 
      />
      <Input {...register('phoneNumber', { pattern: /\d+/ })} 
        placeholder='e.g. 1 234 567 890'
        label='Phone Number' 
        error={errors.phoneNumber} 
      />
    </>
  );
}

export default Step1;