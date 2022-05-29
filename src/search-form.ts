import { renderBlock } from "./lib.js";

export function renderSearchFormBlock(
  checkIn: string = null,
  checkOut: string = null
) {
  const TODAY = new Date();
  let minDate = TODAY.toISOString().slice(0, 10);
  let maxDate = new Date(TODAY.getFullYear(), TODAY.getMonth() + 2, 1)
    .toISOString()
    .slice(0, 10);

  let checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 1);
  let checkInDateString = checkInDate.toISOString().slice(0, 10);

  let checkOutDate = new Date();
  checkOutDate.setDate(checkInDate.getDate() + 2);
  let checkOutDateString = checkOutDate.toISOString().slice(0, 10);

  renderBlock(
    "search-form-block",
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${checkInDateString} min=${minDate} max=${maxDate} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${checkOutDateString} min=${minDate} max=${maxDate} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}
