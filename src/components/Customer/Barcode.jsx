import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Barcode = () => {
  const [barcodeNumber, setBarcodeNumber] = useState("");
  const barcodeRef = useRef(null); // This will hold the barcode image

  // Function to generate a random barcode number
  const generateRandomBarcode = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Random 10 digit number
    setBarcodeNumber(randomNumber);
  };

  // Function to generate the barcode using JsBarcode
  const generateBarcode = () => {
    if (barcodeRef.current && barcodeNumber) {
      JsBarcode(barcodeRef.current, barcodeNumber, {
        format: "CODE128", // Barcode format
        displayValue: true, // Show the barcode number below the barcode
      });
    }
  };

  // Generate the barcode when the barcodeNumber changes
  useEffect(() => {
    if (barcodeNumber) {
      generateBarcode();
    }
  }, [barcodeNumber]);

  // Function to generate and download PDF with barcode
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.text("Generated Barcode", 20, 20);
    doc.addImage(barcodeRef.current, "PNG", 20, 30, 180, 30); // Add barcode image to PDF
    doc.save("barcode.pdf"); // Save the PDF
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Generate Barcode
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={generateRandomBarcode}
        sx={{ marginBottom: "20px" }}
      >
        Generate Barcode
      </Button>
      <div>
        {barcodeNumber && (
          <div>
            <Typography variant="h6" gutterBottom>
              Barcode Number: {barcodeNumber}
            </Typography>
            <svg ref={barcodeRef}></svg> {/* Barcode will be rendered here */}
          </div>
        )}
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={generatePDF}
        sx={{ marginTop: "20px" }}
        disabled={!barcodeNumber} // Disable until barcode is generated
      >
        Download Barcode as PDF
      </Button>
    </Box>
  );
};

export default Barcode;
