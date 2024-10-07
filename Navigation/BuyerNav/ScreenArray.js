import AdditionalInfo from "../../screens/Buyer/Home.js/AdditionalInfo";
import CakeDetails from "../../screens/Buyer/Home.js/CakeDetails";
import CategoryCakes from "../../screens/Buyer/Home.js/CategoryCakes";
import VendorDetails from "../../screens/Buyer/Home.js/VendorDetails";
import Wishlist from "../../screens/Buyer/Home.js/Wishlist";
import BuyerOrderDetails from "../../screens/Buyer/Order/BuyerOrderDetails";
import PaymentPage from "../../screens/Buyer/Order/PaymentPage";
import EditProfile from "../../screens/Buyer/Profile/EditProfile";

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
    title: "",
  },
  {
    name: "paymentForm",
    component: PaymentPage,
    title: "",
  },
  {
    name: "wishlist",
    component: Wishlist,
    title: "",
  },
  {
    name: "editProfile",
    component: EditProfile,
    title: "",
  },
];
