import { QueryClient, useMutation } from "@tanstack/react-query";
import { removeProjectApi } from "../../services/ProjectServices";
import {toast} from 'react-hot-toast'

export default function useRemoveProject(){
    const {mutate:removeProject,isPending:isDeleting}=useMutation({
        mutationFn:removeProjectApi,
        onSuccess:(data)=>{
            console.log(data);
            toast.success(data.message)
         //   toast.success("پروژه با موفقیت حذف شد")
           
           //update query to show newest query to user after delete
            QueryClient,invalidateQueries({
                queryKey:["owner-projects"]
            })
        },
        onError:(err)=>toast.error(err?.response?.data?.message),
    })
    return {removeProject,isDeleting};
}