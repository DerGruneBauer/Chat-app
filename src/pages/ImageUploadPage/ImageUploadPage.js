import { Route, Routes } from "react-router-dom";
import ImageUpload from "./UploadImage/ImageUpload";
import SuccessfulUpload from "../ImageUploadPage/SuccessfulUpload/SuccessfulUpload";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

function ImageUploadPage() {

  const imageUploadProcess = (
    <Routes>
      <Route exact path="/imageupload" element={<ImageUpload />} />
      <Route exact path="/imageupload/success" element={<SuccessfulUpload />} />
      <Route exact path="/imageupload/loading" element={<LoadingBar />} />
    </Routes>
  );

  return (
      <>
      {imageUploadProcess}
      </>
  );
}

export default ImageUploadPage;
