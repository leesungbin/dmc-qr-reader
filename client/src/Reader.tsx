import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeResult } from "html5-qrcode/esm/core";
import { useEffect } from "react";
import { API_URL } from "./util";

interface ReaderProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<{}>>;
}
let timeout = null as any;
export function Reader({ user, setUser }: ReaderProps) {
  function onScanSuccess(
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) {
    try {
      const TicketID = decodedText.split("=")[1];
      axios.post(`${API_URL}/find`, { TicketID }).then((res) => {
        setUser(res.data);
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          setUser({});
          axios.get(decodedText);
        }, 10000);
      });
    } catch (err) {}
  }

  function onScanFailure(error: string) {}
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 300, height: 300 },
      },
      false
    );
    scanner.render(onScanSuccess, onScanFailure);
  }, []);
  return <div id="reader"></div>;
}
