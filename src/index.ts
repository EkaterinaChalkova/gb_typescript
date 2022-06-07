import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock, getFavoritesAmount, getUserData } from "./user.js";
import { renderToast } from "./lib.js";
import { search } from "./search-form-action.js";

window.addEventListener("DOMContentLoaded", () => {
  const user = getUserData();
  const favorites = getFavoritesAmount();
  renderUserBlock(user.username, user.avatarUrl, favorites);
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
  search();
});
