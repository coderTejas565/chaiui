function parseClass(cls){
    // hadles paddinng
    if (cls.startsWith("chai-p-")) {
        const value = cls.split("-")[2]; //["chai" "p" "4"]
        return {padding: `${value * 4}px`}
    }

    //handles backgroundColor
    if (cls.startsWith("chai-bg-")) {
        let value = cls.split("chai-bg-")[1]

        //hex color
        if (value.startsWith("[") && value.endsWith("]")) {
            value = value.slice(1,-1)  // remove [ ]
        }
        return {backgroundColor: value}
    }

    // handles text (color + alignment)
    if (cls.startsWith("chai-text-")) {
        let value = cls.split("chai-text-")[1];

 if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1);
        if (value.endsWith("px") || value.endsWith("rem")) {
            return { fontSize: value }; //size, not color
        }
        return { color: value }; // hex or named color
    }

    if (["center", "left", "right", "justify"].includes(value)) {
        return { textAlign: value };
    }
        return {color: value}
    }


    //handles margin
    if (cls.startsWith("chai-m-")) {
        const value = cls.split("-")[2];
        return {margin: `${value * 4}px`}
    }    

    // handles border
    if (cls === "chai-border") {
        return {border: "1px solid black"}
    }    

    //handles border radius
    if (cls.startsWith("chai-rounded")) {
    const value = cls.split("-")[2];
    if (!value) return { borderRadius: "4px" }; // default
    return { borderRadius: `${value}px` };
}

    //handles flex layout
    // flex
    if (cls === "chai-flex") {
        return {display: "flex"}
    }

    // center
    if (cls === "chai-center") {
        return {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            }
    }

    // hidden 
    if (cls === "chai-hidden") {
        return {display: "none"}
    }

    // handles flexDirection column
    if (cls === "chai-flex-col") {
        return {display: "flex",
            flexDirection: "column"
        }
    }   

    // handles flexDirection row
    if (cls === "chai-flex-row") {
        return {display: "flex",
            flexDirection: "row"
        }
    }    

    //handles gap 
    if (cls.startsWith("chai-gap-")) {
        const value = cls.split("-")[2];
        return {gap: `${value * 4}px`}
    }   

    // handles full width
    if (cls === "chai-w-full") {
        return {width: "100%"}
    } 

    // handles width
    if (cls.startsWith("chai-w-")) {
        const value = cls.split("-")[2];
        return {width: `${value}px`}
    }   
    
    // handles height
    if (cls.startsWith("chai-h-")) {
        const value = cls.split("-")[2];
        return {height: `${value}px`}
    }       

    //handles justify and align
    if (cls === "chai-justify-between") {
        return {justifyContent: "space-between"}
    }  
    
    if (cls === "chai-items-center") {
        return {alignItems: "center"}
    }  

    // handles font weight
    if (cls === "chai-bold") {
        return {fontWeight: "bold"}
    }

    //handles boxShadow
    if (cls === "chai-shadow") {
        return {boxShadow: "0 4px 10px rgba(0,0,0,1)"}
    }

    // handles font family
    if (cls === "chai-font-mono") {
    return { fontFamily: "Space Mono, monospace" }
}

if (cls === "chai-font-syne") {
    return { fontFamily: "Syne, sans-serif" }
}

}




console.log(parseClass("chai-text-red"));
console.log(parseClass("chai-text-center"));


// function to convert the class string to style object
function applycStyles (classString){
    const classList = classString.trim().split(/\s+/)

    let finalcStyle = {};


    classList.forEach(cls => {

        const styleObj = parseClass(cls)
        if (styleObj) {
            finalcStyle = { ...finalcStyle, ...styleObj}
        }else{
            console.warn("Unknown class: ",cls)
        }
    })
    return finalcStyle;
}

// scanning dom and applying styles
function applyChaiStyles(){
    const allElements = document.querySelectorAll("*");
    allElements.forEach(el => {
        const classAttr = el.className
        if (!classAttr) {
            return;
        }
        const classes = classAttr.split(" ").filter(c => c.startsWith("chai-"))
        if (classes.length === 0) {
            return;
        }
        const stylecObj = applycStyles(classes.join(" "))
        Object.assign(el.style, stylecObj)
    })
}



function initChaiUI() {
    applyChaiStyles();
}

// For browser
if (typeof window !== "undefined") {
    window.ChaiUI = { init: initChaiUI };
}

// For npm / module
if (typeof module !== "undefined") {
    module.exports = { initChaiUI };
}

