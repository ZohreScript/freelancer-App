import React from 'react'
// onChange
function RadioInput({label,value,id,name,register,validationSchema = {},
  watch,}) {
  return (
    <div>
         <div className='flex items-center gap-x-2 text-secondary-600'>
            <input
            className='cursor-pointer w-4 h-4  form-radio text-primary-900 focus:ring-primary-900'
            type='radio' name={name} id={id} value={value}
            {...register(name, validationSchema)}
            checked={watch(name) === value}
            //  checked={checked}
            //  {...register(name)}
              // onChange={onChange}
              />
            <label htmlFor={id}>{label}</label>
        </div>
    </div>
  )
}

export default RadioInput