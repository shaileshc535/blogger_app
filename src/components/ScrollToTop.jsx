import { useEffect } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
};
