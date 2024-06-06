import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { getOTP } from '../../services/authServices';
import { toast } from 'react-hot-toast';
import SendOTPform from './SendOTPform';
import CheckOTPForm from './CheckOTPForm';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useUser from './useUser';

function AuthContainer() {
const navigate = useNavigate();
const [step,setStep]=useState(1);

//const [phonenumber, setphonenumber] = useState("");
const { handleSubmit, register, getValues } = useForm();
const { user } = useUser();

useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

const { isPending:isSendingOTP, 
    mutateAsync ,data:otpResponse} = useMutation({
        mutationFn: getOTP,
});

// const sendOTPhandler = async (e) => {
const sendOTPhandler = async (data) => {
   // e.preventDefault();
    try {
        // const data = await mutateAsync({ phonenumber })
        const {message} = await mutateAsync(data)
        setStep(2);
        console.log(message);
        toast.success(message);
    } catch (error) {
       // console.log(message)
        toast.error(error?.response?.data?.message);
    }
};

const renderStep=()=>{
    switch(step){
        case 1:
            return <SendOTPform 
            isSendOTP={isSendingOTP}
            onSubmit={handleSubmit(sendOTPhandler)}
            setStep={setStep}
            register={register}
            //onSubmit={sendOTPhandler}
            // phonenumber={phonenumber}
            // onChange={e=>setphonenumber(e.target.value)}
            />
        case 2:
            return <CheckOTPForm
            onResendOTP={sendOTPhandler}
            // phonenumber={phonenumber} 
            phonenumber={getValues("phonenumber")} 
            onBack={()=>setStep(1)}
            otpResponse={otpResponse }
            />
        default:
            return null
    }
}
  return (
   <div className='w-full sm:max-w-sm'>{renderStep()}</div>
  )
}

export default AuthContainer