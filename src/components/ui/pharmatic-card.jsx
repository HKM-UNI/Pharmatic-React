import React from "react";

function PharmaticCard({ imageSrc, title, info, actions }) {
  return (
    <div className="flex flex-col rounded-lg shadow-md p-2 bg-gray-100">
      <PharmaticCardImage src={imageSrc} />
      <PharmaticCardContent>
        <PharmaticCardTitle title={title} />
        <PharmaticCardInfo info={info} />
      </PharmaticCardContent>
      <PharmaticCardActions actions={actions} />
    </div>
  );
}

function PharmaticCardImage({ src }) {
  const imageStyle = "w-16 h-16 rounded-full";
  return (
    <div className={src || "hidden"}>
      <img src={src} alt="card image" className="w-full h-full object-cover" />
    </div>
  );
}

function PharmaticCardContent({ children }) {
  return <div className="flex flex-col p-2">{children}</div>;
}

function PharmaticCardTitle({ title }) {
  return <div className="text-xl xl:text-2xl font-semibold">{title}</div>;
}

function PharmaticCardInfo({ info }) {
  return <div className="text-md xl:text-lg">{info}</div>;
}

function PharmaticCardActions({ actions }) {
  return <div className="grid grid-cols-2 gap-2">{actions}</div>;
}

export default PharmaticCard;
