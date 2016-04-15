// ######################################################################
//  Appointment.js - Patient Appointment record
// ######################################################################

function Appointment(patientId, appointmentDate, appointmentTime, notes) {
	
    'use strict';
    var self = this;
    
    self.patientId = patientId;
    self.appointmentDate = appointmentDate;
    self.appointmentDate = appointmentTime;
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
                colNames:['Date', 'Time', 'Notes'],
                colModel:[
                    { name:'apptDate', index:'apptDate', width:100, sorttype: "date", formatter:"date", 
                        formatoptions: { srcformat: 'm/d/Y' }},
                    { name:'apptTime', index:'apptTime', width:100, align: "center"},                    
                    { name:'apptNote', index:'apptNote', width:500, align: "left" }
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

    self.RefreshAppointmentsViewView = function(patientId) {
        jQuery('#tblAppointmentsHistory').jqGrid('clearGridData');
        jQuery('#tblAppointmentsHistory').jqGrid('setGridParam', {data: db.GetPatientAppointments(patientId)});
        jQuery('#tblAppointmentsHistory').trigger('reloadGrid');
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
		
        $("#apptDatePart").show();
        $("#apptNotesPart").show();        

        $('#AddEditPatientApppointmentDialog').dialog({
                autoopen: true,
                modal: true,
                title: "Add Appointment",
                height: 'auto',
                width: 'auto',
                resizable: true,
                buttons: {
                    "Add Appointment": function () {
                        // Add the appointment
                        db.SaveAppointment($("#patientId").val(),
                                           $("#apptDate").val(), 
                                           $("#apptTime").val(), 
                                           $("#patientNotes").val());
                        // Refresh the grid
                        self.RefreshAppointmentsViewView($("#patientId").val());
                        
                        // close the dialog
                        $(this).dialog("close");
                        
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
		
        $("#apptDatePart").show();
        $("#apptNotesPart").show();        
        
        $('#AddEditPatientApppointmentDialog').dialog({
                autoopen: true,
                modal: true,
                title: "Add Appointment",
                height: 'auto',
                width: 'auto',
                resizable: true,
                buttons: {
                    "Save Appointment": function () {
                        // save the patient
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



