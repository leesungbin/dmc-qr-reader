import axios from "axios";
import { useHtml5QrCodeScanner } from "react-html5-qrcode-reader";

import { useEffect } from "react";
import { API_URL } from "./util";

interface ReaderProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<{}>>;
}
let timeout = null as any;
export function Reader({ user, setUser }: ReaderProps) {
  const { Html5QrcodeScanner } = useHtml5QrCodeScanner("html5-qrcode.min.js");
  function onScanSuccess(decodedText: string) {
    try {
      const TicketID = decodedText.split("=")[1];
      axios.post(`${API_URL}/find`, { TicketID }).then((res) => {
        setUser(res.data);
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          setUser({});
          axios.get(decodedText);
        }, 7000);
      });
    } catch (err) {}
  }

  function onScanFailure(error: string) {}
  useEffect(() => {
    if (Html5QrcodeScanner) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 260, height: 260 },
          aspectRatio: 1.7777778,
        },
        false
      );
      scanner.render(onScanSuccess, onScanFailure);
    }
  }, [Html5QrcodeScanner]);
  return <div id="reader" style={{ height: "76vh" }}></div>;
}
