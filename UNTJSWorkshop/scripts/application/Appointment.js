// ######################################################################
//  Appointment.js - Patient Appointment record
// ######################################################################

function Appointment(patientId, appointmentDateTime, notes) {
	
    'use strict';
    var self = this;
    
    self.patientId = patientId;
    self.appointmentDateTime = appointmentDateTime;
    self.notes = notes;

}



function AppointmentsController() {
	'use strict';
	var self = this;
	
    // ######################################################################
    // Create Appointments Table View
    // ###################################################################### 
    
    self.CreateAppointmentsView = function (patientId) {
            jQuery("#tblAppointmentsHistory").jqGrid({
                data: pc.GetPatientAppointments(patientId),
                datatype: "local",
                height: '200px',
                width: 'auto',
                rowNum: 100,
                rowList: [10,20,30],
                colNames:['','Appointment Date', 'Notes'],
                colModel:[
                    { name:'id', index:'id', width:30, sorttype:"int" },
                    { name:'AppointmentDateTime', index:'AppointmentDateTime', width:120, sorttype:"date", formatter:"date"},		
                    { name:'Notes', index:'Notes', width:100, align:"left" }
                ],
                pager: "#tblAppointmentsHistoryPager",
                viewrecords: true,
                autowidth: true,
                shrinktofit: false,
                sortname: 'id',
		        sortorder: 'asc',
                caption: "Appointments History",
                recordtext: "Total Visits: {2}",
                multiselect: false,
                multiboxonly: true,
            });

            // Hide the pager
            jQuery("#tblAppointmentsHistoryPager_center").remove();
    };

    // ######################################################################
    // Create Patient Table View
    // ###################################################################### 

    self.RefreshAppointmentsViewView = function() {
        jQuery("#tblAppointmentsHistory").jqGrid().trigger('reloadGrid');
    };	
	
    // ######################################################################
    // Show an Add Appointment Dialog
    // ###################################################################### 
	
	self.ShowAddAppointmentDialog = function() {
        var row = pc.GetSelectedPatientRow();
			
        $("#patientId").val(row.id)
        $("#patientFirstName").val(row.FirstName)
        $("#patientLastName").val(row.LastName)
			
        $("#patientId").prop("readonly", true);
        $("#patientFirstName").prop("readonly", true);
        $("#patientLastName").prop("readonly", true);
		
        $('#AddEditPatientApppointmentDialog').dialog({
                autoopen: true,
                modal: true,
                title: "Add Appointment",
                height: 'auto',
                width: 'auto',
                resizable: true,
                buttons: {
                    "Add Appointment": function () {
                        // Add the patient
                        // Refresh the grid

                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
        });
	};
	
    // ######################################################################
    // Show an Edit Appointment Dialog
    // ###################################################################### 

	self.ShowEditAppointmentDialog = function() {
        var row = pc.GetSelectedPatientRow();
			
        $("#patientId").val(row.id)
        $("#patientFirstName").val(row.FirstName)
        $("#patientLastName").val(row.LastName)
			
        $("#patientId").prop("readonly", true);
        $("#patientFirstName").prop("readonly", true);
        $("#patientLastName").prop("readonly", true);
		
        $('#AddEditPatientApppointmentDialog').dialog({
                autoopen: true,
                modal: true,
                title: "Add Appointment",
                height: 'auto',
                width: 'auto',
                resizable: true,
                buttons: {
                    "Edit Appointment": function () {
                        // Add the patient
                        // Refresh the grid

                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
        });
	};
	
    // ######################################################################
    // Show a Remove Appointment Dialog
    // ###################################################################### 

	self.ShowRemoveAppointmentDialog = function() {
        var row = pc.GetSelectedPatientRow();

        var answer = confirm("Are you sure you wish to remove patient appointment for id: " + 
                         row.id + ", Name: " + row.FirstName + " " + row.LastName);
        
        if (answer == true) {
            // Remove Apppointment
        }
	};

}



