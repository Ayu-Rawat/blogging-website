import React from 'react';

function Logo({ width = '80px' }) {
    return (
        <div className="flex items-center justify-center">
            <div className="text-xl font-bold text-blue-600" style={{ width }}>
                <img src="/logo.png" alt="logo" />
            </div>
        </div>
    );
}

export default Logo;
