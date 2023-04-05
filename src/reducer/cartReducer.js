const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;

    // tackle the existing product
    /* 
        Cụ thể, nếu sản phẩm đã tồn tại trong giỏ hàng, đoạn code sẽ tạo một mảng mới chứa thông tin về tất cả các sản phẩm 
        trong giỏ hàng, trong đó sản phẩm có id và màu sắc tương tự với sản phẩm được thêm vào giỏ hàng sẽ được cập nhật 
        số lượng. Nếu số lượng mới lớn hơn giới hạn tối đa của sản phẩm, thì số lượng sản phẩm sẽ được giới hạn là giới 
        hạn tối đa. Đối với những sản phẩm không giống với sản phẩm được thêm vào giỏ hàng, chúng sẽ được giữ nguyên.
        Sau khi cập nhật mảng sản phẩm, đoạn code sẽ trả về một đối tượng mới có chứa thông tin về trạng thái mới của giỏ hàng, 
          trong đó danh sách các sản phẩm được cập nhật.    
    */

    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id + color) {
          let newAmount = curElem.amount + amount;

          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
      /* 
        Trong đoạn code này, khi sản phẩm chưa có trong giỏ hàng (điều kiện if không thỏa mãn), chương trình tạo ra một 
        đối tượng cartProduct để mô tả thông tin sản phẩm đó trong giỏ hàng. Đối tượng cartProduct bao gồm các thông tin 
        như id (được tạo từ id và color của sản phẩm), name (tên sản phẩm), color (màu của sản phẩm), amount (số lượng sản phẩm)
        , image (hình ảnh sản phẩm), price (giá của sản phẩm), và max (số lượng tối đa có thể mua của sản phẩm).

        Sau khi tạo đối tượng cartProduct, chương trình sử dụng toán tử spread ... để tạo một bản sao của state, rồi thêm 
        đối tượng 
        cartProduct vào mảng cart của state. Kết quả cuối cùng là một state mới với đối tượng cartProduct đã được thêm vào 
        giỏ hàng.
    */
    } else {
      let cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // to set the increment and decrement
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let decAmount = curElem.amount - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }

        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let incAmount = curElem.amount + 1;

        if (incAmount >= curElem.max) {
          incAmount = curElem.max;
        }

        return {
          ...curElem,
          amount: incAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  // to empty or to clear to cart
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  // if (action.type === "CART_TOTAL_ITEM") {
  //   let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
  //     let { amount } = curElem;

  //     initialVal = initialVal + amount;
  //     return initialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_item: updatedItemVal,
  //   };
  // }

  // if (action.type === "CART_TOTAL_PRICE") {
  //   let total_price = state.cart.reduce((initialVal, curElem) => {
  //     let { price, amount } = curElem;

  //     initialVal = initialVal + price * amount;

  //     return initialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_price,
  //   };
  // }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    let { total_item, total_price } = state.cart.reduce(
      (accum, curElem) => {
        let { price, amount } = curElem;

        accum.total_item += amount;
        accum.total_price += price * amount;

        return accum;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );
    return {
      ...state,
      total_item,
      total_price,
    };
  }

  return state;
};

export default cartReducer;

// https://stackoverflow.com/questions/63117470/how-to-return-two-values-in-reduce#:~:text=You%20cannot%20return%20two%20values%20in%20reduce%20.
