import RecoveryFormEmail from "./RecoveryFormEmail";
import RecoveryFormOPT from "./RecoveryFormOPT";

export { RecoveryFormEmail, RecoveryFormOPT };


export type IStep = {
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>
    email: string
    setToken: React.Dispatch<React.SetStateAction<string>>
    token: string
}