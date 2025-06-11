export async function POST(request) {
    // const body = await request.json();
    console.log(request);
    // let busydatesforworker1 = body.busydatesforworker1;
    // let busydatesforworker2 = body.busydatesforworker2;
    // let desiredDate = body.desiredDate;
    // let endDate = body.endDate;
    // let day = body.day.toLowerCase();
  
    let all_slots_otherday = [
        "8:00 AM",
        "8:30 AM",
        "9:00 AM",
        "9:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
        "4:30 PM",
        "5:00 PM",
        "5:30 PM",
        "6:00 PM",
        "6:30 PM",
        "7:00 PM",
    ];

    let all_slots_at_sunday = [

        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
        "4:30 PM",
        "5:00 PM"
    ];

    // Here you can process the data as needed
    // console.log('Worker 1 Busy Dates:', busydatesforworker1);
    // console.log('Worker 2 Busy Dates:', busydatesforworker2);
    // console.log('Desired Date:', desiredDate);
    // console.log("endDate:", body.endDate);
    // console.log('Day:', day);

    //  // Helper function to format ISO time to AM/PM (e.g., '2025-06-12T13:00:00.000Z' -> '1:00 PM')
    //  function formatISOTimeToAMPM(isoDate) {
    //     const date = new Date(isoDate);
    //     let hours = date.getUTCHours();
    //     const minutes = date.getUTCMinutes();
    //     const period = hours >= 12 ? 'PM' : 'AM';
    //     hours = hours % 12 || 12; // Convert 0 or 12 to 12
    //     return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    // }

    // // Helper function to generate all 30-minute slots between start and end times
    // function getBusySlots(start, end) {
    //     const busySlots = [];
    //     let current = new Date(start);
    //     const endTime = new Date(end);
    //     while (current < endTime) {
    //         busySlots.push(formatISOTimeToAMPM(current));
    //         current.setUTCMinutes(current.getUTCMinutes() + 30);
    //     }
    //     return busySlots;
    // }

    // // Helper function to get available slots for a worker on a specific date
    // function getAvailableSlots(busyDates, date, isSunday) {
    //     const dateString = new Date(date).toISOString().split('T')[0];
    //     const busyOnDate = busyDates.busy.filter(slot => {
    //         return new Date(slot.start).toISOString().split('T')[0] === dateString;
    //     });

    //     const busyTimes = [];
    //     busyOnDate.forEach(slot => {
    //         const slots = getBusySlots(slot.start, slot.end);
    //         busyTimes.push(...slots);
    //     });

    //     const slotsToCheck = isSunday ? all_slots_at_sunday : all_slots_otherday;
    //     return slotsToCheck.filter(slot => !busyTimes.includes(slot));
    // }

    // // Start checking from desiredDate
    // let currentDate = new Date(desiredDate);
    // const endDateObj = new Date(endDate);

    // while (currentDate <= endDateObj) {
    //     const currentDateString = currentDate.toISOString().split('T')[0];
    //     const isSunday = day === 'sunday' && currentDate.toISOString().split('T')[0] === new Date(desiredDate).toISOString().split('T')[0];

    //     // Check Worker 1
    //     let worker1AvailableSlots = getAvailableSlots(busydatesforworker1, currentDate, isSunday);
    //     if (worker1AvailableSlots.length > 0) {
    //         return Response.json({
    //             worker: 'Worker 1',
    //             availableSlots: worker1AvailableSlots,
    //             date: currentDateString
    //         });
    //     }

    //     // Check Worker 2
    //     let worker2AvailableSlots = getAvailableSlots(busydatesforworker2, currentDate, isSunday);
    //     if (worker2AvailableSlots.length > 0) {
    //         return Response.json({
    //             worker: 'Worker 2',
    //             availableSlots: worker2AvailableSlots,
    //             date: currentDateString
    //         });
    //     }

    //     // Move to next day
    //     currentDate.setDate(currentDate.getDate() + 1);
    // }

    // // If no slots found by endDate
    // return Response.json({
    //     message: `Fully booked up to ${new Date(endDate).toISOString().split('T')[0]}`
    // });
}
