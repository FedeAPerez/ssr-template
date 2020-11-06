const React = require('react');
const PageTemplate = require('./index');
const SSRTemplate = require('../../components/ssr-template');

const Page = ({ initialState }) => {
  const { title } = initialState;

  return (
    <PageTemplate>
      <SSRTemplate />
      <h1>{title}</h1>
    </PageTemplate>
  );
};

module.exports = Page;
