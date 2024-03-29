export const equipmentLogos = {
	"topadora": "/dist/img/equipments/bulldozer.png",
	"grua": "/dist/img/equipments/crane.png",
	"vibrocompactador": "/dist/img/equipments/compactor.png",
	"retroexcavadora": "/dist/img/equipments/backhoe-loader.png",
	"excavadora": "/dist/img/equipments/excavator.png",
	"motoniveladora": "/dist/img/equipments/grader.png",
	"cargadora": "/dist/img/equipments/loader.png",
	"mixer": "/dist/img/equipments/mixer-truck.png",
	"pavimentador": "/dist/img/equipments/paver.png",
	"regador": "/dist/img/equipments/water-tank-truck.png",
	"combustible": "/dist/img/equipments/fuel-tank-truck.png",
	"camion": "/dist/img/equipments/tipper-truck.png",
	"volquete": "/dist/img/equipments/tipper-truck-big.png",
	"camioneta": "/dist/img/equipments/pick-up-truck.png",
	"carreton": "/dist/img/equipments/trailer.png",
	"furgon": "/dist/img/equipments/cargo-van.png",
	"combi": "/dist/img/equipments/van.png",
	"manipulador": "/dist/img/equipments/handler.png",
	"motocompresor": "/dist/img/equipments/compressor.png",
	"generador": "/dist/img/equipments/electric-generator.png",
	"generico":"/dist/img/equipments/truck.png"
}

export function getEquipmentImage(equipment) {
	const observations = equipment.observations?.toLowerCase() || "";
	const designation = equipment.designation?.toLowerCase();
	return equipmentLogos[observations] || equipmentLogos[designation] || equipmentLogos["generico"];
}