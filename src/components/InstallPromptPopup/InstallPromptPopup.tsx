import React, { useState, useEffect } from 'react';
import Button from '../Button';
import useInstallPrompt from '../../hooks/useInstallPrompt';

const InstallPromptPopup = () => {
    const { promptInstall, isInstalled } = useInstallPrompt();
    const [showPopup, setShowPopup] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        setIsIOS(/iphone|ipad|ipod/.test(userAgent));

        if (!isInstalled || isIOS) {
            setShowPopup(true);
        }
    }, [isInstalled, isIOS]);

    if (isInstalled || !showPopup) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto text-center items-center flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Install Our App</h2>
                {!isIOS ? (
                    <>
                        <p className="mb-4">Experience our app with offline access and faster loading times by installing it on your device.</p>
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={() => {
                                    promptInstall();
                                    setShowPopup(false);
                                }}
                                className='w-32'
                            >
                                Install
                            </Button>
                            <Button
                                variant='bordered'
                                onClick={() => setShowPopup(false)}
                                className='w-32'
                            >
                                Maybe Later
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="mb-4">To install the app on your iOS device, please follow these steps:</p>
                        <ol className="text-left mb-4">
                            <li>1. Tap the Share button in Safari's bottom bar.</li>
                            <li>2. Select "Add to Home Screen" from the menu.</li>
                            <li>3. Confirm by tapping "Add" in the top right corner.</li>
                        </ol>
                        <Button
                            variant='bordered'
                            onClick={() => setShowPopup(false)}
                            className='w-32'
                        >
                            Got it!
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default InstallPromptPopup;

