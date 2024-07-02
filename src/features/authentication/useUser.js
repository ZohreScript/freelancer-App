import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/authServices";

export default function  useUser() {
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
      });
    
      const { user } = data || {};
    
      return { isLoading, user };
    }
