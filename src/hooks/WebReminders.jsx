import { useState } from "react";


function WebReminders() {
    const [logs, setLogs] = useState("");

    const handleNotify = async () => {
        if (!("Notification" in window)) {
            setLogs(l => l + "This browser does not support notifications.\n"); //if not supported
            return;
        }

        if(Notification.permission === "granted") {
            setLogs(l=>l + "Permission granted. Sending notification.\n");
            sendNotification();
        }else if(Notification.permission !== "denied") {
            setLogs(l=>l + "Requesting notification permission.\n");
            const status = await Notification.requestPermission();
            if(status === "granted") {
                setLogs(l=>l + "User granted the permission. Sending notification.\n");
                sendNotification();
            }else {
                setLogs(l=>l + "User denied the permission request.\n");
            }
        }else
        {
            setLogs(l=>l + "The site does not have permission to show notifications.\n");
        }

    };

    const sendNotification = () => {
        let i =0;
        const interval = setInterval(() => {
            const n = new Notification(`Hi no ${i} from Mission Mode.`, {
                tag: "daily-reminder",
            });
            if (i === 9) {
                clearInterval(interval);
            }
            i++;
        }, 200); // Send a notification every 200ms, total 10 notifications
    };

    return (
        <div>
            <button onClick={handleNotify}>Enable Web Notifications</button>
            <pre>{logs}</pre>
        </div>
    );
}
export default WebReminders;