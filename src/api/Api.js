// const baseURL = 'https://greengbackend.herokuapp.com/'
const baseURL = "http://localhost:5001/";

const getEquipmentList = async () => {
  try {
    const response = await fetch(baseURL + "equipment/list");
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

// const getLocations = () => {
//   return fetch(baseURL + "locations/real-time/filter")
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
// };

// const getRealTimeData = (
//   greenhouses,
//   sections,
//   sectors,
//   filterParams = new URLSearchParams("")
// ) => {
//   filterParams = new URLSearchParams("");
//   if (greenhouses && greenhouses.length > 0)
//     for (let gh of greenhouses) filterParams.append("greenhouses", gh);
//   if (sections && sections.length > 0)
//     for (let s of sections) filterParams.append("sections", s);
//   if (sectors && sectors.length > 0)
//     for (let sec of sectors) filterParams.append("sectors", sec);
//   return fetch(baseURL + "real-time/filter?" + filterParams.toString())
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
// };

module.exports = {
  getEquipmentList,
//   getLocations,
//   getRealTimeData,
};
