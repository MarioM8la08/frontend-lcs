// javascript
import React from 'react';

export default function Field() {
    const fieldStyle = {
        width: '900px',
        maxWidth: '100%',
        height: '560px',
        background: '#000000',            // sfondo del campo (vedi se vuoi trasparente)
        '--background-color': '#000000',  // definisce la variabile usata dal cerchio
        '--zero': 'white',                // definisce la variabile usata per i bordi
        position: 'relative',
        margin: '20px auto',
        borderRadius: '8px',
        boxSizing: 'border-box',
        overflow: 'hidden'
    };

    const borderCommon = {
        position: 'absolute',
        boxSizing: 'border-box',
        background: 'transparent',
        pointerEvents: 'none'
    };

    const outerBorder = {
        ...borderCommon,
        inset: '0px',
        border: '2px solid white',
        borderRadius: '10px'
    };

    const halfLine = {
        ...borderCommon,
        left: '50%',
        top: '0',
        bottom: '0',
        width: '0',
        borderLeft: '1px solid var(--zero)',
        transform: 'translateX(-50%)'
    };

    const centerCircle = {
        ...borderCommon,
        width: '140px',
        height: '140px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--background-color)',
        zIndex: 10,
        border: '1px solid var(--zero)',
        borderRadius: '50%'
    };

    const centerSpotRing = {
        ...borderCommon,
        width: '14px',
        height: '14px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid var(--zero)',
        borderRadius: '50%'
    };

    const areaBox = (side = 'left') => ({
        ...borderCommon,
        width: '22%',
        height: '46%',
        top: '27%',
        border: '1px solid var(--zero)',
        borderRadius: '0px',
        [side]: '0%'
    });


    return (
        <div style={fieldStyle} aria-hidden="true">
            <div style={outerBorder} />
            <div style={halfLine} />
            <div style={centerCircle} />
            {/*<div style={centerSpotRing} />*/}
            {/*<div style={areaBox('left')} />*/}
            {/*<div style={areaBox('right')} />*/}
        </div>
    );
}
