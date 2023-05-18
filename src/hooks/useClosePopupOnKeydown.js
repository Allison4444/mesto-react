import { useEffect } from "react";

function useClosePopupOnKeydown({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    function handleCloseByEsc(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleCloseByEsc);

    return () => {
      document.removeEventListener('keydown', handleCloseByEsc)
    }
  }, [isOpen, onClose])
}

export default useClosePopupOnKeydown;
