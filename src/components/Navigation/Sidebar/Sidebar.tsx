"use client"

import { useState, useEffect } from 'react'
import { X, User, Users, Book, DollarSign, Settings, UserPlus, ChevronLeft } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    if (onCollapse) {
      onCollapse(newCollapsed)
    }
  }

  const menuItems = [
    { key: 'clients', icon: User, label: 'Clients', path: '/client' },
    { key: 'groups', icon: Users, label: 'Groups', path: '/groups' },
    { key: 'library', icon: Book, label: 'Library', path: '/library' },
    { key: 'payments', icon: DollarSign, label: 'Payments', path: '/payments' },
    { key: 'account', icon: Settings, label: 'Account', path: '/account' },
    { key: 'management', icon: UserPlus, label: 'User Management', path: '/user-management' },
  ]

  return (
    <div className="fixed inset-y-0 left-0 z-50">
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 64 : 256,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
          }
        }}
        className="h-full bg-white shadow-lg flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-semibold"
              >
                Dr. Santhify
              </motion.h2>
            )}
          </AnimatePresence>
          <button onClick={toggleCollapsed} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-md transition-all duration-200 ${location.pathname.startsWith(item.path)
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 0.2,
                          ease: "easeInOut"
                        }}
                        className="ml-2 whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      <motion.button
        initial={false}
        animate={{
          left: collapsed ? 50 : 240,
          rotate: collapsed ? 180 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="absolute top-1/2 -translate-y-1/2 -right-[-16px] z-50 w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center shadow-md overflow-visible"
        style={{
          transform: "translateX(-50%)"
        }}
        onClick={toggleCollapsed}
      >
        <ChevronLeft className="h-4 w-4" />
      </motion.button>
    </div>
  )
}

export default Sidebar
