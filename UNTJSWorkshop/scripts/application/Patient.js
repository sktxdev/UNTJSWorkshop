// ######################################################################
//  Patient.js - Patient record
// ######################################################################

function Patient(patientId, firstName, lastName) {
    'use strict';
    var self = this;
    
    self.patientId = patientId;
    self.firstName = firstName;
    self.lastName = lastName;
	self.isActive = "Y";			// Patient is default active
    self.appointments = [];
    
    self.ToJSON = function () {
        var jsonString = {
            "Id" : self.patientId,
            "FirstName" : self.firstName,
            "LastName" : self.lastName,
            "Appointments" : self.appointments
        };
        return jsonString;
    };
}

// ######################################################################
//  PatientController - Controls the tables, dialogs and UI to DB I/F
// ######################################################################

function PatientController() {
    'use strict';
    var self = this;
    self.patientDB = [{ }];
    
    // Save Patient
    self.SavePatientAppointment = function (patient, appointment) {
        var thePatient = patient.ToJSON();
        //self.patientDB = localStorage.getItem("Patients");
        
        if (self.patientDB === null) {
            self.patientDB = [{}];
        }
        
        self.patientDB.push(thePatient);
        //localStorage.setItem("Patients", JSON.stringify(self.patientDB));
    };
    
    // ######################################################################
    // Create Patient Table View
    // ###################################################################### 
    
    self.CreatePatientsView = function () {
        jQuery("#tblPatients").jqGrid({
            data: db.FindPatients(),
            datatype: "local",
            height: '200px',
            width: 'auto',
            rowNum: 100,
            rowList: [10, 20, 30],
            colNames: ['Id', 'First Name', 'Last Name', 'Age', 'DOB', 'New Patient'],
            colModel: [
                { name: 'id', index: 'id', width: 30, sorttype: "int" },
                { name: 'FirstName', index: 'FirstName', width: 150 },
                { name: 'LastName', index: 'LastName', width: 150 },
                { name: 'Age', index: 'Age', width: 100, align: "middle", sorttype: "int" },
                { name: 'DOB', index: 'DOB', width: 120, sorttype: "date", formatter: "date" },
                { name: 'NewPatient', index: 'NewPatient', width: 100, align: "left" }
            ],
            pager: "#tblPatientsPager",
            onSelectRow: function(id) {
                ac.RefreshAppointmentsViewView(id);
            },
            viewrecords: true,
            autowidth: true,
            shrinktofit: false,
            sortname: 'id',
            sortorder: 'asc',
            caption: "Patients",
            recordtext: "Total Patients: {2}",
            multiselect: false,
            multiboxonly: true
        });

        // Hide the pager
        jQuery("#tblPatientsPager_center").remove();
        
        // Show a refresh link for the table
        jQuery("#tblPatients").jqGrid('navGrid', "#tblPatientsPager", { edit: false, add: false, del: false, search: false });
        
    };

    // ######################################################################
    // Create Patient Table View
    // ###################################################################### 

    self.RefreshPatientDataView = function() {
        
        jQuery('#tblPatients').jqGrid('clearGridData');
        jQuery('#tblPatients').jqGrid('setGridParam', {data: db.FindPatients()});
        jQuery('#tblPatients').trigger('reloadGrid');
        
        // jQuery("#tblPatients").jqGrid().trigger('reloadGrid');
    };

    // ######################################################################
    // Get the selected row
    // ###################################################################### 
   
	self.GetSelectedPatientRow = function() {
        var selectedRow = $("#tblPatients").getGridParam('selrow');
        var selrowData = $("#tblPatients").jqGrid('getRowData', selectedRow);
		return selrowData;
	};
   

    // ######################################################################
    // Show an Add Patient Dialog
    // ###################################################################### 
   
	self.ShowAddPatientDialog = function() {
			
		var row = pc.GetSelectedPatientRow();
		
        $("#patientId").val("");
        $("#patientId").prop("readonly", true);
        
        $("#patientFirstName").val("");
        $("#patientLastName").val("");

        $("#apptDatePart").hide();
        $("#apptNotesPart").hide();        
		
        $('#AddEditPatientApppointmentDialog').dialog({
            autoopen: true,
            modal: true,
            title: "Add Patient",
            height: 'auto',
            width: 'auto',
            resizable: true,
            buttons: {
                "Add": function () {
                    // Add the patient
                    db.AddPatient($("#patientFirstName").val(), $("#patientLastName").val());
                    
                    // Refresh the grid
                    pc.RefreshPatientDataView();
                    
                    // close dialog
                    $(this).dialog("close");

                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });
    };

    // ######################################################################
    // Show an Edit Patient Dialog
    // ###################################################################### 

    self.ShowEditPatientDialog = function() {

        var row = pc.GetSelectedPatientRow();

		$("#patientId").val(row.id);
        $("#patientId").prop("readonly", true);
        
		$("#patientFirstName").val(row.FirstName);
		$("#patientLastName").val(row.LastName);
        $("#apptDatePart").hide();
        $("#apptNotesPart").hide();        
        
        $('#AddEditPatientApppointmentDialog').dialog({
            autoopen: true,
            modal: true,
            title: "Add Patient",
            height: 'auto',
            width: 'auto',
            resizable: true,
            buttons: {
                "Save": function () {
                    // Save the patient
                    db.SavePatient($("#patientId").val(), $("#patientFirstName").val(), $("#patientLastName").val());
                    
                    // Refresh the grid
                    pc.RefreshPatientDataView();
                    
                    // close dialog
                    $(this).dialog("close");

                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });
    };
   
	// ######################################################################
    // Show an Remove Patient Dialog
    // ###################################################################### 
   
    self.ShowRemovePatientDialog = function() {
        var row = pc.GetSelectedPatientRow();

        var answer = confirm("Are you sure you wish to remove patient id: " + 
                         row.id + ", Name: " + row.FirstName + " " + row.LastName);
        
        if (answer == true) {
            // Remove Patient
        }

    };

    // ######################################################################
    // Get Patient Appointments
    // ###################################################################### 

    self.GetPatientAppointments = function(patientId) {
        if (patientId === null) {
            return [{}];
        }  
    };    
}