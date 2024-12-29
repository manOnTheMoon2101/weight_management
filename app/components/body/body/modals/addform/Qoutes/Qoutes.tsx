"use client";
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import tipsData from "@/lib/files/qoutes.json";
import { AiOutlineLoading } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
const RandomTip = () => {
  const [currentTip, setCurrentTip] = useState("");
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(null);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tipsData.length);
    return tipsData[randomIndex].quote;
  };

  const showNewTip = () => {
    const newTip = getRandomTip();
    setCurrentTip(newTip);
    setProgress(0);
    const newTimer: any = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(newTimer);
          setCurrentTip("");
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);

    setTimer(newTimer);
  };

  useEffect(() => {
    showNewTip();
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  useEffect(() => {
    if (currentTip === "") {
      showNewTip();
    }
  }, [currentTip]);

  return (
    <div>
      {currentTip ? (
        <div className="text-xl flex flex-col justify-center items-center">
          <span className="font-thin italic">{currentTip}</span>
          <Progress value={progress} max={100} />
        </div>
      ) : (
        <AiOutlineLoading size={34} className="animate-spin text-primary" />
      )}
    </div>
  );
};

export default RandomTip;
