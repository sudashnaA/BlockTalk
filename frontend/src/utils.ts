import { useEffect, useState} from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useLocation } from "react-router-dom";

export const useGetData = <Type>(func: Function) => {
  const [data, setData] = useState<Type>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<AxiosError>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await func();
        setData(response);
      } catch (error: unknown) {
        if (error)
          if (axios.isAxiosError(error)) {
            setErrors(error);
        };
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    setData,
    errors,
    loading,
  };
};

export const colorParser = (color: string) => {
  switch (color){
    case "orange":
      return({
        color: "bg-orange-300",
        textcolor: "text-white"
      })
    case "purple":
      return({
        color: "bg-violet-800",
        textcolor: "text-white"
      })
    case "blue":
      return({
          color: "bg-blue-500",
          textcolor: "text-white"
      })
    case "babyblue":
      return({
          color: "bg-blue-300",
          textcolor: "text-black"
      })
    case "gray":
        return({
            color: "bg-gray-600",
            textcolor: "text-white"
      })
    case "gold":
      return({
          color: "bg-yellow-500",
          textcolor: "text-black"
      })
   default: 
      return({
        color: "bg-white",
        textcolor: "text-black"
      })
  };
};

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}