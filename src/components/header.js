import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StyledLink from '../utils/styled-link';

const INTERVAL = 10

const Container = styled.nav`
  transition: border-color ${INTERVAL}s ease;
  border-color: ${props => props.color};
  border-top: 4px solid ${props => props.color};
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const SocialIcon = styled.svg`
  transition: fill ${INTERVAL}s ease;
  height: 2rem;
  width: 2rem;
  padding: 1.5rem 1rem;
  fill: ${props => props.color};
`;

const SocialContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#f15025',
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        // This crazy color generator is from https://www.paulirish.com/2009/random-hex-color-code-snippets/
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      });
    }, INTERVAL * 1000);
  }

  render() {
    return (
      <Container color={this.state.color}>
        <StyledLink to={'/'}>
          <SocialIcon width="24" height="24" color={this.state.color} alt="patricklee">
            <path d="M11.6 24h-5.619l.019-10-2.983 8.721-3.017-.721 3.981-16 4-1.727c-.888-.944-1.355-2.337 0-3.242 0 0 1.432-1.018 4.019-1.027 2.587-.01 3.981.997 3.981.997 1.326.843.896 2.468 0 3.27l4 1.729 4.019 16-3 .73-3-8.73-.019 10h-5.581v-21.496c1.467-.05 2.6-.366 2.6-.748 0-.417-1.344-.755-3-.755s-3 .338-3 .755c0 .382 1.133.698 2.6.748v21.496zm3.545-7.021l-.645.469 2.355 3.234.645-.469-2.355-3.234zm-6.29 0l.645.469-2.355 3.234-.645-.469 2.355-3.234z"/>
          </SocialIcon>
        </StyledLink>
        <SocialContainer>
          <a
            href={`https://twitter.com/patleeman`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon alt="twitter" width="24" height="24" color={this.state.color}>
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </SocialIcon>
          </a>
          <a
            href={`https://github.com/patleeman`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon alt="github" width="24" height="24" color={this.state.color}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </SocialIcon>
          </a>
          <a
            href={`https://linkedin.com/in/patclee`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon alt="linkedin" width="24" height="24" color={this.state.color}>
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
            </SocialIcon>
          </a>
        </SocialContainer>
      </Container>
    );
  }
}

Header.defaultProps = {
  title: '',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
