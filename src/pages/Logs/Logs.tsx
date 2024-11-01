import React, { useState } from "react";
import Card, { CardBody } from "../../components/Card";
// import dayjs from 'dayjs';

// Sample data format (Replace with actual data from props or API)
const sampleLogs = [
  {
    date: "2024-10-14",
    checkIns: ["06:11"],
    checkOuts: ["12:00"],
    status: "absent", // other options: 'present', 'incomplete'
    totalHours: "05:49",
  },
  {
    date: "2024-10-15",
    checkIns: ["05:58", "13:30"],
    checkOuts: ["12:00", "17:30"],
    status: "present",
    totalHours: "07:42",
  },
  // Add more log entries here...
];

function Logs() {
  const [logs, setLogs] = useState(sampleLogs); // Replace with actual data fetching
//   const [dateRange, setDateRange] = useState([
//     dayjs().startOf("month"),
//     dayjs().endOf("month"),
//   ]);

  // Function to calculate total hours for the range
  const calculateTotalHours = () => {
    let totalMinutes = logs.reduce((sum, log) => {
      const [hours, minutes] = log.totalHours.split(":").map(Number);
      return sum + hours * 60 + minutes;
    }, 0);
    return `${Math.floor(totalMinutes / 60)}:${(totalMinutes % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Recent Logs</h2>
      <p>Your attendance for the selected period.</p>

      {/* Date Range Selector */}
      {/* <DatePicker.RangePicker
        value={dateRange}
        onChange={setDateRange}
        format="YYYY-MM-DD"
      /> */}

      {/* Card layout for each day's log */}
      <div className="attendance-cards">
        {logs.map((log, index) => (
          <Card key={index} className="m-3 p-4">
            <CardBody>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <Icon type="calendar" style={{ fontSize: '24px', marginRight: '10px' }} /> */}
                <h3>{log.date}</h3>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {log.checkIns.map((checkIn, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Check-in: {checkIn}</span>
                    <span>Check-out: {log.checkOuts[i] || "N/A"}</span>
                  </div>
                ))}
                <div>Total Hours: {log.totalHours}</div>
              </div>

              {/* Status Icon */}
              {/* <Icon
              type={log.status === 'present' ? 'check-circle' : log.status === 'absent' ? 'close-circle' : 'exclamation-circle'}
              style={{
                fontSize: '20px',
                color: log.status === 'present' ? 'green' : log.status === 'absent' ? 'red' : 'orange',
                marginTop: '10px'
              }}
            /> */}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Total Hours */}
      <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
        Total Hours for the Selected Range: {calculateTotalHours()}
      </div>
    </div>
  );
}

export default Logs;
