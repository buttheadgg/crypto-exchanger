import { makeAutoObservable } from "mobx";
import { TransactionsData } from "../components/types/types";
import { StatisticsData } from "../components/types/types";

class RecentExchangesStore {

    exchangesData: TransactionsData = {};
    diagramData: StatisticsData | undefined = undefined;
    loading: boolean = true

    constructor() {
        makeAutoObservable(this);
    }

    async fetchLitsExchanges() {
        this.loading = true;
        try {
            const response = await window.fetch(
                "https://alfa-crypto.com/api/v1/exchange/last-transactions",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            this.exchangesData = data;
            this.loading = false;
        } catch {
            console.log("Failed to fetch location data");
        }
    }

    async fetchDiagramData() {
        this.loading = true;
        try {
            const response = await window.fetch(
                "https://alfa-crypto.com/api/v1/exchange/diagram-data",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            this.diagramData = data;
            this.loading = false;
        } catch {
            console.log("Failed to fetch location data");
        }
    }

}

const recentExchangesStore = new RecentExchangesStore();
export default recentExchangesStore;