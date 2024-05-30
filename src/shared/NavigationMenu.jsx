import { Separator } from "@radix-ui/react-separator";
import NavigationLinks from "./NavigationLinks";
import { useState, useEffect } from "react";

function NavigationMenu() {
  return (
    <>
      <PharmaticLogo />
      <div className="flex-1 flex flex-col justify-between">
        <NavigationLinks />
        <div className="w-full text-center p-3 hidden lg:block">
          <Separator className="my-2 h-0.5 bg-gray-300" />
          <PharmaticTime />
        </div>
      </div>
    </>
  );
}

function PharmaticTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return <p className="font-bold text-4xl">{formatTime(time)}</p>;
}

function PharmaticLogo() {
  return (
    <div className="p-3">
      <img
        src="../../assets/PharmaticLogo.png"
        alt="logo pharmatic"
        className="w-full h-auto"
      ></img>
      <Separator className="my-2 h-0.5 bg-gray-300" />
    </div>
  );
}

export default NavigationMenu;
