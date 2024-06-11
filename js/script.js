let appointments = [];

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const id = document.getElementById('appointmentId').value || new Date().getTime().toString();
    const patient = document.getElementById('patientName').value;
    const date = document.getElementById('appointmentDate').value;
    const type = document.getElementById('appointmentType').value;
    const cost = document.getElementById('appointmentCost').value;
    
    const appointment = { id, patient, date, type, cost };

    const existingIndex = appointments.findIndex(app => app.id === id);
    if (existingIndex >= 0) {
        appointments[existingIndex] = appointment;
    } else {
        appointments.push(appointment);
    }
    
    resetForm();
    displayAppointments(appointments);
});

function resetForm() {
    document.getElementById('appointmentForm').reset();
    document.getElementById('appointmentId').value = '';
}

function displayAppointments(appointments) {
    const tbody = document.getElementById('appointmentsTable').querySelector('tbody');
    tbody.innerHTML = '';
    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patient}</td>
            <td>${appointment.date}</td>
            <td>${appointment.type}</td>
            <td>${appointment.cost}</td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    filterAppointments();
});

function filterAppointments() {
    const filterDate = document.getElementById('filterDate').value;
    const filterType = document.getElementById('filterType').value;

    let filteredAppointments = appointments;

    if (filterDate) {
        filteredAppointments = filteredAppointments.filter(app => app.date === filterDate);
    }

    if (filterType) {
        filteredAppointments = filteredAppointments.filter(app => app.type === filterType);
    }

    displayAppointments(filteredAppointments);
}
