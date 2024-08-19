import ApplicationForm from "../../screens/Vendor/Applications/ApplicationForm";
import ApplicationPreview from "../../screens/Vendor/Applications/ApplicationPreview";
import CakePreview from "../../screens/Vendor/Home/CakePreview";
import UploadProduct from "../../screens/Vendor/Home/UploadProduct";

export const screens = [
  {
    name: "uploadProduct",
    component: UploadProduct,
    title: "",
  },
  {
    name: "previewPage",
    component: CakePreview,
    title: "",
  },
  {
    name: "applicationForm",
    component: ApplicationForm,
    title: "",
  },
  {
    name: "applicationPreviewPage",
    component: ApplicationPreview,
    title: "",
  },
];
