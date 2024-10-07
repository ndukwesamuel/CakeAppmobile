import AdditionalInfo from "../../screens/Buyer/Home.js/AdditionalInfo";
import CakeDetails from "../../screens/Buyer/Home.js/CakeDetails";
import CategoryCakes from "../../screens/Buyer/Home.js/CategoryCakes";
import VendorDetails from "../../screens/Buyer/Home.js/VendorDetails";
import Wishlist from "../../screens/Buyer/Home.js/Wishlist";
import BuyerOrderDetails from "../../screens/Buyer/Order/BuyerOrderDetails";
import Payment from "../../screens/Buyer/Order/Payment";
import PaymentPage from "../../screens/Buyer/Order/PaymentPage";

export const screens = [
  {
    name: "cakeDetails",
    component: CakeDetails,
    title: "",
    headerShown: false, // Hide header for this screen
  },
  {
    name: "VendorDetails",
    component: VendorDetails,
    title: "",
    headerShown: false, // Hide header for this screen
  },
  {
    name: "BuyerOrderDetails",
    component: BuyerOrderDetails,
    title: "",
    headerShown: false, // Hide header for this screen
  },
  {
    name: "categoryCakes",
    component: CategoryCakes,
    title: "",
    headerShown: false, // Hide header for this screen
  },
  {
    name: "additionalInformation",
    component: AdditionalInfo,
    title: "",
    headerShown: false, // Hide header for this screen
  },
  {
    name: "paymentForm",
    component: PaymentPage,
    title: "",
    headerShown: false, // Hide header for this screen
  },
  {
    name: "wishlist",
    component: Wishlist,
    title: "",
    headerShown: false, // Hide header for this screen
  },
  {
    name: "payment",
    component: Payment,
    title: "Payment",
    headerShown: true, // Show header for Payment screen
  },
];
