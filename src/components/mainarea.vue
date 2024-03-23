<template>
    <div class="homepage-container">
        <div class="no-arch" v-if="!this.finished">
            <span class="welcometext">Bem vindo ao <span class="logowelcome">análise.</span></span>
            <div class="upload-section">
                <p class="upload-text">Para iniciar suas análises financeiras, faça upload de um arquivo XLSX:</p>
                <button class="upload-button" @click="openFilePicker" v-if="this.file == null">Fazer Upload</button>
                <div class="three-body" v-else>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                </div>
                <input type="file" ref="fileInput" class="file-input" accept=".xlsx" @change="uploadFile">
            </div>
        </div>
        <div v-else>
            <div style="width: 100%; display: flex; justify-content: space-between;">
                <span class="dashboard-text">Dashboard</span>
                <button class="upload-button" @click="openFilePicker">
                    <span v-if="this.file != null">Novo Upload</span>
                </button>
                <input type="file" ref="fileInput" class="file-input" accept=".xlsx" @change="uploadFile">
            </div>
        </div>
    </div>
</template>

<script>
import SheetService from '@/services/sheet.service';
import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            file: null,
            analise: null,
            finished: false
        };
    },

    methods: {
        async uploadFile(event) {
            try {
                this.file = null

                this.file = event.target.files[0];

                useToast().info("Processando dados!", {
                    timeout: 2000
                });

                const response = await SheetService.uploadSheet(this.file);

                this.finished = true
                this.analise = response
            } catch (error) {
                useToast().error("Erro no upload!", {
                    timeout: 2000
                });

                this.analise = null
                this.file = null
            } finally {
                // Limpar o valor do input file para permitir fazer upload do mesmo arquivo novamente
                event.target.value = null;
            }
        },

        openFilePicker() {
            this.$refs.fileInput.click();
        }
    }
};
</script>

<style>
.dashboard-text {
    font-weight: 600;
    color: #6B7280;
    font-size: 15px;
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
    margin-left: 16rem;
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
</style>
