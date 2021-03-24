import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="copyright-footer">
      <p>Website by jp.ev &copy; {currentYear}</p>
    </div>
  );
};

export default Footer;
