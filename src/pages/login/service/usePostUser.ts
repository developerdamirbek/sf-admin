import { useMutation } from "@tanstack/react-query";
import request from "../../../config/request";
import { LoginType } from "../../../types";

export const usePostUser = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data:LoginType) => request.post<{token:string}>("/api/token/", data).then((res) => res.data)
    });
};
