import SidebarWorkspaces from "@/components/SidebarWorkspaces";
import SidebarChannel from "@/components/SidebarChannel";
export default function ChatSidebar() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Workspaces */}
            <SidebarWorkspaces/>

            {/* Channels */}
            <SidebarChannel/>
        </div>
    );

}