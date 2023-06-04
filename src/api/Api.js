// const baseURL = "http://localhost:5001/";
const baseURL = "https://hermant-backend.vercel.app/";

const getEquipmentList = async () => {
  return getGenericList('equipment/list')
};

const getEquipmentByCode = async (code) => {
  return getDetailsByCode('equipment/details', code)
}

const getConstructionSiteList = async () => {
  return getGenericList('site/list')
};

const getConstructionSiteByCode = async (code) => {
  return getDetailsByCode('site/details', code)
}

const getSparePartList = async () => {
  return getGenericList('part/list')
};

const getLubricationSheetList = async () => {  
  return getGenericList('lubricationsheet/list')
}

const postNew = async (url, body, method) => {
  try {
    const response = await fetch(baseURL + url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  } catch (err) {
    return console.log(err)
  }
}

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

const getLubricationSheetByEquipmentCode = async (code) => {
  try {
    const response = await fetch(baseURL + 'lubricationsheet/equipment?equipment_code=' + code);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
}

const addEquipmentUseHours = async (body, code) => {
  try {
    const response = await fetch(baseURL + 'equipment/hours?code=' + code, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
}

export default {
  getEquipmentList,
  getEquipmentByCode,
  getConstructionSiteList,
  getConstructionSiteByCode,
  getSparePartList,
  getLubricationSheetList,
  postNew,
  getLubricationSheetByEquipmentCode,
  addEquipmentUseHours
};
