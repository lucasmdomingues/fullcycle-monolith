import { NewExpress, NewSequelize } from "./express"

(async () => {
    const port = process.env.PORT || "3000"

    const sequelize = await NewSequelize()
    const express = await NewExpress(sequelize)

    express.listen(port, () => console.log(`app listening on port ${port}`))
})()
