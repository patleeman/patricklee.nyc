import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StyledLink from '../utils/styled-link';
import media from '../utils/media';
import Twitter from '../images/social/twitter.svg';
import Github from "../images/social/github.svg";
import LinkedIn from "../images/social/linkedin.svg";
import Email from "../images/social/email.svg";
import Hoodie from "../images/icon.svg";

const Container = styled.nav`
  border-top: 4px solid #f15025;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-family: 'BioRhyme', serif;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  margin: 0 20px;
  color: #ffffff;
  background-color: #f15025;
  border-radius: 30px;
  padding: 5px;

  ${media.phone`
    text-align: center;
  `}
`;

const SocialIcon = styled.img`
  height: 2rem;
  width: 2rem;
  padding: 1.5rem 1rem;
  fill: #f15025;
`;

const SocialContainer = styled.div`
  display: flex;
  align-items: flex-end;
`


const Header = ({ title }) => (
  <Container>
    <StyledLink to={'/'}>
      <SocialIcon src={Hoodie} alt="" />
    </StyledLink>
    <SocialContainer>
      <a
        href={`https://twitter.com/patleeman`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialIcon src={Twitter} alt="twitter" />
      </a>
      <a
        href={`https://github.com/patleeman`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialIcon src={Github} alt="github" />
      </a>
      <a
        href={`https://linkedin.com/in/patclee`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialIcon src={LinkedIn} alt="linkedin" />
      </a>
    </SocialContainer>
  </Container>
);

Header.defaultProps = {
  title: '',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
