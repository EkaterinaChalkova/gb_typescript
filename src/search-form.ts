import { renderBlock } from "./lib.js";

export function test() {
  console.log("test");
}

export function renderSearchFormBlock(
  checkIn: string = null,
  checkOut: string = null
) {
  function dayOffset(offset: number): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + offset);
    return currentDate.toISOString().slice(0, 10);
  }

  const TODAY = new Date();
  const minDate = TODAY.toISOString().slice(0, 10);
  const maxDate = new Date(TODAY.getFullYear(), TODAY.getMonth() + 2, 1)
    .toISOString()
    .slice(0, 10);

  const checkInDateString = dayOffset(1);
  const checkOutDateString = dayOffset(3);

  renderBlock(
    "search-form-block",
    `
    <form id="search-block" name="search-block">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div>
            <label for="provider">Постаавщик услуг:</label>
            <select name="provider" id="provider">
              <option deafult value="flat-rent">FlatRent</option>
              <option value="homy">Homy</option>
            </select>
          </div>
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
