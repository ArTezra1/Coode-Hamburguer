import cron from "node-cron"
import SalesSummaryController from "../controllers/SalesSummaryController.js"

function startCron() {
    cron.schedule("0 0 * * *", async () => {
        try {
            await SalesSummaryController.createSymmary("daily")

        } catch (error) {
            console.error("Erro ao criar o sumário:", error)
        }
    })

    cron.schedule("0 0 * * 0", async () => {
        try {
            await SalesSummaryController.createSymmary("weekly")

        } catch (error) {
            console.error("Erro ao criar o sumário:", error)
        }
    })

    cron.schedule("0 0 1 * *", async () => {
        try {
            await SalesSummaryController.createSymmary("monthly")

        } catch (error) {
            console.error("Erro ao criar o sumário:", error)
        }
    })

}

export default startCron
