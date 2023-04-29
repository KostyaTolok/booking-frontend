import { useEffect, useRef } from "react";

function Modal(props) {
  const modalRef = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      props.setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      props.setOpen(false);
    }
  };
  return <div ref={modalRef}>{props.open && props.children}</div>;
}

export default Modal;
