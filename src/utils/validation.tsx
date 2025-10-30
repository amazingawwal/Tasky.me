
import { useState } from "react";

export type ErrorData = {
  task?: string;

};


export default function useValidation() {

    const [errors, setErrors] = useState<ErrorData>({});

    let inputErrors:ErrorData = {};
    
    function errorValidation (input:string){
        if (!input) {
        inputErrors.task = "Task title field is required";
        return;
        }
        setErrors(inputErrors); 
    }

    return {errors, errorValidation}
};
