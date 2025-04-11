import Loader from "./Loader";
import { AxiosError } from "axios";

const Load = ({errors, loading}: {errors: AxiosError | undefined, loading: boolean}) => {
    return (
       <>
        {loading && <Loader />}
        {errors && <p className="mt-10 text-4xl">A network error has occured</p>}
       </>
    );
};

export default Load;