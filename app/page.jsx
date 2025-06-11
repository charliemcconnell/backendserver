"use client"
import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState();
  
  const send = () => {
    fetch("https://backendserver-mauve.vercel.app/api/handleCalendaravail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {"data": "{\n \"busydatesforworker1\": {\n \"busy\": 2025-06-12T13:00:00.000Z, 2025-06-12T16:00:00.000Z\n },\n \"busydatesforworker2\": {\n \"busy\": 2025-06-12T13:00:00.000Z, 2025-06-12T16:00:00.000Z\n\n },\n \"desiredDate\": 2025-06-12T13:00:00.000Z,\n \"endDate\": 2025-06-15T13:00:00.000Z,\n \"day\": Monday\n }"},
      ),
    })
      .then((response) => response.json()
    )
      .then((dat) => {console.log(dat)
        setData(dat);
        console.log(data);
      }
    )
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      </main>
      <>{data}</>
      <button onClick={send} type="submit">button</button>
    </div>
  );
}
