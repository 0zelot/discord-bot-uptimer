import ms from "ms";

import config from "../config.js";

export default async (status, data) => {

    switch(status) {

        case "online":
            await fetch(config.webhook_url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    content: `I'm back online. How adorable!`,
                    embeds: [
                        {
                            author: {
                                name: config.bot.username,
                                icon_url: config.bot.avatar_url
                            },
                            title: ":green_circle: Online",
                            color: 5763719,
                            description: `
                            <t:${(Date.now()/1000).toFixed()}> (<t:${(Date.now()/1000).toFixed()}:R>) downtime has ended.
                            ${data.since ? `\nI was offline from <t:${(data.since/1000).toFixed()}> to <t:${(Date.now()/1000).toFixed()}>, which is **${ms(Date.now() - data.since, {long: true})}**.`: ""}
                            `,
                            timestamp: new Date().toISOString()
                        }
                    ]
                })
            });
            break;

        case "offline":
            await fetch(config.webhook_url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    content: `<@&${config.role_id}>, I'm offline. Do something!`,
                    embeds: [
                        {
                            author: {
                                name: config.bot.username,
                                icon_url: config.bot.avatar_url
                            },
                            title: ":red_circle: Offline",
                            color: 15548997,
                            description: `
                            <t:${(Date.now()/1000).toFixed()}> (<t:${(Date.now()/1000).toFixed()}:R>) a downtime was noted.
                            ${data.since ? `\nThe last time this happened was <t:${(data.since/1000).toFixed()}:R>.` : ""}
                            `,
                            timestamp: new Date().toISOString()
                        }
                    ]
                })
            });
            break;

    }

}