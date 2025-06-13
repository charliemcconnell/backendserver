export async function POST(request) {
    // Get the body as text
    let data = await request.json();
    console.log("body>>>>", data);

    let busydatesforworker1 = data.busydatesforworker1;
    let busydatesforworker2 = data.busydatesforworker2;
    let desiredDate = data.desiredDate;
    let endDate = data.endDate;
    let day = data.day.toLowerCase();

    let all_slots_otherday = [
        "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"
    ];

    let all_slots_at_sunday = [
        "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM", "5:00 PM"
    ];

    console.log('Worker 1 Busy Dates:', busydatesforworker1);
    console.log('Worker 2 Busy Dates:', busydatesforworker2);
    console.log('Desired Date:', desiredDate);
    console.log("endDate:", endDate);
    console.log('Day:', day);

    // Helper function to format ISO time to AM/PM
    function formatISOTimeToAMPM(isoDate) {
        const date = new Date(isoDate);
        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    // Helper function to convert AM/PM time to 24-hour for comparison
    function timeToMinutes(timeStr) {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
    }

    // Helper function to generate all 30-minute slots between start and end times
    function getBusySlots(start, end) {
        const busySlots = [];
        let current = new Date(start);
        const endTime = new Date(end);
        while (current < endTime) {
            busySlots.push(formatISOTimeToAMPM(current));
            current.setUTCMinutes(current.getUTCMinutes() + 30);
        }
        return busySlots;
    }

    // Helper function to get available slots for a worker on a specific date
    function getAvailableSlots(busyDates, date, isSunday, desiredTime = null) {
        const dateString = new Date(date).toISOString().split('T')[0];
        const busyOnDate = busyDates.filter(slot => {
            return new Date(slot.start).toISOString().split('T')[0] === dateString;
        });

        const busyTimes = [];
        busyOnDate.forEach(slot => {
            const slots = getBusySlots(slot.start, slot.end);
            busyTimes.push(...slots);
        });

        const slotsToCheck = isSunday ? all_slots_at_sunday : all_slots_otherday;
        let availableSlots = slotsToCheck.filter(slot => !busyTimes.includes(slot));

        // If desiredTime is provided, filter slots after this time
        if (desiredTime) {
            const desiredMinutes = timeToMinutes(formatISOTimeToAMPM(desiredTime));
            availableSlots = availableSlots.filter(slot => {
                return timeToMinutes(slot) > desiredMinutes;
            });
        }

        return availableSlots;
    }

    // Start checking from desiredDate
    let currentDate = new Date(desiredDate);
    const endDateObj = new Date(endDate);
    const isSunday = day === 'sunday' && currentDate.toISOString().split('T')[0] === new Date(desiredDate).toISOString().split('T')[0];

    // Check desired date first
    let worker1AvailableSlots = getAvailableSlots(busydatesforworker1, desiredDate, isSunday, desiredDate);
    if (worker1AvailableSlots.length > 0) {
        return Response.json({
            worker: 'Worker 1',
            alternate_time_slot1: worker1AvailableSlots[0] || null,
            alternate_time_slot2: worker1AvailableSlots[1] || null,
            date: currentDate.toISOString().split('T')[0]
        });
    }

    let worker2AvailableSlots = getAvailableSlots(busydatesforworker2, desiredDate, isSunday, desiredDate);
    if (worker2AvailableSlots.length > 0) {
        return Response.json({
            worker: 'Worker 2',
            alternate_time_slot1: worker2AvailableSlots[0] || null,
            alternate_time_slot2: worker2AvailableSlots[1] || null,
            date: currentDate.toISOString().split('T')[0]
        });
    }

    // If no slots on desired date, check next day for earliest slots
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate <= endDateObj) {
        const nextDayIsSunday = currentDate.getDay() === 0; // 0 is Sunday
        worker1AvailableSlots = getAvailableSlots(busydatesforworker1, currentDate, nextDayIsSunday);
        if (worker1AvailableSlots.length > 0) {
            return Response.json({
                worker: 'Worker 1',
                alternate_time_slot1: worker1AvailableSlots[0] || null,
                alternate_time_slot2: worker1AvailableSlots[1] || null,
                date: currentDate.toISOString().split('T')[0]
            });
        }

        worker2AvailableSlots = getAvailableSlots(busydatesforworker2, currentDate, nextDayIsSunday);
        if (worker2AvailableSlots.length > 0) {
            return Response.json({
                worker: 'Worker 2',
                alternate_time_slot1: worker2AvailableSlots[0] || null,
                alternate_time_slot2: worker2AvailableSlots[1] || null,
                date: currentDate.toISOString().split('T')[0]
            });
        }
    }

    // If no slots found by endDate
    return Response.json({
        message: `Fully booked up to ${new Date(endDate).toISOString().split('T')[0]}`
    });
}