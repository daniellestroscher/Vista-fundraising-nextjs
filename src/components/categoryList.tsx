import "./categoryList.css"
import { CrowdfundWithMeta } from "../types";
import CrowdfundCard from "./crowdfund-card";

type props = {
  category: string;
  list: CrowdfundWithMeta[];
};
export default function CategoryList({ category, list }: props) {

  let filteredList = list.filter((crowdfund) => {
    return crowdfund.category == category;
  });

  return (
    <>
      {filteredList.length !== 0 && (
        <h4
          className="category-title"
        >
          {category}
        </h4>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflow: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {filteredList.length !== 0 &&
          filteredList.map((item, i) => {
            return (
              <div key={i}>
                <CrowdfundCard crowdfund={item} />
              </div>
            );
          })}
      </div>
    </>
  );
}
