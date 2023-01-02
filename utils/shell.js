import {exec} from "child_process";

import config from "../config.js";

export default () => {

    config.commands.forEach(command => {
        exec(command, (error, stdout, stderr) => null);
    });

}