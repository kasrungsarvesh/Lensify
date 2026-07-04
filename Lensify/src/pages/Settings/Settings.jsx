import { useState } from "react";

import ShopSettings from "../../components/settings/ShopSettings";
import BillingSettings from "../../components/settings/BillingSettings";
import ReceiptSettings from "../../components/settings/ReceiptSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";

import "./Settings.css";

function Settings() {

    const [activeTab, setActiveTab] = useState("shop");

    return (

        <div className="settings-page">

            <div className="settings-header">

                <h2>Settings</h2>

                <p>Configure your optical shop</p>

            </div>

            <div className="settings-tabs">

                <button
                    className={activeTab==="shop" ? "active" : ""}
                    onClick={()=>setActiveTab("shop")}
                >
                    Shop
                </button>

                <button
                    className={activeTab==="billing" ? "active" : ""}
                    onClick={()=>setActiveTab("billing")}
                >
                    Billing
                </button>

                <button
                    className={activeTab==="receipt" ? "active" : ""}
                    onClick={()=>setActiveTab("receipt")}
                >
                    Receipt
                </button>

                <button
                    className={activeTab==="security" ? "active" : ""}
                    onClick={()=>setActiveTab("security")}
                >
                    Security
                </button>

                <button
                    className={activeTab==="appearance" ? "active" : ""}
                    onClick={()=>setActiveTab("appearance")}
                >
                    Appearance
                </button>

            </div>

            <div className="settings-content">

                {activeTab==="shop" && <ShopSettings/>}

                {activeTab==="billing" && <BillingSettings/>}

                {activeTab==="receipt" && <ReceiptSettings/>}

                {activeTab==="security" && <SecuritySettings/>}

                {activeTab==="appearance" && <AppearanceSettings/>}

            </div>

        </div>

    );

}

export default Settings;