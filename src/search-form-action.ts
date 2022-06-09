import { searchCallback, SearchFormData } from "./interfaces.js";
import {
  renderEmptyOrErrorSearchBlock,
  makeListContent,
  renderSearchResultsBlock,
} from "./search-results.js";
import { FavoritePlace } from "./types.js";

import { renderUserBlock } from "./user.js";

export function toggleFavoriteItem(e: Event): void {
  if (!(e.currentTarget instanceof HTMLDivElement)) {
    return;
  }

  const id = Number(e.currentTarget.dataset.id);
  const name = e.currentTarget.dataset.name;
  const image = e.currentTarget.nextElementSibling.getAttribute("src");
  const currentPlace: FavoritePlace = {
    id,
    name,
    image,
  };

  const localStorageItem = localStorage.getItem("favoriteItems");

  if (localStorageItem) {
    const favoriteItems: unknown = JSON.parse(localStorageItem);

    if (Array.isArray(favoriteItems)) {
      const favoriteItem = favoriteItems.find((item) => item.id === id);

      if (favoriteItem) {
        removeFavoriteItemFromStorage(favoriteItem, favoriteItems);
        e.currentTarget.classList.remove("active");
      } else {
        addFavoriteItemToStorage(currentPlace, favoriteItems);
        e.currentTarget.classList.add("active");
      }
    }
  } else {
    localStorage.setItem("favoriteItems", JSON.stringify([currentPlace]));
    e.currentTarget.classList.add("active");
  }

  renderUserBlock();
}

function removeFavoriteItemFromStorage(
  favoriteItem: FavoritePlace,
  favoriteItems: FavoritePlace[]
): void {
  const indexOfItem = favoriteItems.indexOf(favoriteItem);
  favoriteItems.splice(indexOfItem, 1);

  if (favoriteItems.length) {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  } else {
    localStorage.removeItem("favoriteItems");
  }
}

function addFavoriteItemToStorage(
  currentPlace: FavoritePlace,
  favoriteItems: FavoritePlace[]
): void {
  favoriteItems.push(currentPlace);
  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
}

export const showSearchResult: searchCallback = (error, result): void => {
  if (error == null && result != null) {
    renderSearchResultsBlock(makeListContent(result));

    const buttons = document.querySelectorAll(".favorites");
    buttons.forEach((button) => {
      button.addEventListener("click", toggleFavoriteItem);
    });
  } else {
    renderEmptyOrErrorSearchBlock(error);
  }
};

export async function searchFunction(
  reqData: SearchFormData,
  callback: searchCallback
) {
  const buttons = document.querySelectorAll(".favorites");
  buttons.forEach((button) => {
    button.removeEventListener("click", toggleFavoriteItem);
  });

  let url =
    "http://localhost:3030/places?" +
    `checkInDate=${dateToUnixStamp(reqData.checkInDate)}&` +
    `checkOutDate=${dateToUnixStamp(reqData.checkOutDate)}&` +
    "coordinates=59.9386,30.3141";

  if (reqData.maxPrice != null) {
    url += `&maxPrice=${reqData.maxPrice}`;
  }

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status === 200) {
      if (result.length) {
        callback(null, result);
      } else {
        callback("Ничего не найдено. Попробуйте изменить параметры поиска.");
      }
    } else {
      callback(result.message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function dateToUnixStamp(date: Date) {
  return date.getTime() / 1000;
}

export function search() {
  const form = document.getElementById("search-block");
  form.onsubmit = function () {
    event.preventDefault();
    const searchData: SearchFormData = {
      city: document.forms["search-block"].elements["city"].value,
      checkInDate: new Date(
        document.forms["search-block"].elements["check-in-date"].value
      ),
      checkOutDate: new Date(
        document.forms["search-block"].elements["check-out-date"].value
      ),
      maxPrice: +document.forms["search-block"].elements["max-price"].value,
    };
    searchFunction(searchData, showSearchResult);
  };
}
