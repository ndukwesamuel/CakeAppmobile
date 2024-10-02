import ApplicationForm from "../../screens/Vendor/Applications/ApplicationForm";
import ApplicationPreview from "../../screens/Vendor/Applications/ApplicationPreview";
import CakeDetails from "../../screens/Vendor/Home/CakeDetails";
import CakePreview from "../../screens/Vendor/Home/CakePreview";
import Home from "../../screens/Vendor/Home/Home";
import OrderDetails from "../../screens/Vendor/Home/OrderDetails";
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
  {
    name: "cakeDetails",
    component: CakeDetails,
    title: "",
  },
  {
    name: "orderDetails",
    component: OrderDetails,
    title: "",
  },
  {
    name:"home", 
    component: Home,
    title:""
  }
];
