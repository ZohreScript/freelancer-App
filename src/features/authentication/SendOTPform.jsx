import React, { useState } from 'react'
import Textfield from '../../ui/Textfield';
import Loading from '../../ui/Loading';


function SendOTPform({onSubmit, isSendingOTP ,register}) {
    return (
        <div>
            <form className='space-y-8' onSubmit={onSubmit}>
                <Textfield
                    label="شماره موبایل"
                    name="phoneNumber"
                    register={register} />
                <div>
                    {
                        isSendingOTP ? (
                            <Loading/>
                        ) : (
                            <button type='submit'
                             className='btn--primary btn 
                             w-full'>ارسال کد تایید</button>
                        )
                    }
                </div>
            </form>
        </div>

    )
}

export default SendOTPform