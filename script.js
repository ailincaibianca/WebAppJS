"use strict";

(() => {
  let filterBy = "All";
  let sortBy = "Our Picks";

  //#region Storage
  let containerDataOrigin = [
    { icon: "images/orange.png", name: "Oranges", type: "Fruits", price: 2.12 },
    {
      icon: "images/potato.png",
      name: "Potato",
      type: "Vegetables",
      price: 0.99,
    },
    {
      icon: "images/tomatoes.png",
      name: "Tomatoes",
      type: "Fruits",
      price: 2.46,
    },
    { icon: "images/apples.jpg", name: "Apples", type: "Fruits", price: 1.59 },
    {
      icon: "images/garlic.png",
      name: "Garlic",
      type: "Vegetables",
      price: 1.29,
    },
    {
      icon: "images/watermelon.png",
      name: "Watermelon",
      type: "Fruits",
      price: 2.68,
    },
    { icon: "images/grapes.png", name: "Grapes", type: "Fruits", price: 3.45 },
    {
      icon: "images/spinach.png",
      name: "Spinach",
      type: "Vegetables",
      price: 1.39,
    },
    { icon: "images/corn.png", name: "Corn", type: "Vegetables", price: 2.39 },
    { icon: "images/mango.png", name: "Mango", type: "Fruits", price: 4.96 },
    { icon: "images/peach.png", name: "Peach", type: "Fruits", price: 2.73 },
    {
      icon: "images/blueberries.png",
      name: "Blueberries",
      type: "Fruits",
      price: 4.64,
    },
    {
      icon: "images/strawberries.png",
      name: "Strawberries",
      type: "Fruits",
      price: 4.39,
    },
    { icon: "images/leek.png", name: "Leek", type: "Vegetables", price: 2.99 },
    { icon: "images/peas.png", name: "Peas", type: "Vegetables", price: 1.79 },
    {
      icon: "images/onion.png",
      name: "Onion",
      type: "Vegetables",
      price: 0.82,
    },
    {
      icon: "images/avocado.png",
      name: "Avocado",
      type: "Fruits",
      price: 3.49,
    },
    {
      icon: "images/greenOnion.png",
      name: "Green Onion",
      type: "Vegetables",
      price: 1.31,
    },
    {
      icon: "images/coconut.png",
      name: "Coconut",
      type: "Fruits",
      price: 5.47,
    },
    { icon: "images/melon.png", name: "Melon", type: "Fruits", price: 2.11 },
    {
      icon: "images/pepper.png",
      name: "Pepper",
      type: "Vegetables",
      price: 1.99,
    },
    {
      icon: "images/carrots.png",
      name: "Carrots",
      type: "Vegetables",
      price: 2.26,
    },
    {
      icon: "images/sweetPotato.png",
      name: "Sweet potato",
      type: "Vegetables",
      price: 3.34,
    },
    {
      icon: "images/blackberry.png",
      name: "Blackberries",
      type: "Fruits",
      price: 6.49,
    },
  ];

  containerDataOrigin = containerDataOrigin.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });

  const categories = {
    title: "Our products",
    items: ["All", "Fruits", "Vegetables"],
  };

  const sortByList = ["Our Picks", "Price (low first)", "Price (high first)"];

  let cart = [];

  let containerData = containerDataOrigin.filter((item) => {
    if (filterBy === "All") {
      return true;
    } else {
      return item.type === filterBy;
    }
  });

  containerData = containerData.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });

  cart = cart.map((cartItem, index) => {
    return {
      ...cartItem,
      id: index,
    };
  });
  //#endregion

  //#region Main Container Header
  const containerHeader = document.createElement("div");
  containerHeader.setAttribute("class", "header");
  document.body.appendChild(containerHeader);

  const displayHeader = (headerData) => {
    containerHeader.innerHTML = "";

    const headerTitle = document.createElement("div");
    headerTitle.setAttribute("class", "header-title");
    headerTitle.innerText = headerData.title;

    const categoriesContainer = document.createElement("div");
    categoriesContainer.setAttribute("class", "items-categories");

    headerData.items.forEach((item, index) => {
      const itemNode = document.createElement("div");
      itemNode.setAttribute("class", item === filterBy ? "active" : "");
      itemNode.innerText = item;
      itemNode.addEventListener("click", () => {
        filterItems(item);
      });
      categoriesContainer.appendChild(itemNode);
    });

    const mainSortItems = document.createElement("div");
    mainSortItems.setAttribute("class", "sort-elements");

    const sortItemBy = document.createElement("div");
    sortItemBy.innerHTML = "Sort by: ";
    mainSortItems.appendChild(sortItemBy);

    sortByList.forEach((sort) => {
      const sortContainer = document.createElement("div");
      const sortInput = document.createElement("input");

      sortInput.setAttribute("type", "radio");
      sortInput.setAttribute("name", "sortBy");
      sortInput.setAttribute("id", sort);

      if (sortBy === sort) {
        sortInput.setAttribute("checked", true);
      }

      sortInput.addEventListener("click", () => {
        sortItems(sort);
      });

      const labelOutPicks = document.createElement("label");
      labelOutPicks.setAttribute("for", sort);
      labelOutPicks.innerHTML = sort;

      sortContainer.appendChild(sortInput);
      sortContainer.appendChild(labelOutPicks);
      mainSortItems.appendChild(sortContainer);
    });

    containerHeader.appendChild(headerTitle);
    containerHeader.appendChild(categoriesContainer);
    containerHeader.appendChild(mainSortItems);
  };
  //#endregion

  //#region Main Container - Items
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  document.body.appendChild(container);

  //List of Item
  const displayList = (data) => {
    container.innerHTML = "";

    const mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "items");
    container.appendChild(mainDiv);

    data.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.setAttribute("class", "item");

      const image = document.createElement("img");
      image.setAttribute("src", item.icon);

      const nameItem = document.createElement("div");
      nameItem.innerText = item.name;

      const typeItem = document.createElement("div");
      typeItem.innerText = item.type;

      const priceItem = document.createElement("div");
      priceItem.innerText = `$${item.price}`;

      const addToCart = document.createElement("button");
      addToCart.setAttribute("class", "button");
      addToCart.addEventListener("click", () => {
        const realId = containerDataOrigin.filter(
          (originItem) =>
            JSON.stringify({
              ...originItem,
              id: undefined,
            }) ===
            JSON.stringify({
              ...item,
              id: undefined,
            })
        )[0];

        addItemToCart(realId.id || -1);
      });

      const buttonIcon = document.createElement("i");
      buttonIcon.setAttribute("class", "fas fa-shopping-basket");

      const editProduct = document.createElement("button");
      editProduct.setAttribute("class", "button button-edit");
      editProduct.addEventListener("click", () => {
        editItem(item);
      });

      const editButtonIcon = document.createElement("i");
      editButtonIcon.setAttribute("class", "far fa-edit");

      itemDiv.appendChild(image);
      itemDiv.appendChild(nameItem);
      itemDiv.appendChild(typeItem);
      itemDiv.appendChild(priceItem);

      addToCart.appendChild(buttonIcon);
      itemDiv.appendChild(addToCart);
      editProduct.appendChild(editButtonIcon);
      itemDiv.appendChild(editProduct);

      mainDiv.appendChild(itemDiv);
    });
  };

  //#endregion

  //#region Main Container Cart
  const containerCart = document.createElement("div");
  document.body.appendChild(containerCart);

  const displayCart = (cart, itemsList) => {
    containerCart.innerHTML = "";

    const cartTitle = document.createElement("div");
    cartTitle.setAttribute("class", "cart-title");
    cartTitle.innerText = "Cart";
    containerCart.appendChild(cartTitle);

    const cartItems = document.createElement("div");
    cartItems.setAttribute("class", "items-cart");
    container.appendChild(cartItems);
    containerCart.appendChild(cartItems);

    cart.forEach((cItemData) => {
      const cItem = itemsList.filter((x) => x.id === cItemData.itemId)[0];
      if (!cItem) {
        return;
      }

      const cartItem = document.createElement("div");
      cartItem.setAttribute("class", "item-cart");

      const cartImage = document.createElement("img");
      cartImage.setAttribute("src", cItem.icon);

      const cartContent = document.createElement("div");
      cartContent.setAttribute("class", "item-cart-content");

      const nameItemCart = document.createElement("div");
      nameItemCart.innerText = cItem.name;

      const priceItemCart = document.createElement("div");
      priceItemCart.innerText = `$${cItem.price}`;

      const quantityCart = document.createElement("input");
      quantityCart.setAttribute("type", "number");
      quantityCart.setAttribute("name", "quantity");
      quantityCart.setAttribute("min", "1");
      quantityCart.setAttribute("max", "30");
      quantityCart.setAttribute("step", "1");
      quantityCart.setAttribute("value", cItemData.quantity);
      quantityCart.addEventListener("change", ({ target }) => {
        updateQuantityForItem(cItemData, target.value);
      });

      const removeFromCart = document.createElement("button");
      removeFromCart.setAttribute("class", "cart-button button");
      removeFromCart.appendChild(document.createTextNode("Remove"));
      removeFromCart.addEventListener("click", () => {
        removeItemFromCart(cItemData.id);
      });

      const buttonIconCart = document.createElement("i");
      buttonIconCart.setAttribute("class", "fas fa-trash-alt");

      cartItems.appendChild(cartItem);
      cartItem.appendChild(cartImage);
      cartItem.appendChild(cartContent);
      cartItem.appendChild(removeFromCart);
      removeFromCart.appendChild(buttonIconCart);

      cartContent.appendChild(nameItemCart);
      cartContent.appendChild(priceItemCart);
      cartContent.appendChild(quantityCart);
    });

    const total = document.createElement("div");
    total.setAttribute("class", "footer");
    containerCart.appendChild(total);

    // TOTAL
    const cartIds = cart.map((x) => x.itemId);
    const cartItemsTotal = itemsList.filter((x) => cartIds.includes(x.id));
    const totalPrice = cartItemsTotal.reduce((a, b) => {
      const itemData = cart.filter((x) => x.itemId === b.id)[0];
      if (!itemData) {
        return a;
      }

      return a + b.price * itemData.quantity;
    }, 0);
    // END TOTAL

    const totalTitle = document.createElement("div");
    totalTitle.setAttribute("class", "totalPrice");
    totalTitle.appendChild(document.createTextNode("Total: "));
    totalTitle.appendChild(
      document.createTextNode(`$${totalPrice.toFixed(2)}`)
    );
    total.appendChild(totalTitle);

    const purchaseButton = document.createElement("button");
    purchaseButton.setAttribute("class", "purchase-button");
    purchaseButton.appendChild(document.createTextNode("PURCHASE"));
    purchaseButton.addEventListener("click", () => {
      purchaseButtonClicked();
    });
    total.appendChild(purchaseButton);
  };
  //#endregion

  //#region Functions

  //  ADD BUTTON
  const addItemToCart = (id) => {
    if (cart.filter((cartItem) => cartItem.itemId === id)[0]) {
      const existingItem = cart.filter((cartItem) => cartItem.itemId === id)[0];
      cart[cart.indexOf(existingItem)].quantity += 1;
    } else {
      cart.push({
        itemId: id,
        quantity: 1,
      });

      cart = cart.map((cartItem, index) => {
        return {
          ...cartItem,
          id: index,
        };
      });
    }

    render(containerData, categories, cart);
  };

  // EDIT ITEM
  const editItem = (originalItem) => {
    const image = prompt("Image:", originalItem.icon);
    if (!image) {
      return;
    }

    const name = prompt("Name:", originalItem.name);
    if (!name) {
      return;
    }

    const type = prompt("Type:", originalItem.type);
    if (!type) {
      return;
    }

    const price = prompt("Price:", originalItem.price);
    if (!price) {
      return;
    }

    const containerDataOriginSearch = containerDataOrigin.filter((itemOrg) => {
      return (
        itemOrg.name === originalItem.name &&
        itemOrg.type === originalItem.type &&
        itemOrg.icon === originalItem.icon &&
        itemOrg.price === originalItem.price
      );
    })[0];

    originalItem.id = containerDataOriginSearch.id;
    originalItem.icon = image;
    originalItem.name = name;
    originalItem.type = type;
    originalItem.price = price;

    containerDataOrigin[containerDataOriginSearch.id] = originalItem;

    render(containerData, categories, cart);
  };

  // REMOVE BUTTON
  const removeItemFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    render(containerData, categories, cart);
  };

  //QUANTITY INPUT
  const updateQuantityForItem = (currentItem, newQuantity) => {
    cart[cart.indexOf(currentItem)].quantity = newQuantity;
    render(containerData, categories, cart);
  };

  //FILTER ITEMS
  const filterItems = (newFilter) => {
    filterBy = newFilter;
    render(containerData, categories, cart);
  };

  //SORT ITEMS
  const sortItems = (newSort) => {
    sortBy = newSort;
    render(containerData, categories, cart);
  };

  //PURCHASE BUTTON
  const purchaseButtonClicked = () => {
    alert("Thank you for your purchase");
    cart = [];
    render(containerData, categories, cart);
  };
  //#endregion

  //#region Render
  const render = (containerData, headerData, cart) => {
    containerData = containerDataOrigin.filter((item) => {
      if (filterBy === "All") {
        return true;
      } else {
        return item.type === filterBy;
      }
    });

    switch (sortBy) {
      case "Price (low first)":
        containerData = containerData.sort((a, b) => a.price - b.price);
        break;
      case "Price (high first)":
        containerData = containerData.sort((a, b) => b.price - a.price);
        break;
    }

    containerData = containerData.map((item, index) => {
      return {
        ...item,
        id: index,
      };
    });

    displayHeader(headerData);
    displayList(containerData);
    displayCart(cart, containerDataOrigin);
  };

  //#endregion

  render(containerData, categories, cart);
})();
