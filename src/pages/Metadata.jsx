import {
  EditIcon,
  FilterIcon,
  HashtagDownIcon,
  MilkIcon,
  Tag2Icon,
} from "@/icons";

function Metadata() {
  return (
    <div className="grid h-full w-full gap-x-28 gap-y-8 overflow-auto rounded-2xl p-6 sm:grid-cols-2 2xl:grid-cols-3">
      <MetaDataCard
        icon={<HashtagDownIcon className="h-56 w-56" />}
        text="Categorías"
      />
      <MetaDataCard
        icon={<HashtagDownIcon className="h-56 w-56" />}
        text="Sub Categorías"
      />
      <MetaDataCard
        icon={<FilterIcon className="h-56 w-56" />}
        text="Unidades de medida"
      />
      <MetaDataCard icon={<Tag2Icon className="h-56 w-56" />} text="Tags" />
      <MetaDataCard
        icon={<MilkIcon className="h-56 w-56" />}
        text="Vía de administración"
      />
      <MetaDataCard
        icon={<EditIcon className="h-56 w-56" />}
        text="Tipo de dósis"
      />
    </div>
  );
}

function MetaDataCard({ icon, text }) {
  return (
    <div className="flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-2xl bg-white transition delay-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl">
      {icon}
      <p className="text-xl font-semibold">{text}</p>
    </div>
  );
}

export default Metadata;
