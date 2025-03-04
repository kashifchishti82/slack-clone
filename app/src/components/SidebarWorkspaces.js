import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { useQuery } from '@apollo/client';
import { useState } from "react";
import {GET_WORKSPACES} from '@/chat-server/quries/WorkspaceQuery';
export default function SidebarWorkspaces() {
    const { loading, error, data } = useQuery(GET_WORKSPACES);
    const [hovered, setHovered] = useState(null);
    const defaultWorkspaceImage = "http://via.placeholder.com/40";
    const handleWorkspaceClick = (id) => {
        
    }
    return (
        <TooltipProvider>
            <div className="w-20 bg-gray-900 text-white flex flex-col py-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-y-auto scrollbar-custom scroll-smooth flex flex-col items-center space-y-4"
                >
                    {data && data.workspaces.map((ws) => (
                        <Tooltip key={ws.id}>
                            <TooltipTrigger
                                onMouseEnter={() => setHovered(ws.id)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => handleWorkspaceClick(ws.id)}
                                className="relative group w-12 h-12 flex items-center justify-center bg-gray-800 rounded-xl hover:bg-gray-700 transition-all"
                            >
                                {ws.icon ? (
                                    <span className="text-2xl">{ws.icon}</span>
                                ) : (
                                    <img src={defaultWorkspaceImage} alt="Workspace" className="w-8 h-8 rounded-full" />
                                )}
                            </TooltipTrigger>
                            {hovered === ws.id && (
                                <TooltipContent className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md">
                                    {ws.name}
                                </TooltipContent>
                            )}
                        </Tooltip>
                    ))}
                </motion.div>

                {/* Add Workspace Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded-xl hover:bg-gray-600 transition-all text-2xl"
                >
                    ➕
                </motion.button>
            </div>
        </TooltipProvider>
    )
}