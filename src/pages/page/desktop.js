const React = require("react");
const PageTemplate = require("./index");
const SSRTemplate = require("../../components/ssr-template");

const Page = () => {
  return (
    <PageTemplate>
      <SSRTemplate />
    </PageTemplate>
  );
};

module.exports = Page;
