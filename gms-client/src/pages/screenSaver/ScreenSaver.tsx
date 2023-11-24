import { useQuery } from "react-query";
import "./ScreenSaver.css";
import axios from "axios";

interface Props {
  id: string;
  imageUrl: string;
}
const ScreenSaver = () => {
  const { data } = useQuery<Props>({
    queryKey: ["ScreenSaver"],
    queryFn: () =>
      axios
        .get(
          `${import.meta.env.VITE_APP_API_URL}/api/screensaver/getScreenSaver`
        )
        .then((res) => res.data),
  });

  console.log("image screen saver", data);

  return (
    <div className="image-container">
      <img className="screensaver-image" src={data?.imageUrl} alt={data?.id} />
    </div>
  );
};

export default ScreenSaver;
