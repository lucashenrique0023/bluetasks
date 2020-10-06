const { useState, useEffect } = require("react")

export const useMouseMove = () => {

    const [ coords, setCoords ] = useState({ x: 0, y: 0});

    useEffect(() => {
        document.addEventListener("mousemove", e => {
            console.log(e);
            setCoords({ x: e.clientX, y: e.clientY });
        })

        return () => document.removeEventListener("mousemove");
    }, []);

    return coords;
}