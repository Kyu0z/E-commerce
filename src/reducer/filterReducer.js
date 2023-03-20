const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.price);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 5 ~ filterReducer ~ priceArr",
        priceArr
      );

      let maxPrice = Math.max(...priceArr);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 23 ~ filterReducer ~ maxPrice",
        maxPrice
      );

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          /* localeCompare là một phương thức của đối tượng chuỗi JavaScript (String) 
           được sử dụng để so sánh hai chuỗi theo thứ tự từ điển trong một ngôn ngữ cụ thể được chỉ định. */
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company, color, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          /* toLowerCase: Khi gọi phương thức toLowerCase() trên một chuỗi, 
          phương thức sẽ trả về một chuỗi mới với tất cả các ký tự trong chuỗi ban đầu được chuyển đổi thành ký tự thường. 
          includes: kiểm tra xem một chuỗi có chứa một chuỗi con cụ thể hay không. Phương thức này trả về 
          giá trị boolean (true hoặc false),
          -> có thể được sử dụng trên mảng để kiểm tra xem một giá trị có tồn tại trong mảng hay không.
          */
          return curElem.name.toLowerCase().includes(text);
        });
      }

      /* 
        kiểm tra xem giá trị của biến category có khác với chuỗi "all" không. Nếu biến category không bằng "all", 
        nó sẽ thực hiện lọc các phần tử trong một mảng tempFilterProduct và chỉ giữ lại những phần tử có thuộc tính category 
        bằng với giá trị của biến category.
      */
      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        );
      }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          // (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
          (curElem) => curElem.company === company
        );
      }

      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.colors.includes(color)
        );
      }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price == price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }
      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
