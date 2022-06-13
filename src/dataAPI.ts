import { SearchFormData } from "./interfaces.js";
import { FlatRentSdk } from "./flat-rent-sdk.js";
import { dateToUnixStamp, toggleFavoriteItem } from "./search-form-action.js";

export class API {
  private async searchFunctionFlatRent(reqData: SearchFormData) {
    const buttons = document.querySelectorAll(".favorites");
    buttons.forEach((button) => {
      button.removeEventListener("click", toggleFavoriteItem);
    });
    const sdk = new FlatRentSdk();
    const sdkData = {
      city: reqData.city,
      checkInDate: reqData.checkInDate,
      checkOutDate: reqData.checkOutDate,
      priceLimit: reqData.maxPrice,
    };
    return await sdk.search(sdkData).then((data) => {
      const sdkResult = data;
      const result = sdkResult.map((e) => ({
        id: e.id,
        name: e.title,
        description: e.details,
        image: e.photos[0].replace(/http:\/\/localhost:3040/, ""),
        remoteness: 0,
        bookedDates: e.bookedDates.map((b) => dateToUnixStamp(b)),
        price: e.totalPrice,
      }));
      return result;
    });
  }

  private async searchFunction(reqData: SearchFormData) {
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
          return result;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async get(searchData: SearchFormData, provider: string) {
    console.log(provider);
    if (provider == "flat-rent") {
      return await this.searchFunctionFlatRent(searchData);
    } else if (provider == "homy") {
      return await this.searchFunction(searchData);
    } else {
      return [];
    }
  }
}
