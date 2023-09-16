// components/TabList.tsx
"use client"

import React, { useState } from 'react';

// Define a TypeScript interface for a tab
interface Tab {
    id: number;
    label: string;
    content: string;
}

const TabList: React.FC = () => {
    // State for managing tabs
    const [tabs, setTabs] = useState<Tab[]>([
        { id: 1, label: 'Tab 1', content: 'Content for Tab 1' },
    ]);
    const [newTabLabel, setNewTabLabel] = useState<string>('');
    const [newTabContent, setNewTabContent] = useState<string>('');
    const [activeTab, setActiveTab] = useState<number>(1);

    // Function to add a new tab
    const addTab = () => {
        const newTab: Tab = {
            id: Date.now(),
            label: newTabLabel || `Tab ${tabs.length + 1}`,
            content: newTabContent || `Content for Tab ${tabs.length + 1}`,
        };
        setTabs([...tabs, newTab]);
        setNewTabLabel('');
        setNewTabContent('');
        setActiveTab(newTab.id);
    };

    // Function to handle tab click
    const handleTabClick = (id: number) => {
        setActiveTab(id);
    };

    return (
        <div>
            <ul className="tabs">
                {tabs.map((tab) => (
                    <li
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
            <div className="add-tab">
                <input
                    type="text"
                    placeholder="Tab Label"
                    value={newTabLabel}
                    onChange={(e) => setNewTabLabel(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tab Content"
                    value={newTabContent}
                    onChange={(e) => setNewTabContent(e.target.value)}
                />
                <button onClick={addTab}>Add Tab</button>
            </div>
        </div>
    );
};

export default TabList;
