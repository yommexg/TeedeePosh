import { createContext, useState, useEffect, useRef } from "react";

const ScrollContext = createContext({});

export const ScrollProvider = ({ children }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const headerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (
        headerRef.current &&
        footerRef.current &&
        currentScrollPos > headerRef.current.offsetHeight &&
        currentScrollPos <
          document.body.clientHeight - footerRef.current.offsetHeight
      ) {
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      } else {
        // Enable scrolling by setting the body's overflow-y to auto
        document.body.style.overflowY = "auto";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <ScrollContext.Provider
      value={{ visible, headerRef, footerRef, setVisible }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContext;
