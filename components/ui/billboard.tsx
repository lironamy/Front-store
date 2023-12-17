import { Billboard } from "@/types";
import Carousel from "@/components/ui/carouselProps";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  console.log("Rendering Billboard component:", data);

  return (
    <div className="p-6 lg:p-8 rounded-xl overflow-hidden">
      <Carousel images={data.heroImages} interval={5000} label={data.label}/>
    </div>
  );
};

export default Billboard;