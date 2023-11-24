import { Check } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const UploadImage = () => {
  const [ImageFile, setImageFile] = useState<string>("");

  const handleSubmit = async () => {
    if (ImageFile === "") {
      return alert("Please upload image.");
    }

    try {
      const data = new FormData();
      data.append("file", ImageFile);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
        data
      );
      const { url } = uploadRes.data;

      console.log(url);

      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/screensaver/update`,
        {
          imageUrl: url,
        }
      );
      toast.success("Sucessfully update the screensaver!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const fileTypeChecking = (e: any) => {
    var fileInput = document.getElementById("file-upload") as HTMLInputElement;
    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  return (
    <div style={{ width: "360px", height: "360px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div className="upload-image-container">
          <img
            src={
              ImageFile
                ? URL.createObjectURL(
                    new Blob([ImageFile], { type: "image/jpeg" })
                  )
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="AddImage"
            className="addcategory-img"
          />
          <label htmlFor="file-upload" className="receipt-input-image">
            Upload the image of screensaver here..
            <input
              type="file"
              id="file-upload"
              onChange={fileTypeChecking}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
