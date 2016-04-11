var patientData = [
    { id: "1", FirstName: "Fred", LastName: "Flintstone", Age: "26", DOB: "2/1/1990", NewPatient: "No" },
    { id: "2", FirstName: "Wilma", LastName: "Flintstone", Age: "26", DOB: "2/1/1990", NewPatient: "No" },
    { id: "3", FirstName: "Pebbles", LastName: "Flintstone", Age: "2", DOB: "2/1/2014", NewPatient: "No" },
    { id: "4", FirstName: "Dino", LastName: "Flintstone", Age: "4", DOB: "2/1/2012", NewPatient: "No" },
    { id: "5", FirstName: "Barney", LastName: "Rubble", Age: "25", DOB: "2/1/1991", NewPatient: "No" },
    { id: "6", FirstName: "Betty", LastName: "Rubble", Age: "25", DOB: "2/1/1991", NewPatient: "No" },
    { id: "7", FirstName: "Bambam", LastName: "Rubble", Age: "2", DOB: "2/1/2014", NewPatient: "No" },
    { id: "8", FirstName: "Test", LastName: "Patient1", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "9", FirstName: "Test", LastName: "Patient2", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "10", FirstName: "Test", LastName: "Patient3", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "11", FirstName: "Test", LastName: "Patient4", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "12", FirstName: "Test", LastName: "Patient5", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "13", FirstName: "Test", LastName: "Patient6", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "14", FirstName: "Test", LastName: "Patient7", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "15", FirstName: "Test", LastName: "Patient8", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "16", FirstName: "Test", LastName: "Patient9", Age: "60", DOB: "2/1/2014", NewPatient: "Yes" },
    { id: "17", FirstName: "Test", LastName: "Patient10", Age: "60", DOB: "2/1/2014", NewPatient: "Yes"}
];

const dbName = "PatientDB";

var patientDB = window.indexedDB.open(dbName, 3);

patientDB.onerror = function(event) {
    
}

patientDB.onsuccess = function(event) {
    
}

