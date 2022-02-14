import styled from 'styled-components';

const NavSearchContainer = styled.div`
  background-color: #e7e7e7;
  border-radius: 15px;
  height: 2rem;
  width: 20rem;
  padding: 5px 15px;
`;

const NavSearchInput = styled.input`
  background-color: #e7e7e7;
  display: inline;
  margin-top: 2px;
  /* float: left; */
  position: absolute;
  border: none;
  &:focus {
    outline: none;
  }
`;

const NavSearchIcon = styled.img`
  display: block;
  margin-left: auto;
  width: 20px;
`;

const NavSearch = () => {
  return (
    <NavSearchContainer>
      <NavSearchInput></NavSearchInput>
      <NavSearchIcon src="/icons/search.png" />
    </NavSearchContainer>
  );
};

export default NavSearch;
