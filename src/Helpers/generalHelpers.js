import Data from "../Components/Category/List.json";

export const calculateAverageValueForList = (listOfValues) => {
  const averageValue = listOfValues
    ? listOfValues.reduce((totalValue, singleValue) => {
        return totalValue + singleValue.value / listOfValues.length;
      }, 0)
    : null;

  return averageValue;
};

export const CategoryName = (CatagoryList) => {
  const Name = CatagoryList.map((n) => {
    return { catagory: n.category, Icon: n.icon };
  });
  return Name;
};
export const findSubCategoryOfItems = (id) => {
  const allcategoriesOfAItem = Data.find((item) => {
    return item.id.toString() === id;
  });
  return allcategoriesOfAItem.subCategory;
};

export const findSubCategoryOfItemsByCategory = (category) => {
  const allcategoriesOfAItem = Data.find((item) => {
    return item.category.toString() === category;
  });
  return allcategoriesOfAItem.subCategory;
};
