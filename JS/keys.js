var currentlyPressedKeys = {};

function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
        // console.log(event.keyCode);
}


function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys() {
    
        // //Roll
        if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
            // Left cursor key or A
            Z_rot--;
            console.log("bank left!", Z_rot);
            theta[2] = Z_rot;

        } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
            // Right cursor key or D
            Z_rot++;
            console.log("bank right!", Z_rot);
            theta[2] = Z_rot;
        } 

        //Pitch
        if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {
            // Up cursor key or W
            X_rot++;
            theta[0] = X_rot;
            console.log("pitch down!", X_rot);
        } else if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) {
            // Down cursor key or S
            X_rot--;
            theta[0] = X_rot;
            console.log("pitch up!", X_rot);
        } 

        // //Yaw
        // if (currentlyPressedKeys[90]) {
        //     // Z
        //     Y_rot--;
        //     // console.log("turn left!");
        // } else if (currentlyPressedKeys[67]) {
        //     // C
        //     Y_rot++;
        //     // console.log("turn right!");
        // } 

        // //throttle
        // if (currentlyPressedKeys[187]) {
        //     // Up cursor key or W
        //     move_speed+=0.001;
        //     // console.log("speeding up!");
        // } else if (currentlyPressedKeys[189]) {
        //     // Down cursor key
        //     move_speed-=0.001;
        //     // console.log("slowing down!");
        // }

        // //reset position
        // if (currentlyPressedKeys[70]) {
        //     // F
        //     X_rot = 0;
        //     Z_rot = 0;
        //     Y_rot = 0;
        //     // console.log("position reset");
        // } 
}
