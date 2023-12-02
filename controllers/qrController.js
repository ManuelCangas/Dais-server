import QRCode from "qrcode";

const generateQRCode = async (data) => {
  try {
    const qrImage = await QRCode.toDataURL(data);
    return qrImage;
  } catch (error) {
    console.error("Error generating QR code: ", error);
    return null;
  }
};

export default generateQRCode;
