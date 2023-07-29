import {Router} from "express"

import {WhereYouFrom} from "../Controllers/WhereYouFrom"
import { FindYou } from "../Controllers/FindYou"



const FID = new FindYou()
const WUF = new WhereYouFrom()
const app = Router()




app.post('/local', WUF.handle)

app.get('/locais/:country', FID.handle)

export {app}