const React = require('react');

module.exports = {
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  useNavigate: () => jest.fn(), // mockolt hook
};
