const React = require('react');

module.exports = {
  Box: ({ children, ...props }) => <div {...props}>{children}</div>,
  Flex: ({ children, ...props }) => <div {...props}>{children}</div>,
  Heading: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
  Stack: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Text: ({ children, ...props }) => <p {...props}>{children}</p>,
  Input: (props) => <input {...props} />,
  AbsoluteCenter: ({ children, ...props }) => <div {...props}>{children}</div>,
  Span: ({ children, ...props }) => <span {...props}>{children}</span>,
};
