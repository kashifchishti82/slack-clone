import {useLazyQuery, useQuery} from '@apollo/client';
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {GET_CHANNELS} from "@/chat-server/quries/WorkspaceQuery";
import {motion} from "framer-motion";
import CreateChannelModal from "@/components/CreateChannelModal";
export default function SidebarChannel() {
    const dispatch = useDispatch();
    const activeWorkspace = useSelector((state) => state.workspace.activeWorkspace);
    const channels = useSelector((state) => state.channel.channels);
    const [getChannels, {loading, error, data}] = useLazyQuery(GET_CHANNELS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (activeWorkspace) {
            getChannels({variables: {workspaceId: activeWorkspace.id, page: 1}})
        }
    }, [activeWorkspace])
    return (
        <div className="w-60 bg-gray-800 text-white flex flex-col py-4 px-4">
            <h2 className="text-lg font-bold">Channels</h2>
            <ul className="mt-2 space-y-1">
                {channels && channels.map((channel) => (
                    <li className="py-2 px-3 bg-gray-700 rounded cursor-pointer">{channel.name}</li>
                ))}

                <li className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer" onClick={openModal}>Add Channel</li>
            </ul>

            <h2 className="text-lg font-bold mt-4">Direct Messages</h2>
            <ul className="mt-2 space-y-1">
                <li className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer">User 1</li>
                <li className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer">User 2</li>
            </ul>
            <CreateChannelModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}