import { renderBlock } from "./lib.js";
import { Place } from "./interfaces.js";

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function makeListContent(places: Place[]) {
  const items = [];
  const localStorageItem = localStorage.getItem("favoriteItems");
  let favoriteItems = [];
  if (localStorageItem) {
    const localStorageData: unknown = JSON.parse(localStorageItem);
    if (Array.isArray(localStorageData)) {
      favoriteItems = localStorageData;
    } else {
      favoriteItems = [];
    }
  } else {
    favoriteItems = [];
  }

  places.forEach((place) => {
    const favoriteItem = favoriteItems.find((item) => item.id === place.id);
    let isFavorite: boolean;
    if (favoriteItem) {
      isFavorite = true;
    } else {
      isFavorite = false;
    }

    items.push(
      `
      <li class="result" data-id="${place.id}">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites ${isFavorite ? " active" : ""}" data-id="${
  place.id
}" data-name="${place.name}" data-image="${place.image}"></div>
            <img class="result-img" src="${place.image}" alt="${
  place.name
} hotel" width="225" height="225">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place.name}</p>
              <p class="price">${place.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i>${
  place.remoteness
} км от вас</div>
            <div class="result-info--descr">${place.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`
    );
  });

  return "<ul class=\"results-list\">" + items.join("") + "\n</ul>";
}

export function renderSearchResultsBlock(listContent: string) {
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    ${listContent}
    `
  );
}
