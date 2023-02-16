const baseURL = "http://localhost:5001/";

const getEquipmentList = async () => {
  try {
    const response = await fetch(baseURL + "equipment/list");
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

const getConstructionSiteList = async () => {
  try {
    const response = await fetch(baseURL + "site/list");
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

module.exports = {
  getEquipmentList,
  getConstructionSiteList
};
