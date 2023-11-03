export const randomSpaceImage = (id: string) => {
    // In case of lacking official image I return random one
    const getNumberFromString = (string: string) => {
        return string.split("").reduce((accumulator, char) => accumulator + char.charCodeAt(0), 0);
    }
    const imgArrayLen = placeholderImages.length
    return placeholderImages[getNumberFromString(id) % imgArrayLen]
}
const placeholderImages = [
        "https://u.cubeupload.com/dawid8374/1f201306230004HQmedium.jpg",
        "https://u.cubeupload.com/dawid8374/92iss070e008366medium.jpg",
        "https://u.cubeupload.com/dawid8374/c76iss070e015526medium.jpg",
        "https://u.cubeupload.com/dawid8374/481KSC00padig034medium.jpg",
        "https://u.cubeupload.com/dawid8374/e6fng13onpadwithmoon.jpg",
        "https://u.cubeupload.com/dawid8374/a22PIA09178medium.jpg",
        "https://u.cubeupload.com/dawid8374/20PIA15416medium.jpg",
        "https://u.cubeupload.com/dawid8374/50ests119s005medium.jpg",
        "https://u.cubeupload.com/dawid8374/489611265mainhubbleholi.jpg",
        "https://u.cubeupload.com/dawid8374/c7e612713mainbaublefull.jpg",
        "https://u.cubeupload.com/dawid8374/1a8627372mainhubblefull.jpg",
        "https://u.cubeupload.com/dawid8374/d6629319mainPIA13959fu.jpg",
        "https://u.cubeupload.com/dawid8374/179635059mainhubble0330.jpg",
        "https://u.cubeupload.com/dawid8374/ea8650797mainjsc2012e05.jpg",
        "https://u.cubeupload.com/dawid8374/e2a651205mainjsc2012e05.jpg",
        "https://u.cubeupload.com/dawid8374/ff0667748main7574519692.jpg",
    ]


;
