function printsegitiga(value) {
    for (let i = 1; i <= value; i++) {
        let temp = ''
        for (let ii = 1; ii <= i; ii++) {
            temp = temp + ii.toString()

        }
        console.log(temp)
    }
}

printsegitiga(5)