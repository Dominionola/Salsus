export const mockDrugs = [
    {
        drugName: "Paracetamol",
        regNumber: "A4-1234",
        ingredient: "Acetaminophen",
        strength: "500mg",
        dosageForm: "Tablet",
        riskLevel: "LOW",
        warnings: [
            "Avoid alcohol while taking this medication.",
            "Do not exceed 4000mg per day to prevent liver damage."
        ]
    },
    {
        drugName: "Amartem",
        regNumber: "B2-5678",
        ingredient: "Artemether/Lumefantrine",
        strength: "80mg/480mg",
        dosageForm: "Tablet",
        riskLevel: "LOW",
        warnings: [
            "Take with fatty food or milk.",
            "Complete the full course even if you feel better."
        ]
    },
    {
        drugName: "Ibuprofen",
        regNumber: "C3-9012",
        ingredient: "Ibuprofen",
        strength: "400mg",
        dosageForm: "Capsule",
        riskLevel: "MODERATE",
        warnings: [
            "May cause stomach irritation. Take with food.",
            "Avoid if you have a history of ulcers.",
            "Risk of cardiovascular events with long-term use."
        ]
    },
    {
        drugName: "Tramadol",
        regNumber: "D4-3456",
        ingredient: "Tramadol HCl",
        strength: "50mg",
        dosageForm: "Capsule",
        riskLevel: "HIGH",
        warnings: [
            "High risk of dependency and addiction.",
            "May cause drowsiness/dizziness.",
            "Strict medical supervision required."
        ]
    },
    {
        drugName: "Fake-Malar",
        regNumber: "X0-0000",
        ingredient: "Chalk / Starch",
        strength: "N/A",
        dosageForm: "Tablet",
        riskLevel: "HIGH",
        warnings: [
            "SUSPECTED COUNTERFEIT PRODUCT.",
            "Immediate reporting to NAFDAC is recommended.",
            "Do not consume."
        ]
    }
];

export async function searchDrug(query) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const cleanQuery = query.toLowerCase().trim();

    return mockDrugs.find(d =>
        d.drugName.toLowerCase().includes(cleanQuery) ||
        d.regNumber.toLowerCase().includes(cleanQuery) ||
        d.ingredient.toLowerCase().includes(cleanQuery)
    );
}
