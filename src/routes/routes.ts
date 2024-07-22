/* The code is importing necessary modules and functions from different files and creating a router
object using the `Router` class from the "express" module. */

import { Router } from "express"

import { createUser } from "../Controllers/Create_Users"
import { WhatYourPermission } from "../Controllers/Users_with_permissions"
import { CreatePermission } from "../Controllers/Creat_permissions"
import { Creat_Rules } from "../Controllers/FindYou"
import { SignIn } from "../Controllers/SessionController"
import { AuthMiddleware } from "../AuthMiddleware"

const find = new Creat_Rules()
const sir = new CreatePermission()
const Creat_Users = new createUser()
const Whoisyou = new WhatYourPermission()

const app = Router()

app.get('/findme/:username/:password', find.handle)

app.post('/sign-in', SignIn)
app.post('create_permissions', AuthMiddleware(["admin"]), sir.handle)

app.post('/sir', sir.handle)
app.post('/whoisme', Whoisyou.handle)
app.post('/new_user', Creat_Users.handle)

export { app }
