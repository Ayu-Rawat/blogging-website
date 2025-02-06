import React from 'react';

function Logo({ width = '80px',className="" }) {
    return (
        <div className={{className}} style={{ width }}>
            <img src="../images/logo.png" alt="logo" />
        </div>
    );
}

export default Logo;
