import { useMutation } from "@tanstack/react-query";
import request from "../../../config/request";
import { RegisterType } from "../../../types";

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterType) => {
      const defaultData = {
        ...data,
        department: null,
        company: null,
        isactive: false,
      };

      return request.post<{ token: string }>("/register/", defaultData).then((res) => res.data);
    },
  });
};
