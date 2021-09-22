import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  FetchTrendingLists,
  FetchMostPopularLists,
} from "../reducers/listReducer";

function useFetch(offset, heading) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const sendQuery = useCallback(async () => {
    try {
      console.log(heading);
      await setLoading(true);
      await setError(false);
      if (heading === "Trending") {
        const res = await dispatch(FetchTrendingLists(offset));
        const data = await unwrapResult(res);
        if (data) {
          setLoading(false);
        }
      } else {
        const res = dispatch(FetchMostPopularLists(offset));
        const data = await unwrapResult(res);
        if (data) {
          setLoading(false);
        }
      }
    } catch (err) {
      setError(err);
    }
  }, [offset]);

  useEffect(() => {
    console.log("useEffect");
    sendQuery(offset);
  }, [sendQuery, offset]);

  return { loading, error };
}

export default useFetch;
