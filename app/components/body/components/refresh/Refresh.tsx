"use client";
import React from "react";
import useSWR from "swr";
import { IoMdRefresh } from "react-icons/io";
const Refresh = (date: any) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/filter/${date.month}`,
    fetcher
  );

  const handleClick = () => {
    if (data) {
      return data;
    }
  };
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <IoMdRefresh onClick={handleClick} size={25} className="cursor-pointer" />
    </>
  );
};

export default Refresh;
