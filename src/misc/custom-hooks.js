import { useCallback, useEffect, useState } from "react";
import { database } from "./firebase";

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    open,
    close,
  };
}

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const userStatusRef = database.ref(`status/${uid}`);

    userStatusRef.on("value", (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });

    return () => {
      userStatusRef.off();
    };
  }, [uid]);
  return presence;
}
