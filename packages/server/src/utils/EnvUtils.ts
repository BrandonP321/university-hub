import dotenv from "dotenv";

dotenv.config();

export class EnvUtils {

    /* Env vars that MUST exist */
    public static Vars = {
        CORS_ORIGINS: process.env.CORS_ORIGINS ?? "",
        PORT: process.env.PORT ?? "",
    }

    /** Throws alert if any environment variables don't exist */
    public static verifyAllVarsExist = () => {
        let isVarMissing = false;

        let envVar: keyof typeof EnvUtils.Vars;

        for (envVar in this.Vars) {
            if (!this.Vars[envVar]) {
                isVarMissing = true;
                console.error(`MISSING ENVIRONMENT VARIABLE: ${envVar}`)
            }
        }

        !isVarMissing && console.log("ALL ENV VARS EXIST");
    }
}