import { useEffect } from "react";
import "../styles/components/Notification.css";

interface Props {
  msg: string;
  onClose: () => void; // callback som App kallar för att stänga notisen
}

export default function Notification({ msg, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(() => {
      onClose(); // stänger notisen efter 2 sek
    }, 2000);

    return () => clearTimeout(t);
  }, [msg, onClose]);

  return <div className="notification">{msg}</div>;
}
