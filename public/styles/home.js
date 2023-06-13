// Store flask data to js
var currentData = {
    T_1: parseInt($(".cell[data-t1]").attr("data-t1")),
    T_2: parseInt($(".cell[data-t2]").attr("data-t2")),
    T_3: parseInt($(".cell[data-t3]").attr("data-t3")),
    T_4: parseInt($(".cell[data-t4]").attr("data-t4")),
    T_5: parseInt($(".cell[data-t5]").attr("data-t5")),
    T_6: parseInt($(".cell[data-t6]").attr("data-t6"))
};

function checkDataChange() {
    // Update data manually here instead of making a request
    var newData = {
        T_1: parseInt($(".cell[data-t1]").text()),
        T_2: parseInt($(".cell[data-t2]").text()),
        T_3: parseInt($(".cell[data-t3]").text()),
        T_4: parseInt($(".cell[data-t4]").text()),
        T_5: parseInt($(".cell[data-t5]").text()),
        T_6: parseInt($(".cell[data-t6]").text())
    };
    
    if (newData.T_1 !== currentData.T_1) {

        if (newData.T_1 === 1) {
            showNotification("Table 1 Service needed");
            playSound("order.wav");
        } else if (currentData.T_1 === 1 && newData.T_1 === 0) {
            showComplete("Table 1 Service completed");
            playSound("audio/complete.wav");
        }

        currentData.T_1 = newData.T_1;
    }

    if (newData.T_2 !== currentData.T_2) {
        
        if (newData.T_2 === 1) {
            showNotification("Table 2 Service needed");
        } else if (currentData.T_2 === 1 && newData.T_2 === 0) {
            showComplete("Table 2 Service completed");
        }

        currentData.T_2 = newData.T_2;
    }

    if (newData.T_3 !== currentData.T_3) {
        
        if (newData.T_3 === 1) {
            showNotification("Table 3 Service needed");
        } else if (currentData.T_3 === 1 && newData.T_3 === 0) {
            showComplete("Table 3 Service completed");
        }

        currentData.T_3 = newData.T_3;
    }

    if (newData.T_4 !== currentData.T_4) {
        
        if (newData.T_4 === 1) {
            showNotification("Table 4 Service needed");
        } else if (currentData.T_4 === 1 && newData.T_4 === 0) {
            showComplete("Table 4 Service completed");
        }

        currentData.T_4 = newData.T_4;
    }

    if (newData.T_5 !== currentData.T_5) {
        
        if (newData.T_5 === 1) {
            showNotification("Table 5 Service needed");
        } else if (currentData.T_5 === 1 && newData.T_5 === 0) {
            showComplete("Table 5 Service completed");
        }

        currentData.T_5 = newData.T_5;a
    }

    if (newData.T_6 !== currentData.T_6) {
        
        if (newData.T_6 === 1) {
            showNotification("Table 6 Service needed");
        } else if (currentData.T_6 === 1 && newData.T_6 === 0) {
            showComplete("Table 6 Service completed");
        }

        currentData.T_6 = newData.T_6;
    }
}

function showNotification(message) {
    Toastify({
        text: message,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top", // Display at the top
        position: "right", // Position on the right side
        backgroundColor: "linear-gradient(to right, #ff9a9e, #fad0c4)", // Custom background color
        stopOnFocus: true // Stop auto close on toast focus
    }).showToast();
}

function showComplete(message) {
    Toastify({
        text: message,
        duration: 5000,
        netWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #80ff72, #7ee8fa)",
        stopOnFocus: true
    }).showToast();
}

function playSound(audioName) {
    let audio = new Audio(audioName)

    audio.play();
}

// Function for refresh the particular Div class
function refreshDivContent() {
    $(".first").load(location.href + " .first");
}

// Time limit of refresh function
setInterval(refreshDivContent, 500);
setInterval(checkDataChange, 500);
