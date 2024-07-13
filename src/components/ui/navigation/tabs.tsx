import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
    defaultTab: string;
    children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultTab, children }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
};

export const TabList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="tab-list flex space-x-4 mb-4">{children}</div>
);

interface TabProps {
    value: string;
    children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ value, children }) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('Tab must be used within Tabs');

    const { activeTab, setActiveTab } = context;

    return (
        <button
            className={`${activeTab === value ? "text-gray-500 " : " "} tabs-trigger py-3 text-sm transition-colors text-gray-500/50`}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button >
    );
};

export const TabPanels: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabPanels must be used within Tabs');

    return <div className="tab-panels">{children}</div>;
};

interface TabPanelProps {
    value: string;
    children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ value, children }) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabPanel must be used within Tabs');

    const { activeTab } = context;

    if (activeTab !== value) return null;

    return <div className="tab-panel">{children}</div>;
};
