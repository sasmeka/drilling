function printsegiempat(value) {
    for (let i = 1; i <= value; i++) {
        let temp = ''
        if (i == 1 || i == value) {
            for (let ii = 1; ii <= value; ii++) {
                temp = temp + '*'
            }
            console.log(temp)
        } else {
            for (let ii = 1; ii <= value; ii++) {
                if (ii == 1 || ii == value) {
                    temp = temp + '*'
                } else {
                    temp = temp + ' '
                }
            }
            console.log(temp)
        }
    }
}

printsegiempat(6)