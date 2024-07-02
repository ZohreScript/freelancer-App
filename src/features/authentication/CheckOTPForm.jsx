import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import OTPInput from "react-otp-input";
import { checkOTP } from '../../services/authServices';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import {CiEdit} from 'react-icons/ci';
import Loading from '../../ui/Loading';

const RESEND_TIME=90

function CheckOTPForm({ phonenumber, onBack ,onResendOTP,otpResponse}) {
  const [otp, setotp] = useState("");
  const navigate = useNavigate();
  const [time, setTime] = useState(RESEND_TIME);
  const { isPending, error, data, mutateAsync } = useMutation({
    mutationFn: checkOTP
  })
  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { user, message } = await mutateAsync({ phonenumber, otp })
      toast.success(message);// if true make a  user veryfied and  also make refreshToken and accessToken
      //name,email,role=>push to panel base on role owner or freelancer
      if (!user.isActive) return navigate("/complete-profile")
      if (user.status !== 2) {
        navigate("/")//go to homepage  
        toast("پروفال شما در انتظار تایید است",{icon:"👏"})
        return;
      }
      if (user.isActive) {
        if (user.role === "OWNER") navigate("/owner");
        if (user.role === "FREELANSER") navigate("/freelancer")
        if (user.role === "ADMIN") navigate("/admin")
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    const timer = time > 0 && 
    setInterval(() => setTime(
      (t) => t - 1), 1000)

    return () => {
      if (timer) clearInterval(timer);
    }
  }, [time]);


  return (
    <div>
      <button onClick={onBack}>
        <HiArrowRight className='w-6 h-6 text-secondary-500' />
      </button>
      {
        otpResponse &&(<p className='flex items-center gap-x-2 my-4'>
         <span> {otpResponse?.message}</span>
          <button onClick={onBack}>
            <CiEdit className='w-6 h-6 text-primary-900'/>
          </button>
        </p>)
      }
      <div className='mb-4 text-secondary-500'>
        {time > 0
         ? 
         (<p>{time}ثانیه تا ارسال مجدد کد</p>) :
          (
            <button onClick={onResendOTP}>ارسال مجدد کد تایید</button>
          )
        }
      </div>
      <form className='space-y-10' onSubmit={checkOtpHandler}>
        <p className='font-bold text-secondary-800'>کدتایید را وارد کنید</p>
        <OTPInput value={otp} onChange={setotp} numInputs={6}
          renderInput={(props) => <input type="number"{...props} />}
          renderSeparator={<span>ـ</span>}
          containerStyle="flex flex-row-reverse gap-x-2 justify-center"
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            borderRadius: "0.5rem",
            border: "1px solid rgb(var(--color-primary-300))"
          }} />
             <div>
                    {
                        isPending ? (
                            <Loading/>
                        ) : (
                            <button type='submit' className='btn--primary btn w-full'>  تایید</button>
                        )
                    }
                </div>
      </form>

    </div>
  )
}

export default CheckOTPForm