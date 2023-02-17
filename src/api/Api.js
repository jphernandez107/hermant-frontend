const baseURL = "http://localhost:5001/";

const getEquipmentList = async () => {
  return getGenericList('equipment/list')
};

const getEquipmentByCode = async (code) => {
  return getDetailsByCode('equipment/details', code)
}

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

const getDetailsByCode = async (url, code) => {
  try {
    const response = await fetch(baseURL + url + '?code=' + code);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
}

module.exports = {
  getEquipmentList,
  getEquipmentByCode,
  getConstructionSiteList,
  getSparePartList
};
