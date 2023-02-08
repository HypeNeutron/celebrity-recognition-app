import React, { useState } from "react";

import FaceRecognition from "./components/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm";
import Logo from "./components/Logo";
import Particle from "./components/Particles";
import showToast from "./utils/showToast";

export type TDetectInfo = {
  top_row: number;
  left_col: number;
  bottom_row: number;
  right_col: number;
};
export type TBoxStyle = {
  top: string;
  left: string;
  width: string;
  height: string;
  border: string;
};
function App() {
  const [imageName, setImageName] = useState<string>();
  const [imageURL, setImageURL] = useState<string>();
  const [detectInfo, setDetectInfo] = useState<TDetectInfo>();
  const [error, setError] = useState<Error | null>(null);
  const [boxStyle, setBoxStyle] = useState<TBoxStyle | object>({});

  const onButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBoxStyle({});
    setImageName(undefined);
    setImageURL(undefined);
    setDetectInfo(undefined);
    setError(null);
    const form = new FormData(e.target as HTMLFormElement);
    const { inputURL } = Object.fromEntries(form.entries());
    if (typeof inputURL !== "string") return;
    if (inputURL === "")
      return showToast({
        type: "warning",
        message: "URL is Blank",
        hideProgress: true,
      });
    if (
      !inputURL.match(
        /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/i
      )
    )
      return showToast({
        type: "warning",
        message: "URL is Invalid",
        hideProgress: true,
      });

    const raw = JSON.stringify({
      user_app_id: {
        user_id: import.meta.env.VITE_CLARIFAI_USER_ID,
        app_id: import.meta.env.VITE_CLARIFAI_APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: inputURL,
            },
          },
        },
      ],
    });
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + import.meta.env.VITE_CLARIFAI_PAT_ID,
      },
      body: raw,
    };
    fetch(
      "https://api.clarifai.com/v2/models/" +
        "celebrity-face-detection" +
        "/versions/" +
        "2ba4d0b0e53043f38dbbed49e03917b6" +
        "/outputs",
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        setDetectInfo(
          result.outputs[0].data.regions[0].region_info.bounding_box
        );
        setImageName(result.outputs[0].data.regions[0].data.concepts[0].name);
        setImageURL(inputURL);
      })
      .catch((err) => setError(err as Error));
  };

  return (
    <>
      <Particle />
      <Logo />
      <ImageLinkForm onButtonClick={onButtonClick} />
      <FaceRecognition
        {...{ detectInfo, imageName, imageURL, error, boxStyle, setBoxStyle }}
      />
    </>
  );
}

export default App;
