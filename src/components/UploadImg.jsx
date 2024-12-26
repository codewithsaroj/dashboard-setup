// import React, { useState, useRef } from "react";
// import { Box } from "@mui/material";
// import BannerImage from "../assets/banner.jpg";

// const BannerImageUpload = () => {
//   const [imagePreview, setImagePreview] = useState(BannerImage);
//   const imageInputRef = useRef(null); 

//   // Handle file change and display preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); // Store the image URL for preview
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         height: "200px",
//         background: imagePreview ? `url(${imagePreview}) no-repeat center center` : "#e0e0e0",
//         backgroundSize: "cover",
//         cursor: "pointer",
//         "&:hover .upload-overlay": {
//           opacity: 1, 
//         },
//       }}
//       onClick={() => imageInputRef.current.click()} 
//     >
//       {/* Image upload overlay */}
//       <Box
//         className="upload-overlay"
//         sx={{
//           position: "absolute",
//           top: "0",
//           left: "0",
//           right: "0",
//           bottom: "0",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           opacity: 0, // Initially hidden
//           transition: "opacity 0.3s",
//           color: "#fff",
//           fontSize: "18px",
//         }}
//       >
//         <span>Click to Upload</span>
//       </Box>

//       {/* Hidden file input */}
//       <input
//         ref={imageInputRef}
//         type="file"
//         style={{ display: "none" }}
//         onChange={handleImageChange}
//         accept="image/*"
//       />
//     </Box>
//   );
// };

// export default BannerImageUpload;
