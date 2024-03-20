import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const CategoryWrapper = styled.div`
  flex: 0 0 calc(100% / 3); /* Each category item occupies one third of the screen */
  max-width: calc(100% / 3); /* Set a maximum width to ensure responsiveness */
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryWrapper>
          <CategoryItem item={item} key={item.id}/>
        </CategoryWrapper>
      ))}
    </Container>
  );
};

export default Categories;
