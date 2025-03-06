import React, { useState } from 'react';


const CreateWorkspaceModal = ({ isOpen, onClose }) => {
    const [workspaceName, setWorkspaceName] = useState('');
    const [channelName, setChannelName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle channel and workspace creation logic here
        console.log({ workspaceName, channelName, description, isPrivate });
        onClose(); // Close modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-8 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Create Channel & Workspace</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Workspace Name */}
                    <div className="mb-4">
                        <label htmlFor="workspaceName" className="block text-sm font-medium text-gray-700">Workspace Name</label>
                        <input
                            type="text"
                            id="workspaceName"
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Enter workspace name"
                        />
                    </div>

                    {/* Channel Name */}
                    <div className="mb-4">
                        <label htmlFor="channelName" className="block text-sm font-medium text-gray-700">Channel Name</label>
                        <input
                            type="text"
                            id="channelName"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Enter channel name"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            placeholder="Describe the channel"
                        />
                    </div>

                    {/* Privacy Options */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Privacy</label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="public"
                                    name="privacy"
                                    value="public"
                                    checked={!isPrivate}
                                    onChange={() => setIsPrivate(false)}
                                    className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor="public" className="ml-2 text-sm text-gray-700">Public</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="private"
                                    name="privacy"
                                    value="private"
                                    checked={isPrivate}
                                    onChange={() => setIsPrivate(true)}
                                    className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor="private" className="ml-2 text-sm text-gray-700">Private</label>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateWorkspaceModal;