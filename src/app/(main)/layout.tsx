'use client'
import { useState } from 'react';
import { Header } from '../../components/ui/navigation/Header';
import { RightSideBar } from '../../components/ui/navigation/rightSidebar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleNotificationSection = () => {
    setNotificationOpen(!notificationOpen);
  };
  return (
    <div className="relative flex">
      <div className='w-full h-full'>
        <Header notificationOpen={notificationOpen} toggleNotificationSection={toggleNotificationSection} />
        <main className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-4 lg:pt-7 overflow-y-scroll scrollbar-hide scroll-auto">
          {children}</main>
      </div>
      {notificationOpen && (
        <RightSideBar
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
        />
      )}
    </div>
  )
}
