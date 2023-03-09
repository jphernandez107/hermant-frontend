export function getUniqueFrequenciesFromSheet(lubricationSheet) {
    const frequencies = new Set();
    lubricationSheet.lubrication_sheet_spare_parts.forEach((part) => {
        part.frequencies.forEach((frequency) => {
            frequencies.add(frequency.frequency);
        });
    });
    return Array.from(frequencies).sort((a, b) => a - b);
}

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

export default {
    max: Array.prototype.max,
    min: Array.prototype.min,
}