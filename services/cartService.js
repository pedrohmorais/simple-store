const addProductToCart = (product) => {
  const products = getCartProducts();
  if (product) {
    products.push(product);
    localStorage.setItem('cart', JSON.stringify(products));
  }

  return products;
}

const removeProductFromCart = (product) => {
  let products = getCartProducts();
  if (product) {
    products = products.filter(p => p.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(products));
  }

  return products;
}

const getCartProducts = () => {
  if (!localStorage || !localStorage['cart']) {
    return [];
  }
  return JSON.parse(localStorage['cart']); 
}

const hasCart = () => {
  const products = getCartProducts();

  return products && products[0];
}

export {
  hasCart,
  removeProductFromCart,
  getCartProducts,
  addProductToCart,
}