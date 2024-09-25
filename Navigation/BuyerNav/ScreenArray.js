import AdditionalInfo from "../../screens/Buyer/Home.js/AdditionalInfo";
import CakeDetails from "../../screens/Buyer/Home.js/CakeDetails";
import CategoryCakes from "../../screens/Buyer/Home.js/CategoryCakes";
import VendorDetails from "../../screens/Buyer/Home.js/VendorDetails";
import BuyerOrderDetails from "../../screens/Buyer/Order/BuyerOrderDetails";

export const screens = [
  {
    name: "cakeDetails",
    component: CakeDetails,
    title: "",
  },

  {
    name: "VendorDetails",
    component: VendorDetails,
    title: "",
  },

  {
    name: "BuyerOrderDetails",
    component: BuyerOrderDetails,
    title: "",
  },
  {
    name: "categoryCakes",
    component: CategoryCakes,
    title: "",
  },
  {
    name: "additionalInformation",
    component: AdditionalInfo,
    title:"",
  },
];
