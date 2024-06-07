function PharmaticCard({ title, info, actions }) {
  return (
    <div className="flex flex-wrap rounded-lg bg-gray-100 p-6 shadow-md">
      <PharmaticCardContent>
        <PharmaticCardTitle title={title} />
        <PharmaticCardInfo info={info} />
      </PharmaticCardContent>
      <PharmaticCardActions actions={actions} />
    </div>
  );
}

function PharmaticCardContent({ children }) {
  return <div className="mb-3 flex flex-col">{children}</div>;
}

function PharmaticCardTitle({ title }) {
  return <div className="mb-3 text-xl font-bold xl:text-2xl">{title}</div>;
}

function PharmaticCardInfo({ info }) {
  return <div className="text-md px-3 font-semibold xl:text-lg">{info}</div>;
}

function PharmaticCardActions({ actions }) {
  return <div className="grid w-full grid-cols-2 gap-2">{actions}</div>;
}

export default PharmaticCard;
