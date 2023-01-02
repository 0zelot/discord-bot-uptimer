import fs from "node:fs/promises";

const getStatus = async () => {
    try {
        return JSON.parse(await fs.readFile("./data.json"));
    } catch {
        await fs.writeFile("./data.json", JSON.stringify({}));
    }
}

const setStatus = async (status) => {
    await fs.writeFile("./data.json", JSON.stringify({
        status,
        since: Date.now()
    }, null, 2));
}

export {getStatus, setStatus}