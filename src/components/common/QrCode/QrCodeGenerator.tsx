// components/QrCodeGenerator.tsx
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QrCodeGeneratorProps {
  url: string;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, (error) => {
        if (error) console.error(error);
      });
    }
  }, [url]);

  return <canvas ref={canvasRef} />;
};
 const sum = (a: number, b: number) => a + b;
export default QrCodeGenerator;

