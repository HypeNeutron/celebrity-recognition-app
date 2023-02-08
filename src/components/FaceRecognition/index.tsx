import { TBoxStyle, TDetectInfo } from "../../App";
import { getError } from "../../utils/getError";
import ShowError from "../ShowError";

type TFaceRecognition = {
  imageName?: string;
  imageURL?: string;
  detectInfo?: TDetectInfo;
  error: Error | null;
  boxStyle: TBoxStyle | object;
  setBoxStyle: React.Dispatch<React.SetStateAction<TBoxStyle | object>>;
};

export default function FaceRecognition({
  imageName,
  imageURL,
  detectInfo,
  error,
  boxStyle,
  setBoxStyle,
}: TFaceRecognition) {
  const handleImageLoad = () => {
    const image = document.getElementById("imgDetection");
    if (image && detectInfo) {
      const top = detectInfo.top_row * image.clientHeight;
      const left = detectInfo.left_col * image.clientWidth;
      const width =
        (detectInfo.right_col - detectInfo.left_col) * image.clientWidth;
      const height =
        (detectInfo.bottom_row - detectInfo.top_row) * image.clientHeight;

      setBoxStyle({
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      });
    }
  };

  const errorMsg = error
    ? getError({ err: error }).includes("Failed to fetch")
    : null;
  return (
    <div className="relative flex justify-center text-center">
      <div className="absolute">
        {errorMsg && <ShowError type="offline" />}
        {errorMsg !== null && !errorMsg && (
          <ShowError type="error" message={"link is not found"} />
        )}

        <img
          width={350}
          id="imgDetection"
          src={imageURL}
          alt=""
          onLoad={handleImageLoad}
        />
        <div className="bounder-box" style={boxStyle} />
        <br />
        <h2 className="text-5xl font-bold">{imageName}</h2>
      </div>
    </div>
  );
}
