import { renderBlock } from "./lib.js";
//localStorage.setItem('user', JSON.stringify({username: 'Wade Warren', avatarUrl: '/img/avatar.png'}))
export function getUserData(): { username: string; avatarUrl: string } {
  const localStorageData: string | null = localStorage.getItem("user");
  if (typeof localStorageData == "string") {
    const userData = JSON.parse(localStorageData);
    if (userData === null) {
      return { username: "undefined", avatarUrl: "undefined" };
    }
    if (
      typeof userData.username === "string" &&
      typeof userData.avatarUrl === "string"
    ) {
      return { username: userData.username, avatarUrl: userData.avatarUrl };
    } else {
      return { username: "undefined", avatarUrl: "undefined" };
    }
  } else {
    return { username: "undefined", avatarUrl: "undefined" };
  }
}

// export function getFavoritesAmount(): number {
//   const request = +localStorage.getItem("favoritesAmount");
//   if (typeof request === "number") {
//     return request;
//   }
//   return 0;
// }

export function getFavoritesAmount(key = "favoriteItems"): number {
  const localStorageItem = localStorage.getItem(key);

  if (localStorageItem === null) {
    return 0;
  }

  const data: unknown = JSON.parse(localStorageItem);

  if (Array.isArray(data)) {
    return data.length;
  }

  return 0;
}

export function renderUserBlock() {
  const user = getUserData();
  const userName = user.username;
  const userAvatarLink = user.avatarUrl;
  const favoriteItemsAmount = getFavoritesAmount();
  const favoritesCaption =
    favoriteItemsAmount > 0 ? favoriteItemsAmount : "ничего нет";
  const hasFavoriteItems = favoriteItemsAmount > 0 ? true : false;

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src=${userAvatarLink} alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${
              hasFavoriteItems ? " active" : ""
            }"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
