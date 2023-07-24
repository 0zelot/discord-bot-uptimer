import {getStatus, setStatus} from "./utils/status.js";
import sendWebhook from "./utils/webhook.js";
import runActions from "./utils/shell.js";

import config from "./config.js";

(async () => {

    const body = await (await fetch(config.widget_url)).json();
    const bot = body.members.find(user => user.username == config.bot.username);

    const data = await getStatus();

    if(!data?.status) return setStatus(bot ? "online" : "offline");

    if(!bot && (data.status == "online")) {

        setStatus("offline");
        sendWebhook("offline", data);
        runActions();

    } else if(bot && (data.status !== "online")) {

        setStatus("online");
        sendWebhook("online", data);

    }

    process.exit();

})();