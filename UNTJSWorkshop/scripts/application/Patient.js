// ######################################################################
//  Patient.js - Patient record
// ######################################################################


function Patient(patientId, firstName, lastName) {
    var self = this;
    
    self.patientId = patientId;
    self.firstName = firstName;
    self.lastName = lastName;
    self.appointments = [];
    
    self.ToJSON = function() {
        var jsonString = {
            "Id" : self.patientId,
            "FirstName" : self.firstName,
            "LastName" : self.lastName,
            "Appointments" : self.appointments
        };
        return jsonString;
    }
    
}

function PatientController(patientView) {
    var self = this;
    self.patientDB = [{}];
    self.patientView = patientView;
    
    self.SavePatientAppointment = function(patient, appointment) {
        //self.patientDB = localStorage.getItem("Patients");
        if (self.patientDB == null) {
            self.patientDB = [{}];
        }
        var thePatient = patient.ToJSON();
        self.patientDB.push(thePatient);
        //localStorage.setItem("Patients", JSON.stringify(self.patientDB));
    }
    
    self.RefreshPatientsView = function() {
        var data = [["", "Patient Id", "First Name", "Last Name", "Appointment Date", "Notes"]];
        var table = $("<table/>");
        $.each(self.patientDB, function(id, c) {
            data.push(c);    
        });
        
        $.each(data, function(rowIndex, r) {
            var rowclass = "class='ui-accordion-header ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons'";
            if (rowIndex > 0) rowclass = "";
            var row = $("<tr " + rowclass + " />");
            if (rowIndex > 1)
                row.append($("<td/>").html("<input name=patientId' type='radio' value='" + r.Id + "'/>")) ;

            $.each(r, function(colIndex, c) {
                row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
            });
            table.append(row);
        });
        $(patientView).html("");
        $(patientView).append(table);
       
    }
    
}