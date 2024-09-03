import React, { useState } from "react";
import html2canvas from "html2canvas"; // prendre une capture d'écran d'un élément HTML et de le convertir en image.
import { QRCodeCanvas } from "qrcode.react"; // génère un QR Code sous forme de canvas.
import { AiFillCopy, AiOutlineDownload } from "react-icons/ai";
import "./App.css";

function App() {
  const [qr, setQr] = useState(""); // img
  const [url, setUrl] = useState(""); //txt

  const QrCodeDownload = async () => {
    const canvas = await (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL(); // Convertir le contenu du canvas en URL de données

    if (canvas) {
      setQr(canvas); // stocke url de l'image dans qr
      const a = document.createElement("a"); // pour telecharger l'image
      a.download = "QrCode.png";
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const QrCodeCopy = () => {
    navigator.clipboard.writeText(qr); // Copie l'URL de l'image du QR Code dans le presse-papiers
  };

  return (
    <div className="container">
      <div className="header">
        <p className="headerTitle">Generate QrCode</p>
      </div>
      <div className="inputContainer">
        <label className="inputLabel">Write something</label>
        <input
          className="inputField"
          type="text"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div id="canvas" className="qrCodeContainer">
        <QRCodeCanvas
          value={url}
          size={300}
          bgColor={"#ffffff"}
          fgColor={"#0a75ad"}
          level={"H"}
          includeMargin={false}
          imageSettings={{
            src: "/youssef.png",
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
          className="qrCodeImage"
        />
      </div>
      <div className="buttonContainer">
        <button
          onClick={() => QrCodeDownload()}
          className="button buttonDownload"
        >
          <AiOutlineDownload />
          Download
        </button>

        <button onClick={() => QrCodeCopy()} className="button buttonCopy">
          <AiFillCopy />
          Copy
        </button>
      </div>
    </div>
  );
}

export default App;
