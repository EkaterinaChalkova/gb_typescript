import { searchCallback, SearchFormData } from "./interfaces.js";
import {
  renderEmptyOrErrorSearchBlock,
  makeListContent,
  renderSearchResultsBlock,
} from "./search-results.js";
import { FavoritePlace } from "./types.js";
import { renderUserBlock } from "./user.js";
import { API } from "./dataAPI.js";

export function toggleFavoriteItem(e: Event): void {
  if (!(e.currentTarget instanceof HTMLDivElement)) {
    return;
  }

  // const id = Number(e.currentTarget.dataset.id);
  const id = e.currentTarget.dataset.id;
  const name = e.currentTarget.dataset.name;
  const image = e.currentTarget.dataset.image;
  // e.currentTarget.nextElementSibling.getAttribute("src");
  let currentPlace: FavoritePlace;
  if (id != null && name != null && image != null) {
    currentPlace = {
      id,
      name,
      image,
    };
  } else {
    currentPlace = {
      id: -1,
      name: "",
      image: "",
    };
  }
  const localStorageItem = localStorage.getItem("favoriteItems");
  if (currentPlace.id != -1)
    if (localStorageItem) {
      const favoriteItems: unknown = JSON.parse(localStorageItem);

      if (Array.isArray(favoriteItems)) {
        const favoriteItem = favoriteItems.find((item) => item.id == id);

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

export const showSearchResult: searchCallback = (error = "", result): void => {
  if (error == "" && result != null) {
    renderSearchResultsBlock(makeListContent(result));

    const buttons = document.querySelectorAll(".favorites");
    buttons.forEach((button) => {
      button.addEventListener("click", toggleFavoriteItem);
    });
  } else {
    renderEmptyOrErrorSearchBlock(error);
  }
};

export function dateToUnixStamp(date: Date) {
  return date.getTime() / 1000;
}

export function search() {
  const form: HTMLElement | null = document.getElementById("search-block");
  if (form)
    form.onsubmit = async function (event: Event) {
      event.preventDefault();
      const searchData: SearchFormData = {
        city: (<HTMLInputElement>(
          document.forms[<any>"search-block"].elements[<any>"city"]
        )).value,
        checkInDate: new Date(
          (<HTMLInputElement>(
            document.forms[<any>"search-block"].elements[<any>"check-in-date"]
          )).value
        ),
        checkOutDate: new Date(
          (<HTMLInputElement>(
            document.forms[<any>"search-block"].elements[<any>"check-out-date"]
          )).value
        ),
        maxPrice: +(<HTMLInputElement>(
          document.forms[<any>"search-block"].elements[<any>"max-price"]
        )).value,
      };
      const provider: string = (<HTMLInputElement>(
        document.forms[<any>"search-block"].elements[<any>"provider"]
      )).value;
      const api = new API();
      const data = await api.get(searchData, provider);
      if (data.length) {
        showSearchResult("", data);
      } else {
        showSearchResult(
          "Ничего не найдено. Попробуйте изменить параметры поиска."
        );
      }
    };
}
