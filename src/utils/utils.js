export function getUniqueFrequenciesFromSheet(lubricationSheet) {
    const frequencies = new Set();
    lubricationSheet.lubrication_sheet_spare_parts.forEach((part) => {
        part.frequencies.forEach((frequency) => {
            frequencies.add(frequency.frequency);
        });
    });
    return Array.from(frequencies).sort((a, b) => a - b);
}