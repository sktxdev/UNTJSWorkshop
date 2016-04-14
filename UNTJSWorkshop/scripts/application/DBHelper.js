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

    self.SaveAppointment = function (id, apptDate, apptTime, notes) {
        var patients = self.FindPatients();
        var patientToUpdate = patients[id-1];
        
        var appt = {
            "apptDate" : apptDate,  
            "apptTime" : apptTime,  
            "apptNote" : notes
        };
        
        // patient.Appointments = new Array();
        
        var appts = patientToUpdate.Appointments.concat(appt);
        patientToUpdate.Appointments = appts;
        
        localStorage.setItem("patients", JSON.stringify(patients));
    }
    
    self.GetPatientAppointments = function(patientId) {
        var patients = self.FindPatients();
        var patientToUpdate = patients[patientId-1];
        
        return patientToUpdate.Appointments;

    }
    
    
}