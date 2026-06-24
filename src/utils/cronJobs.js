const cron = require("node-cron");
const {subDays,startOfDay,endOfDay}= require("date-fns");
const ConnectionRequestModel = require("../model/connectionRequest");
const sendEmail = require("./sendEmail")

cron.schedule("8 17 * * *", async () => {
    console.log("Cron fired at", new Date());
    try {
        const yesterday = subDays(new Date(), 1);
        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        console.log("Range:", yesterdayStart, "→", yesterdayEnd);

        const pendingRequests = await ConnectionRequestModel.find({
            status: "interested",
            createdAt: { $gte: yesterdayStart, $lt: yesterdayEnd },
        }).populate("fromUserId toUserId");

        console.log("Requests found:", pendingRequests.length);

        const listOfEmails = [
            ...new Set(pendingRequests.map((req) => req.toUserId.emailID)),
        ];

        console.log("Emails:", listOfEmails);

        for (const email of listOfEmails) {
            if (!email) continue;
            try {
                const res = await sendEmail.run("New Friend Request From ", email);
                
            } catch (err) {
                console.log("Email error:", err);
            }
        }
    } catch (err) {
        console.log("Cron error:", err);
    }
});