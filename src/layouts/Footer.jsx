import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary px-4 lg:px-6 py-4">
      <div className="mx-auto max-w-screen-xl">
        <p className="text-center text-sm text-white">
          © {new Date().getFullYear()} Expense Tracker. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
