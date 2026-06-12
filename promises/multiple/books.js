import https from 'https'

console.log('---------')

async function getData(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                const contentType = res.headers['content-type']

                if (contentType?.includes('application/json')) {
                    let data = ''

                    res.on('data', (chunk) => {
                        data += chunk
                    })

                    res.on('end', () => {
                        try {
                            resolve(JSON.parse(data))
                        } catch (err) {
                            reject(err)
                        }
                    })
                }
                else {
                    resolve({
                        statusCode: res.statusCode,
                        contentType,
                        url
                    })

                    res.resume()
                }
            })
            .on('error', reject)
    })
}

async function getBooks(code, limit = 10) {
    const books = await getData(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(code)}&limit=${limit}`
    );

    const covers = [];

    for (const item of books.docs) {
        if (!item.cover_i) continue

        const cover = await getData(
            `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
        );

        covers.push({
            title: item.title,
            cover
        });
    }

    return {
        books,
        covers
    };
}

async function main() {
    try {
        const result = await getBooks('informatica')

        console.log('Resultados encontrados:', result.books.numFound)
        console.log('Cantidad recibida:', result.books.docs.length)

        console.log('\nPortadas encontradas:\n')

        result.covers.forEach((item, index) => {
            console.log(`${index + 1}. ${item.title}`)
            console.log(`URL: ${item.cover.url}`)
            console.log(`Status: ${item.cover.statusCode}`)
            console.log(`Tipo: ${item.cover.contentType}`)
            console.log('')
        })

    } catch (err) {
        console.log('Error:', err.message)
    }
}

main()
console.log('Petición realizada')