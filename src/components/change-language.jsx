import enFlag from "@assets/images/enFlag.png";
import faFlag from "@assets/images/faFlag.png";
import { useEffect, useRef, useState } from "react";
export const ChangeLanguage = () => {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const dropDownShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const checkClickOutSide = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", checkClickOutSide);

    return () => {
      document.addEventListener("mousedown", checkClickOutSide);
    };
  }, [show]);
  return (
    <>
      <div className="dropdown" onClick={dropDownShow}>
        <a className="nav-flag dropdown-toggle ">
          <img src={enFlag} alt="english" />
        </a>

        <div
          ref={ref}
          className={`dropdown-menu dropdown-menu-end ${show ? "show" : ""}`}
        >
          <a className="dropdown-item fw-bolder" style={{ textAlign: "right" }}>
            <img src={faFlag} width="20" alt="fa flag" className="ms-2" />
            <span className="align-middle">فارسی</span>
          </a>

          <a className="dropdown-item fw-bolder" style={{ textAlign: "right" }}>
            <img src={enFlag} width="20" alt="en flag" className="ms-2" />
            <span className="align-middle">English</span>
          </a>
        </div>
      </div>
    </>
  );
};
