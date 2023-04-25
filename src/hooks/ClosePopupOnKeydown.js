import { useEffect } from "react";

function ClosePopupOnKeydown({ onClose }) {
  useEffect(() => {
    function handleCloseByEsc(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleCloseByEsc);

    return () => {
      document.removeEventListener('keydown', handleCloseByEsc)
    }
  })
}

export default ClosePopupOnKeydown;
