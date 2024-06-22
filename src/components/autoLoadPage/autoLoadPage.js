import { useEffect } from "react";

function AutoLoadPage() {
  return useEffect(() => {
    window.scrollTo(0, 0);

    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handleRouteChange);
    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);
}
export default AutoLoadPage;
