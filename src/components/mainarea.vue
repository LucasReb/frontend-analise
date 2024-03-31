<template>
    <div class="homepage-container">
        <div class="no-arch" v-if="!finished">
            <span class="welcometext">Bem vindo ao <span class="logowelcome">análise.</span></span>
            <div class="upload-section">
                <p class="upload-text">Para iniciar suas análises financeiras, faça upload de um arquivo XLSX:</p>
                <button class="upload-button" @click="openFilePicker" v-if="!file">Fazer Upload</button>
                <div class="three-body" v-else>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                </div>
                <input type="file" ref="fileInput" class="file-input" accept=".xlsx" @change="uploadFile">
            </div>
        </div>
        <div v-else>
            <div class="chart-line">
                <span class="dashboard-text">Dashboard</span>
                <button class="upload-button" @click="openFilePicker">Novo Upload</button>
                <input type="file" ref="fileInput" class="file-input" accept=".xlsx" @change="uploadFile">
            </div>
            <div class="chart-line">
                <div class="chart-card">
                    <span class="chart-card-title">Usuários ativos</span>
                    <span class="chart-card-info">{{ this.analise.activeUsers }}</span>
                </div>
                <div class="chart-card">
                    <span class="chart-card-title">Tempo médio de assinatura</span>
                    <span class="chart-card-info">{{ this.analise.averageSubscriptionLength }}</span>
                </div>
                <div class="chart-card">
                    <span class="chart-card-title">LTV</span>
                    <span class="chart-card-info">R$ {{ this.analise.ltv }}</span>
                </div>
                <div class="chart-card">
                    <span class="chart-card-title">Churn total</span>
                    <span class="chart-card-info">{{ this.analise.churnRate }}</span>
                </div>
            </div>
            <div class="chart-line">
                <div class="chart-card-lg" style="margin-right: 15px;">
                    <span class="chart-card-title">Churn/mês</span>
                    <div style="width: 100%;">
                        <apexchart :options="churnByMonthChartOptions" :series="churnByMonthSeries" type="bar">
                        </apexchart>
                    </div>
                </div>
                <div class="chart-card-lg">
                    <span class="chart-card-title">MRR</span>
                    <div style="width: 100%;">
                        <apexchart :options="mrrByMonthChartOptions" :series="mrrByMonthSeries" type="bar"></apexchart>
                    </div>
                </div>
            </div>
            <div class="chart-line">
                <div class="chart-card-lg">
                    <span class="chart-card-title">Novos usuários</span>
                    <div style="width: 90%; margin-top: -12px;">
                        <apexchart :options="newUsersByMonthChartOptions" :series="newUsersByMonthSeries" type="line">
                        </apexchart>
                    </div>
                </div>
            </div>
            <div class="chart-line">
                <div class="chart-card-lg">
                    <span class="chart-card-title">Usuários por mês</span>
                    <div style="width: 90%; margin-top: -12px;">
                        <apexchart :options="usersByMonthChartOptions" :series="usersByMonth" type="line">
                        </apexchart>
                        <Analytics />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import SheetService from '@/services/sheet.service';
import { useToast } from "vue-toastification";
import { Analytics } from "@vercel/analytics/react"

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            file: null,
            analise: null,
            finished: false,
            newUsersByMonthChartOptions: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#6366f1'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'category',
                    categories: [],
                },
                yaxis: {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    grid: {
                        show: false,
                    },
                    labels: {
                        show: false,
                    }
                },
                grid: {
                    show: false,
                },

            },
            newUsersByMonthSeries: [],


            usersByMonthChartOptions: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#6366f1'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'category',
                    categories: [],
                },
                yaxis: {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    grid: {
                        show: false,
                    },
                    labels: {
                        show: false,
                    }
                },
                grid: {
                    show: false,
                },
            },
            usersByMonth: {},

            churnByMonthChartOptions: {
                chart: {
                    type: 'bar',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (value) {
                            return `${value}%`;
                        }
                    }
                },
                colors: ['#6366f1'],

                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    type: 'category',
                    categories: [],
                },
                yaxis: {
                    show: false,
                },
                grid: {
                    show: false,
                },
                fill: {
                    colors: ['#6366f1'],
                },
                stroke: {
                    show: true,
                    width: 2,
                },
            },
            churnByMonthSeries: [],

            mrrByMonthChartOptions: {
                chart: {
                    type: 'bar',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (value) {
                            return `R$ ${value.toFixed(2)}`;
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '75%',
                        endingShape: 'rounded',
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                colors: ['#6366f1'],

                xaxis: {
                    type: 'category',
                    categories: [],
                },
                yaxis: {
                    show: false,
                },
                grid: {
                    show: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                },
            },
            mrrByMonthSeries: [],
        };
    },

    methods: {
        async uploadFile(event) {
            try {
                this.file = event.target.files[0];
                useToast().info("Processando dados!", { timeout: 2000 });
                const response = await SheetService.uploadSheet(this.file);

                this.finished = true;
                this.analise = response;
            } catch (error) {
                useToast().error("Erro no upload do arquivo!", { timeout: 2000 });
                this.resetUploadState();
                return;
            }

            try {
                this.prepareNewUsersByMonthData();
            } catch (error) {
                useToast().error("Erro ao preparar dados de novos usuários por mês.", { timeout: 2000 });
            }

            try {
                this.prepareActiveUsersByMonthData();
            } catch (error) {
                useToast().error("Erro ao preparar dados de usuários ativos por mês.", { timeout: 2000 });
            }

            try {
                this.prepareChurnByMonthData();
            } catch (error) {
                useToast().error("Erro ao preparar dados de churn por mês.", { timeout: 2000 });
            }

            try {
                this.prepareMRRByMonthData();
            } catch (error) {
                useToast().error("Erro ao preparar dados de MRR por mês.", { timeout: 2000 });
            }

            if (this.analise) {
            } else {
                useToast().error("Análise não pôde ser realizada devido a erros nos dados.", { timeout: 2000 });
            }
        },

        resetUploadState() {
            this.analise = null;
            this.file = null;
            this.finished = false;
        },

        openFilePicker() {
            this.$refs.fileInput.click();
        },

        prepareNewUsersByMonthData() {
            const data = this.analise.newUsersByMonth;
            const sortedData = Object.entries(data).sort((a, b) => {
                const [monthA, yearA] = a[0].split("-");
                const [monthB, yearB] = b[0].split("-");
                return yearA === yearB ? monthA.localeCompare(monthB) : yearA.localeCompare(yearB);
            });

            const categories = sortedData.map(entry => {
                const [month, year] = entry[0].split("-");
                return `${month}/${year.substring(2)}`;
            });
            const seriesData = sortedData.map(entry => entry[1]);

            this.newUsersByMonthChartOptions.xaxis.categories = categories;
            this.newUsersByMonthSeries = [{ name: "Novos usuários", data: seriesData }];
        },

        prepareActiveUsersByMonthData() {
            const data = this.analise.usersByMonth;
            const sortedData = Object.entries(data).sort((a, b) => {
                const [monthA, yearA] = a[0].split("-");
                const [monthB, yearB] = b[0].split("-");
                return yearA === yearB ? monthA.localeCompare(monthB) : yearA.localeCompare(yearB);
            });

            const categories = sortedData.map(entry => {
                const [month, year] = entry[0].split("-");
                return `${month}/${year.substring(2)}`;
            });
            const seriesData = sortedData.map(entry => entry[1]);

            this.usersByMonthChartOptions.xaxis.categories = categories;
            this.usersByMonth = [{ name: "Usuários", data: seriesData }];
        },
        prepareChurnByMonthData() {
            const data = this.analise.churnByMonth;
            const sortedData = Object.entries(data).sort((a, b) => {
                const [monthA, yearA] = a[0].split("-");
                const [monthB, yearB] = b[0].split("-");
                const dateA = parseInt(yearA + monthA.padStart(2, '0'));
                const dateB = parseInt(yearB + monthB.padStart(2, '0'));
                return dateA - dateB;
            });

            const categories = sortedData.map(([date]) => {
                const [month, year] = date.split("-");
                return `${month}/${year.substring(2)}`;
            });

            const seriesData = sortedData.map(([, rate]) => parseFloat(rate.replace('%', '')));

            this.churnByMonthChartOptions.xaxis.categories = categories;
            this.churnByMonthSeries = [{ name: "Churn Rate", data: seriesData }];
        },


        prepareMRRByMonthData() {
            const data = this.analise.mrrByMonth;
            const sortedData = Object.entries(data).sort((a, b) => {
                const [monthA, yearA] = a[0].split("-");
                const [monthB, yearB] = b[0].split("-");
                return yearA === yearB ? monthA.localeCompare(monthB) : yearA.localeCompare(yearB);
            });

            const categories = sortedData.map(([date]) => {
                const [month, year] = date.split("-");
                return `${month}/${year.substring(2)}`;
            });

            const seriesData = sortedData.map(([, value]) => parseFloat(value));

            this.mrrByMonthChartOptions.xaxis.categories = categories;
            this.mrrByMonthSeries = [{ name: "MRR", data: seriesData }];
        },


    },
};
</script>

<style>
.chart-card-info {
    position: absolute;
    font-size: 2rem !important;
    color: black;
    font-weight: 700 !important;
    top: 52px;
    left: 12px;
}

.chart-card-title {
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #6366f1;
    position: absolute;
    top: 14px;
    left: 12px;
}

.chart-card {
    background: white;
    border: 1px solid #dfe7ef;
    box-shadow: 0px 4px 30px rgba(221, 224, 255, .54);
    border-radius: 12px;
    min-width: 272px;
    min-height: 122px;
    position: relative;
}

.chart-card-lg {
    background: white;
    min-height: 160px;
    border: 1px solid #dfe7ef;
    box-shadow: 0px 4px 30px rgba(221, 224, 255, .54);
    border-radius: 12px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 32px;
}

.chart-card-sm {
    background: white;
    border: 1px solid #dfe7ef;
    padding: 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0px 4px 30px rgba(221, 224, 255, .54);
    border-radius: 12px;
    width: 234px;
    height: 160px;
}

.chart-container {
    margin-top: 32px;
    width: 100%;
}

.chart-line {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 28px;
    align-items: center;
}

.dashboard {
    display: flex;
    justify-content: space-between;
}

.dashboard-text {
    font-weight: 600;
    color: #6B7280;
    font-size: 16px;
}

.no-arch {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.welcometext {
    font-weight: 700;
    font-size: 32px;
}

.homepage-container {
    margin-left: 14rem;
    padding: 2rem;
}

.logowelcome {
    color: #6366f1;
}

.upload-section {
    margin-top: 1rem;
    text-align: center;
}

.upload-text {
    font-size: 18px;
    margin-bottom: 1rem;
    font-weight: 500;
}

.upload-button {
    background-color: #6366f1;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.upload-button:hover {
    background-color: #4146d6;
}

.file-input {
    display: none;
}

.three-body {
    --uib-size: 35px;
    --uib-speed: 0.8s;
    --uib-color: #5D3FD3;
    position: relative;
    display: inline-block;
    margin-top: 12px;
    height: var(--uib-size);
    width: var(--uib-size);
    animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
}

.three-body__dot {
    position: absolute;
    height: 100%;
    width: 30%;
}

.three-body__dot:after {
    content: '';
    position: absolute;
    height: 0%;
    width: 100%;
    padding-bottom: 100%;
    background-color: var(--uib-color);
    border-radius: 50%;
}

.three-body__dot:nth-child(1) {
    bottom: 5%;
    left: 0;
    transform: rotate(60deg);
    transform-origin: 50% 85%;
}

.three-body__dot:nth-child(1)::after {
    bottom: 0;
    left: 0;
    animation: wobble1 var(--uib-speed) infinite ease-in-out;
    animation-delay: calc(var(--uib-speed) * -0.3);
}

.three-body__dot:nth-child(2) {
    bottom: 5%;
    right: 0;
    transform: rotate(-60deg);
    transform-origin: 50% 85%;
}

.three-body__dot:nth-child(2)::after {
    bottom: 0;
    left: 0;
    animation: wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -0.15) ease-in-out;
}

.three-body__dot:nth-child(3) {
    bottom: -5%;
    left: 0;
    transform: translateX(116.666%);
}

.three-body__dot:nth-child(3)::after {
    top: 0;
    left: 0;
    animation: wobble2 var(--uib-speed) infinite ease-in-out;
}

@keyframes spin78236 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes wobble1 {

    0%,
    100% {
        transform: translateY(0%) scale(1);
        opacity: 1;
    }

    50% {
        transform: translateY(-66%) scale(0.65);
        opacity: 0.8;
    }
}

@keyframes wobble2 {

    0%,
    100% {
        transform: translateY(0%) scale(1);
        opacity: 1;
    }

    50% {
        transform: translateY(66%) scale(0.65);
        opacity: 0.8;
    }
}

.analysis-results {
    margin-top: 2rem;
}

.result-item {
    margin-bottom: 1rem;
}

.label {
    font-weight: 600;
}

.value {
    margin-left: 8px;
    font-weight: 400;
}
</style>
