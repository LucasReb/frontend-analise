<template>
    <div class="main-sidebar">
        <div class="sidebar-header">
            <h2 class="logo">análise.</h2>
        </div>
        <div class="sidebar-body">
            <span class="sidebar-text1">APP</span>
            <div class="btns-holder">
                <div class="sidebar-btn">
                    <i class="pi pi-upload sidebar-icon" style=""></i>
                    <p style="font-weight: 700;">Upload</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import 'primeicons/primeicons.css';

.sidebar-icon {
    margin-right: 8px;
    font-size: 12px;
    color: #6366f1;
    font-weight: 700;
}

.btns-holder {
    margin-top: 10px;
}

.sidebar-btn:hover {
    background-color: #f6f9fc;
    transition: 0.5s;
}

.sidebar-btn {
    font-size: 14px;
    margin-left: -32px;
    padding-left: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 500;
    height: 40px;
    color: #4b5563;
    transition: 0.2s;
}

.logo {
    color: #6366f1;
}

.sidebar-body {
    margin-left: 28px;
}

.sidebar-text1 {
    font-size: 13px;
    text-transform: uppercase;
    font-weight: 700;
    color: #6366f1;
    padding: 1rem rem 2rem;
}

.main-sidebar {
    height: 100%;
    width: 14rem;
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
    box-shadow: 0px 4px 50px #D9DDFC;
}

.sidebar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 5px;
}
</style>