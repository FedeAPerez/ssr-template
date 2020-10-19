const React = require("react");
const { Helmet } = require("react-helmet");

const PageTemplate = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>SSR Template by Fede Pérez</title>
        <meta
          name="description"
          content="This SSR Template is mantained by Federico Pérez to enable fast and relaible SSR websites."
        />
      </Helmet>
      {children}
    </>
  );
};

module.exports = PageTemplate;
