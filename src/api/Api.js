const baseURL = "http://localhost:5001/";

const getEquipmentList = async () => {
  return getGenericList('equipment/list')
};

const getConstructionSiteList = async () => {
  return getGenericList('site/list')
};

const getSparePartList = async () => {
  return getGenericList('part/list')
};

const getGenericList = async (url) => {
  try {
    const response = await fetch(baseURL + url);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
}

module.exports = {
  getEquipmentList,
  getConstructionSiteList,
  getSparePartList
};
