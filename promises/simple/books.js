
import https from 'https'

console.log('---------');

async function getBooks(code, limit = 10) {
    return new Promise((resolve, reject) =>{
        const url = `https://openlibrary.org/search.json?q=${code}&limit=${limit}`
        https
            .get(url, (res) => {
                let data = ''
                res.on('data', (chunk) => {
                    data += chunk
                })
                res.on('end', () => {
                    let book = JSON.parse(data)
                    resolve(book)
                })
            })
            .on('error', (err) => {
                reject(err)
            })
    })
}

async function main() {
    try {
        const book = await getBooks('informatica')

        console.log('Resultados encontrados:', book.numFound)
        console.log('Inicio:', book.start)
        console.log('Cantidad recibida:', book.docs.length)

        console.log('\nPrimeros 10 libros:\n')

        book.docs.forEach((item, index) => {
            console.log(`${item.title}`)
            console.log(`   Autor: ${item.author_name?.join(', ') ?? 'Desconocido'}`)
            console.log(`   Año: ${item.first_publish_year ?? 'N/A'}`)
            console.log(`   Cover: ${item.cover_i}`)
            console.log('')
        });

    } catch (err) {
        console.log('Error:', err.message)
    }
}

main()
console.log("Petición realizada")