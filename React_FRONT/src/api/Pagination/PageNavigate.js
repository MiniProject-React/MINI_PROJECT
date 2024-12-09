import Pagination from "react-js-pagination";
import { PageNavigateStyled } from "./styled";

export const PageNavigate = ({
  totalItemsCount,
  onChange,
  activePage,
  itemsCountPerPage,
}) => {
  return (
    <PageNavigateStyled>
      <Pagination
        totalItemsCount={totalItemsCount}
        onChange={onChange}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        prevPageText={"<"}
        nextPageText={">"}
        lastPageText={">>"}
        firstPageText={"<<"}
        itemClassFirst={"first"}
        linkClassPrev={"prev"}
        linkClassNext={"next"}
        linkClassLast={"last"}
        activeClass={"active"}
      />
    </PageNavigateStyled>
  );
};
