import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import media from '../utils/media';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=BioRhyme|Space+Mono');

  :root {
    font-size: 12px;
  }

  body {
    font-family: 'Space Mono', monospace;
    margin: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    color: rgba(0, 0, 0, 0.8);
    min-height: 100vh;
    position: relative;
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'BioRhyme', serif;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2.4rem;
  }

  h4 {
    font-size: 1.6rem;
  }

  code {
    font-family: 'Space Mono', monospace;
    word-break: break-word;
  }

  pre code {
    word-break: normal;
  }

  :not(pre) > code[class*="language-"], pre[class*="language-text"] {
    background-color: transparent;
    color: inherit;
    font-size: medium;
  }
`;

const Footer = styled.footer`
  display: block;
  height: 6rem;
`;

const Content = styled.div`
  width: 60%;
  max-width: 728px;
  margin: 0 auto;

  ${media.tablet`
    width: 80%;
  `}
`;

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Header title={data.site.siteMetadata.title} />
            <Content>{children}</Content>
            <Footer />
            <GlobalStyles />
          </>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
