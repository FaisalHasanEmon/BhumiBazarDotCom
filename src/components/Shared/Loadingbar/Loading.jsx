import { SyncLoader } from "react-spinners";

function Loading() {
  return (
    <div className="sweet-loading flex justify-center items-center">
      <SyncLoader color="#ae4545" size={30} />
    </div>
  );
}

export default Loading;
