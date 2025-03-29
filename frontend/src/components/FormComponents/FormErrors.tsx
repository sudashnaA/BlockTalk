import { FormError } from "../../types";

const FormErrors = ({errors}: {errors: FormError[]}) => {
    return(
        <div className="text-red-700 mt-6 text-center">
           <ul>{errors.map((error: FormError, index: number) => <li key={index}>{error.message}</li>)}</ul>
        </div>
    );
};

export default FormErrors;