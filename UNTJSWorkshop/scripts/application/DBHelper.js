function DBHelper() {
    var self = this;

    self.initializeDB = function() {
        if (localStorage.getItem("patients") == null)
            localStorage.setItem("patients", JSON.stringify(patientData));
    }
    
    self.FindPatients = function() {
        return JSON.parse(localStorage.getItem("patients"));
    }
 
    self.AddPatient = function (firstName, lastName) {
        var patients = self.FindPatients();
        var newPatient = {
            id: patients.length + 1, 
            FirstName: firstName, 
            LastName: lastName, 
            Age: "", 
            DOB: "", 
            ShowPatient: true, 
            NewPatient: "Yes", 
            Appointments: []
        }

        var newPatientList = patients.concat(newPatient);
        localStorage.setItem("patients", JSON.stringify(newPatientList));
        
    }

    self.SavePatient = function (id, firstName, lastName) {
        var patients = self.FindPatients();
        patients[id-1]['FirstName'] = firstName;
        patients[id-1]['LastName'] = lastName;
        localStorage.setItem("patients", JSON.stringify(patients));
    }
    
}