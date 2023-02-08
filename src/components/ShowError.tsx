import NotFound from "../images/404.png";
import NetWorkError from "../images/500.png";

type TError = { type: "offline"; message?: never };
type TOffline = { type: "error"; message: string };
type TErrorMsg = TError | TOffline;

export default function ShowError({ type, message }: TErrorMsg) {
  return (
    <div className="flex flex-col w-screen md:w-[35vw] justify-center text-center mx-auto my-28 ">
      {type === "offline" ? (
        <img src={NetWorkError} alt="Network or Server Error" />
      ) : (
        type === "error" && <img src={NotFound} alt="404 Not Found" />
      )}
      <h3 className="my-0 mx-3 leading-tight text-3xl">
        {message ||
          "Your is offline please check your connection and try again"}
      </h3>
    </div>
  );
}
