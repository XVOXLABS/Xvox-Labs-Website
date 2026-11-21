import { getHeaderNav, getMobileMenu, getServicesMenu, getSolutionsMenu } from "@/lib/navigation";
import HeaderClient from "./HeaderClient";

// Server wrapper: builds the navigation model from data/ and hands it to the client header.
export default function Header() {
  return (
    <HeaderClient
      nav={getHeaderNav()}
      menus={{ solutions: getSolutionsMenu(), services: getServicesMenu() }}
      mobile={getMobileMenu()}
    />
  );
}
