export interface SearchFormData {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  maxPrice: number;
}

export function searchFunction(reqData: SearchFormData) {
  console.log(reqData);
}

export function search() {
  const form = document.getElementById('search-block');
  form.onsubmit = function () {
    event.preventDefault();
    const searchData: SearchFormData = {
      city: document.forms['search-block'].elements['city'].value,
      checkInDate:
        document.forms['search-block'].elements['check-in-date'].value,
      checkOutDate:
        document.forms['search-block'].elements['check-out-date'].value,
      maxPrice: document.forms['search-block'].elements['max-price'].value,
    };
    searchFunction(searchData);
  };
}
