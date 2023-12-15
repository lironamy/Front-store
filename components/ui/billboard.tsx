import { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  console.log("Rendering Billboard component:", data);

  return (
    <div className="p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-xl 	 relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center"
      >
        <div className="h-full w-full flex flex-col justify-end items-start text-center gap-y-8 ">
          <div className="bg-black bg-opacity-70 flex flex-col justify-end items-start text-center gap-y-8 pr-2 title-picture-wrapper">
            <div className="font-bold text-white text-3xl sm:text-5xl lg:text-5xl sm:max-w-xl">
            <h1>{data.label}</h1> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
