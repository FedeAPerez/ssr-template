const React = require("react");
const { Helmet } = require("react-helmet");

const PageTemplate = ({ children }) => {
  return (
    <>
      <Helmet></Helmet>
      {children}
    </>
  );
};

module.exports = PageTemplate;
