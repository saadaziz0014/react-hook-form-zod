export default function API() {
    let num = Math.floor(Math.random() * 10 + 1);
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num > 5) {
                resolve(num)
            } else {
                reject('Error')
            }
        }, 1000)
    })

    return promise
}