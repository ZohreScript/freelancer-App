import React, { useState } from "react";
import RadioInputGroup from "../../ui/RadioInputGroup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { completeProfile } from "../../services/authServices";
import Loading from "../../ui/Loading";
import { useNavigate } from "react-router-dom";
import Textfield from "../../ui/Textfield";
import { useForm } from "react-hook-form";

function CompleteProfileForm() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  //  const[name,setName]=useState("");
  //  const[email,setEmail]=useState("");
  //  const[role,setRole]=useState("");

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: completeProfile,
  });

  const onSubmit = async (data) => {
    e.preventDefault();
    try {
      const { user, message } = await mutateAsync(data);
      // const{user,message}=await mutateAsync({user,email,role})
      //const data=

      toast.success(message);

      //role=>push to profile
      if (user.status !== 2) {
        navigate("/"); //go to homepage
        toast("پروفال شما در انتظار تایید است", { icon: "👏" });
        return;
      }

      if (user.role === "OWNER") navigate("/owner");
      if (user.role === "FREELANSER") navigate("/freelancer");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col gap-y-6 items-center pt-10">
     <h1 className="font-bold text-3xl text-secondary-700">تکمیل اطلاعات</h1>
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <Textfield
            label="نام و نام خانوادگی"
            name="name"
            // onChange={(e)=>setName(e.target.value)}
            // value={name}
            register={register}
            validationSchema={{
              required: "نام و نام خانوادگی  ضروری است",
            }}
            errors={errors}          />
          <Textfield
            label="ایمیل"
            name="email"
            // onChange={(e)=>setEmail(e.target.value)}
            // value={email}
            register={register}
            validationSchema={{
              required: "ایمیل ضروری است",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "ایمیل نامعتبر است",
              },
            }}
            errors={errors}
          />

            <RadioInputGroup
             
              errors={errors}
              register={register}
              // onChange={(e)=>setRole(e.target.value)}
    
              // checked={role==="OWNER"}
              // checked={getValues("role") === "OWNER"}
              watch={watch}
              configs={{
                name: "role",
                validationSchema: { required: "انتخاب نقش ضروری است" },
                options: [
                  {
                    value: "OWNER",
                    label: "کارفرما",
                  },
                  { value: "FREELANCER", label: "فریلنسر" },
                ],
              }}
            />
            
          {/* <div className="flex items-center justify-center gap-x-8">
            <RadioInput
              label="فریلنسر"
              value="FREELANCER"
              register={register}
              // onChange={(e)=>setRole(e.target.value)}
              id="FREELANCER"
              name="role"
              //  checked={role==="FREELANCER"}
              checked={getValues("role") === "FREELANCER"}
            />
            
          </div> */}

          <div>
            {isPending ? (
              <Loading />
            ) : (
              <button className="btn btn--primary w-full">تایید</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfileForm;
