import { useEffect, useState } from "react";
import { getRequest } from "../axios";
import { toast } from "react-toastify";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await getRequest(url);
      const data = response.data;
      setData(data);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [data, loading, fetchData];
};

export default useFetch;
