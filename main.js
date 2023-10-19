const students = [
    {
        id: 1,
        name: "Heru",
        score: 90
    }, {
        id: 2,
        name: "Herman",
        score: 80
    }, {
        id: 3,
        name: "Budi",
        score: 85
    }, {
        id: 4,
        name: "Tika",
        score: 87
    }, {
        id: 5,
        name: "Junaedi",
        score: 79
    }, {
        id: 6,
        name: "Ahmad",
        score: 82
    }, {
        id: 7,
        name: "Dani",
        score: 81
    }
]

const byscore = (obj) => {
    for (let x = 0; x < obj.length; x++) {
        for (let j = 0; j < obj.length - 1; j++) {
            if (obj[j].score > obj[j + 1].score) {
                const temp = obj[j]
                obj[j] = obj[j + 1]
                obj[j + 1] = temp
            }
        }
    }
    console.log(obj)
}

const byid = (obj) => {
    for (let x = 0; x < obj.length; x++) {
        for (let j = 0; j < obj.length - 1; j++) {
            if (obj[j].id > obj[j + 1].id) {
                const temp = obj[j]
                obj[j] = obj[j + 1]
                obj[j + 1] = temp
            }
        }
    }
    console.log(obj)
}

byscore(students)
byid(students)