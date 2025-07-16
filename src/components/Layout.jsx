import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function getPageTitle(pathname) {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/raiseissue":
      return "Raise Issue";
    case "/reportedissue":
      return "Reported Issue";
    // add more cases...
    default:
      return "Problem Box";
  }
}

export default function Layout({ children, setshowLogin }) {
  const location = useLocation();

  useEffect(() => {
    const title = getPageTitle(location.pathname);
    document.title = title;
  }, [location.pathname]);

  return (
    <>
      <Navbar setshowLogin={setshowLogin} currentPath={location.pathname} />
      <main>{children}</main>
    </>
  );
}
