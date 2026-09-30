import axios from "axios";

export default class GenericData {
  static countries = async (): Promise<any> => {
    const response = await axios.get(
      "https://api.strategic.ae/api/generic/countries"
    );
    return response.data;
  };

  static countryCodes = async (): Promise<any> => {
    const response = await axios.get(
      "https://api.strategic.ae/api/generic/countrycodes"
    );
    return response.data;
  };
}
