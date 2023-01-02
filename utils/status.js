import fs from "node:fs/promises";

const getStatus = async () => JSON.parse(await fs.readFile("./data.json"));

const setStatus = async (status) => {

    await fs.writeFile("./data.json", JSON.stringify({
        status,
        since: Date.now()
    }, null, 2));

}

export {getStatus, setStatus}